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
}
