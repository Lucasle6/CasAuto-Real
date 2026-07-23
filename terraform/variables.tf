variable "aws_region" {
  description = "AWS region to deploy into"
  type        = string
  default     = "eu-central-1"
}

variable "availability_zone" {
  description = "Availability zone for the public and private subnets"
  type        = string
  default     = "eu-central-1a"
}

variable "project_name" {
  description = "Short project name used as a prefix/tag on all resources"
  type        = string
  default     = "casauto"
}

variable "environment" {
  description = "Deployment environment (e.g. production, staging)"
  type        = string
  default     = "production"
}

variable "vpc_cidr" {
  description = "CIDR block for the VPC"
  type        = string
  default     = "10.0.0.0/16"
}

variable "public_subnet_cidr" {
  description = "CIDR block for the public subnet (backend EC2)"
  type        = string
  default     = "10.0.1.0/24"
}

variable "private_subnet_cidr" {
  description = "CIDR block for the private subnet (MySQL)"
  type        = string
  default     = "10.0.2.0/24"
}

variable "ssh_allowed_cidr" {
  description = "CIDR allowed to SSH into the backend EC2 instance. Override in terraform.tfvars to restrict to your own IP (e.g. \"203.0.113.4/32\")."
  type        = string
  default     = "0.0.0.0/0"
}

variable "backend_port" {
  description = "Port the NestJS API listens on"
  type        = number
  default     = 3000
}

variable "mysql_instance_type" {
  description = "EC2 instance type for the self-hosted MySQL instance"
  type        = string
  default     = "t3.micro"
}

variable "mysql_database" {
  description = "Name of the application database to create"
  type        = string
  default     = "autohaus_db"
}

variable "mysql_app_user" {
  description = "MySQL user the backend connects as"
  type        = string
  default     = "app"
}

variable "mysql_app_password" {
  description = "Password for the backend's MySQL user. Set via terraform.tfvars (gitignored) or TF_VAR_mysql_app_password - never commit it."
  type        = string
  sensitive   = true
}

variable "mysql_root_password" {
  description = "MySQL root password. Set via terraform.tfvars (gitignored) or TF_VAR_mysql_root_password - never commit it."
  type        = string
  sensitive   = true
}
