# Consumed by the later modules (security groups, MySQL, EC2, S3).

output "vpc_id" {
  description = "ID of the VPC"
  value       = aws_vpc.main.id
}

output "vpc_cidr" {
  description = "CIDR block of the VPC"
  value       = aws_vpc.main.cidr_block
}

output "internet_gateway_id" {
  description = "ID of the internet gateway"
  value       = aws_internet_gateway.main.id
}

output "public_subnet_id" {
  description = "ID of the public subnet (backend EC2 and, currently, MySQL - see mysql.tf)"
  value       = aws_subnet.public.id
}

output "private_subnet_id" {
  description = "ID of the private subnet (currently unused - no NAT, so nothing here can reach the internet)"
  value       = aws_subnet.private.id
}

output "backend_security_group_id" {
  description = "Security group ID for the backend EC2 instance"
  value       = aws_security_group.backend.id
}

output "mysql_security_group_id" {
  description = "Security group ID for the MySQL instance"
  value       = aws_security_group.mysql.id
}

output "mysql_private_ip" {
  description = "Private IP of the MySQL instance - use this as DATABASE_HOST for the backend"
  value       = aws_instance.mysql.private_ip
}

output "mysql_public_ip" {
  description = "Public IP of the MySQL instance. It gets one because the public subnet's only route out is the Internet Gateway, which requires a public IP for outbound traffic (needed for the dnf install in user_data) - there's no NAT Gateway. Port 3306 is still restricted to the backend security group only; nothing else is open."
  value       = aws_instance.mysql.public_ip
}
