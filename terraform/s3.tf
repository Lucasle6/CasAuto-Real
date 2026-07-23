# S3 static website hosting for the frontend, per docs/architecture.svg.
#
# Note: this only provisions the bucket - it doesn't upload apps/web's
# build output. After `pnpm build` in apps/web, sync it manually or via CI:
#   aws s3 sync apps/web/dist s3://<bucket_name from output> --delete
#
# The frontend is already live on Vercel (see README), so this bucket is
# the Terraform/AWS-architecture deliverable, not the primary deployment.

data "aws_caller_identity" "current" {}

locals {
  frontend_bucket_name = "${var.project_name}-frontend-${data.aws_caller_identity.current.account_id}"
}

resource "aws_s3_bucket" "frontend" {
  bucket        = local.frontend_bucket_name
  force_destroy = true

  tags = {
    Name = local.frontend_bucket_name
  }
}

resource "aws_s3_bucket_website_configuration" "frontend" {
  bucket = aws_s3_bucket.frontend.id

  index_document {
    suffix = "index.html"
  }

  # React Router routing: unknown paths fall back to index.html instead of
  # S3's default 404, same reasoning as apps/web/vercel.json's rewrite rule.
  error_document {
    key = "index.html"
  }
}

resource "aws_s3_bucket_public_access_block" "frontend" {
  bucket = aws_s3_bucket.frontend.id

  block_public_acls       = true
  ignore_public_acls      = true
  block_public_policy     = false
  restrict_public_buckets = false
}

resource "aws_s3_bucket_policy" "frontend_public_read" {
  bucket = aws_s3_bucket.frontend.id
  policy = jsonencode({
    Version = "2012-10-17"
    Statement = [{
      Sid       = "PublicReadGetObject"
      Effect    = "Allow"
      Principal = "*"
      Action    = "s3:GetObject"
      Resource  = "${aws_s3_bucket.frontend.arn}/*"
    }]
  })

  depends_on = [aws_s3_bucket_public_access_block.frontend]
}
