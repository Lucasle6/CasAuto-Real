variable "aws_region" {
  description = "AWS region to create the state bucket/lock table in"
  type        = string
  default     = "eu-central-1"
}

variable "project_name" {
  description = "Short project name used as a prefix on the bucket/table name"
  type        = string
  default     = "casauto"
}
