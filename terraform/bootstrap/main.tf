# One-time bootstrap for the shared Terraform backend (S3 + DynamoDB lock table).
#
# This module intentionally uses LOCAL state, not the S3 backend it creates -
# the backend can't depend on itself. Apply this once per AWS account (e.g.
# once per sandbox reset), then point ../main.tf at the resulting bucket via
# backend.hcl (see ../backend.hcl.example).

terraform {
  required_version = ">= 1.7.0"

  required_providers {
    aws = {
      source  = "hashicorp/aws"
      version = "~> 5.0"
    }
  }
}

provider "aws" {
  region = var.aws_region
}

data "aws_caller_identity" "current" {}

locals {
  bucket_name = "${var.project_name}-tfstate-${data.aws_caller_identity.current.account_id}"
  table_name  = "${var.project_name}-tf-lock"
}

resource "aws_s3_bucket" "tfstate" {
  bucket = local.bucket_name

  # Sandbox accounts can reset; state history isn't precious enough to block
  # teardown on it.
  force_destroy = true

  tags = {
    Name    = local.bucket_name
    Purpose = "terraform-remote-state"
  }
}

resource "aws_s3_bucket_versioning" "tfstate" {
  bucket = aws_s3_bucket.tfstate.id

  versioning_configuration {
    status = "Enabled"
  }
}

resource "aws_s3_bucket_server_side_encryption_configuration" "tfstate" {
  bucket = aws_s3_bucket.tfstate.id

  rule {
    apply_server_side_encryption_by_default {
      sse_algorithm = "AES256"
    }
  }
}

resource "aws_s3_bucket_public_access_block" "tfstate" {
  bucket = aws_s3_bucket.tfstate.id

  block_public_acls       = true
  block_public_policy     = true
  ignore_public_acls      = true
  restrict_public_buckets = true
}

resource "aws_dynamodb_table" "tf_lock" {
  name         = local.table_name
  billing_mode = "PAY_PER_REQUEST"
  hash_key     = "LockID"

  attribute {
    name = "LockID"
    type = "S"
  }

  tags = {
    Name    = local.table_name
    Purpose = "terraform-state-locking"
  }
}
