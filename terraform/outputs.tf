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
  description = "ID of the public subnet (for the backend EC2 instance)"
  value       = aws_subnet.public.id
}

output "private_subnet_id" {
  description = "ID of the private subnet (for the MySQL instance)"
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

output "frontend_bucket_name" {
  description = "S3 bucket name - target for `aws s3 sync apps/web/dist s3://<this>`"
  value       = aws_s3_bucket.frontend.id
}

output "frontend_website_endpoint" {
  description = "S3 static website URL for the frontend"
  value       = aws_s3_bucket_website_configuration.frontend.website_endpoint
}
