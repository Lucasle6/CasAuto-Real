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
