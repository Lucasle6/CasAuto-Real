# Stable public IP for the backend instance.
#
# The frontend reaches the backend through the /api rewrite in
# apps/web/vercel.json, which hardcodes the backend's public IP. Without an
# Elastic IP that address is auto-assigned and changes whenever the instance
# is replaced (or the sandbox is reset), which silently breaks the proxy. The
# Elastic IP pins it so the value in vercel.json stays valid across replacements.

resource "aws_eip" "backend" {
  domain   = "vpc"
  instance = aws_instance.backend.id

  tags = {
    Name = "${var.project_name}-backend-eip"
  }
}
