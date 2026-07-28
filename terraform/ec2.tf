# Backend EC2 instance in the public subnet. Builds and runs the NestJS API
# straight from apps/api/Dockerfile at boot - there's no container registry
# in this setup, so the image is built on the instance itself.
#
# Requires apps/api/Dockerfile to exist on the branch/ref this checks out
# (git_branch, default "main") - see the backend-dockerfile PR.

resource "aws_instance" "backend" {
  ami                    = data.aws_ami.amazon_linux.id
  instance_type          = var.backend_instance_type
  subnet_id              = aws_subnet.public.id
  vpc_security_group_ids = [aws_security_group.backend.id]
  iam_instance_profile   = aws_iam_instance_profile.backend.name

  # Pin the root disk size explicitly instead of inheriting the AMI default.
  # The AMI (data.aws_ami.amazon_linux, most_recent) drifted to an image whose
  # default root volume is only 2 GB, which is too small to `docker build` the
  # Node monorepo on boot ("no space left on device"). ignore_changes=[ami]
  # guards normal applies, but a forced -replace still launches from the current
  # (drifted) AMI, so the size must be set here, not left to the AMI.
  root_block_device {
    volume_size = 30
    volume_type = "gp3"
  }

  user_data = templatefile("${path.module}/templates/backend_user_data.sh.tpl", {
    git_repo_url   = var.git_repo_url
    git_branch     = var.git_branch
    backend_port   = var.backend_port
    mysql_host     = aws_instance.mysql.private_ip
    mysql_port     = 3306
    mysql_user     = var.mysql_app_user
    mysql_password = var.mysql_app_password
    mysql_database = var.mysql_database
    jwt_secret     = var.jwt_secret
  })

  tags = {
    Name = "${var.project_name}-backend"
  }

  # See mysql.tf for the rationale. AMI drift would force a rebuild (new IP,
  # ~minutes of downtime while it re-clones and rebuilds the image); user_data
  # only runs on first boot so updating it in place is pointless churn. The
  # Elastic IP (eip.tf) keeps the address stable regardless.
  lifecycle {
    ignore_changes = [ami, user_data]
  }
}
