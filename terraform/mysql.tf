# Self-hosted MySQL 8 on a plain EC2 instance in the private subnet -
# chosen over RDS because the sandbox account's RDS availability/limits
# are unknown, and a bare EC2 instance works in any sandbox.

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
  subnet_id              = aws_subnet.private.id
  vpc_security_group_ids = [aws_security_group.mysql.id]

  user_data = templatefile("${path.module}/templates/mysql_user_data.sh.tpl", {
    db_name          = var.mysql_database
    db_user          = var.mysql_app_user
    db_password      = var.mysql_app_password
    db_root_password = var.mysql_root_password
  })

  tags = {
    Name = "${var.project_name}-mysql"
  }
}
