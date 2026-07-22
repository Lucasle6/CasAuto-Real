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
