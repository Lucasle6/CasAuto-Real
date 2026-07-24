# Infrastructure (Terraform)

Provisions the AWS architecture described in the [root README](../README.md#architecture) and [docs/architecture.svg](../docs/architecture.svg): a VPC with a public subnet (backend EC2) and a private subnet (MySQL), an S3 bucket for the frontend, and the IAM roles/security groups tying it together.

## Status

- [x] VPC, subnets, Internet Gateway, route tables (`vpc.tf`)
- [x] Security groups (`security_groups.tf`) — backend (SSH + API port) and MySQL (only reachable from the backend group)
- [ ] MySQL instance in the private subnet
- [ ] EC2 for the backend + IAM roles
- [ ] S3 + static hosting for the frontend (lower priority — frontend is already live on Vercel: https://cas-auto-real-web.vercel.app/)

## Usage

Requires the [Terraform CLI](https://developer.hashicorp.com/terraform/install) and AWS credentials configured (e.g. via `aws configure` or environment variables).

```bash
cd terraform
cp terraform.tfvars.example terraform.tfvars   # adjust values if needed
terraform init
terraform plan
terraform apply
```

State is currently **local** (`terraform.tfstate`, gitignored) — see [CONTRIBUTING.md](../CONTRIBUTING.md) if this needs to move to a shared remote backend later.

To tear everything down:

```bash
terraform destroy
```
