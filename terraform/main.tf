terraform {
  required_version = ">= 1.7.0"

  required_providers {
    aws = {
      source  = "hashicorp/aws"
      version = "~> 5.0"
    }
  }

  # Remote state, shared across the team's AWS sandbox account.
  # Bucket/table are created by ./bootstrap (run once) and only known
  # afterwards, so this is a partial config - run:
  #   terraform init -backend-config=backend.hcl
  # See backend.hcl.example.
  backend "s3" {
    key     = "casauto/terraform.tfstate"
    encrypt = true
  }
}

provider "aws" {
  region = var.aws_region

  default_tags {
    tags = {
      Project     = var.project_name
      Environment = var.environment
      ManagedBy   = "Terraform"
    }
  }
}
