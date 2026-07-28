# Self-hosted MySQL 8 on a plain EC2 instance - chosen over RDS because the
# sandbox account's RDS availability/limits are unknown, and a bare EC2
# instance works in any sandbox.
#
# Runs in the PUBLIC subnet, not the private one: the private subnet has no
# route to the internet (no NAT), so user_data's `dnf install` of MySQL
# would silently fail there. Putting it in the public subnet instead of
# adding a NAT Gateway avoids that ongoing cost. This does trade away the
# "no route out of the subnet at all" isolation - what still stands between
# MySQL and the internet is security_groups.tf's aws_security_group.mysql,
# which only allows port 3306 from the backend's security group, nothing else.

data "aws_ami" "amazon_linux" {
  most_recent = true
  owners      = ["amazon"]

  filter {
    name   = "name"
    values = ["al2023-ami-*-x86_64"]
  }

  filter {
    name   = "virtualization-type"
    values = ["hvm"]
  }
}

resource "aws_instance" "mysql" {
  ami                    = data.aws_ami.amazon_linux.id
  instance_type          = var.mysql_instance_type
  subnet_id              = aws_subnet.public.id
  vpc_security_group_ids = [aws_security_group.mysql.id]

  # Pin the root disk size explicitly instead of inheriting the AMI default.
  # MySQL and its data live on this root volume, and the drifted AMI
  # (data.aws_ami, most_recent) defaults to a 2 GB root - far too small. Since
  # ignore_changes=[ami] does not pin the AMI for a forced -replace, a deliberate
  # replacement of this instance would otherwise come up with a 2 GB disk. See
  # ec2.tf, where the same trap took the backend down on boot.
  root_block_device {
    volume_size = 30
    volume_type = "gp3"
  }

  user_data = templatefile("${path.module}/templates/mysql_user_data.sh.tpl", {
    db_name          = var.mysql_database
    db_user          = var.mysql_app_user
    db_password      = var.mysql_app_password
    db_root_password = var.mysql_root_password
  })

  tags = {
    Name = "${var.project_name}-mysql"
  }

  # Keep this already-provisioned instance stable across unrelated applies.
  # - ami: `data.aws_ami` (most_recent) drifts as AWS publishes new Amazon Linux
  #   images, and a changed AMI forces replacement, which for MySQL means
  #   destroying the database and the migrated data. Pinning avoids that.
  # - user_data: only runs on first boot, so updating it on a running instance
  #   has no effect but stops/starts it (brief downtime, new public IP). Ignore it
  #   here; if the provisioning script must change, replace the instance deliberately.
  lifecycle {
    ignore_changes = [ami, user_data]
  }
}
