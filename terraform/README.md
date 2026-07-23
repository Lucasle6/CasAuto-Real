# Infrastructure (Terraform)

Provisions the AWS architecture described in the [root README](../README.md#architecture) and [docs/architecture.svg](../docs/architecture.svg): a VPC with a public subnet (backend EC2) and a private subnet (MySQL), an S3 bucket for the frontend, and the IAM roles/security groups tying it together.

Runs against the team's shared **AWS sandbox account** — see the notes on session credentials and resets below before applying anything.

## Status

- [x] VPC, subnets, Internet Gateway, route tables (`vpc.tf`)
- [x] Remote state backend (S3 + DynamoDB lock, `bootstrap/`)
- [ ] Security groups
- [ ] MySQL instance in the private subnet
- [ ] EC2 for the backend + IAM roles
- [ ] S3 + static hosting for the frontend (lower priority — the frontend is already live on Vercel: https://cas-auto-real-web.vercel.app/)

## Sandbox notes

- The sandbox is **shared by the whole team** and **resets periodically** (resources get wiped). Treat every `apply` here as disposable — it's the graded proof that the Terraform builds the architecture correctly, not a permanent production host. The actual live app stays on Railway (backend) + Vercel (frontend).
- AWS credentials in the sandbox are typically **session-based and expire** — re-export fresh credentials (`aws_access_key_id`, `aws_secret_access_key`, `aws_session_token`) before each `terraform plan`/`apply` if you get auth errors.
- Because it's shared, state is **remote** (S3 + DynamoDB lock), not local — see below. Re-run the bootstrap step after every sandbox reset, since the state bucket itself gets wiped too.

## Usage

Requires the [Terraform CLI](https://developer.hashicorp.com/terraform/install) and AWS credentials configured (e.g. via `aws configure` or environment variables).

### 1. Bootstrap the remote state backend (once per sandbox reset)

```bash
cd terraform/bootstrap
terraform init
terraform apply
terraform output
```

Copy the `bucket_name` / `dynamodb_table_name` outputs into `terraform/backend.hcl` (copy from `backend.hcl.example`, gitignored since the bucket name is account-specific).

### 2. Apply the actual infrastructure

```bash
cd terraform
cp terraform.tfvars.example terraform.tfvars   # adjust values if needed
terraform init -backend-config=backend.hcl
terraform plan
terraform apply
```

To tear everything down:

```bash
terraform destroy
```
