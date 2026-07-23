output "bucket_name" {
  description = "S3 bucket holding the shared Terraform state - use this in ../backend.hcl"
  value       = aws_s3_bucket.tfstate.id
}

output "dynamodb_table_name" {
  description = "DynamoDB table used for state locking - use this in ../backend.hcl"
  value       = aws_dynamodb_table.tf_lock.name
}

output "region" {
  description = "Region the backend resources were created in"
  value       = var.aws_region
}
