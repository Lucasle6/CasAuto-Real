# Infrastructure (Terraform)

Provisions the AWS architecture described in the [root README](../README.md#architecture) and [docs/architecture.svg](../docs/architecture.svg): a VPC with a public subnet (backend EC2, and MySQL - see the note below) and a private subnet, an S3 bucket for the frontend, and the IAM roles/security groups tying it together.

**Deviation from the diagram:** MySQL runs in the public subnet, not the private one shown in `docs/architecture.svg`. The private subnet has no NAT Gateway, so an instance there can't reach the internet at all - and `mysql.tf`'s `user_data` needs internet access to install MySQL. Adding a NAT Gateway would have kept MySQL private but costs money to run continuously; running it in the public subnet instead keeps this free, at the cost of MySQL only being one security-group misconfiguration away from exposure instead of two. The private subnet is currently unused as a result.

Runs against the team's shared **AWS sandbox account** — see the notes on session credentials and resets below before applying anything.

## Status

- [x] VPC, subnets, Internet Gateway, route tables (`vpc.tf`)
- [x] Remote state backend (S3 + DynamoDB lock, `bootstrap/`)
- [x] Security groups (`security_groups.tf`) — backend (SSH + API port) and MySQL (only reachable from the backend group)
- [x] MySQL instance (`mysql.tf`) — self-hosted MySQL 8 on EC2, not RDS (RDS availability in the sandbox is unknown). Runs in the **public** subnet, not private as originally planned - the private subnet has no NAT, so `dnf install` in `user_data` couldn't reach the internet there. Locked down to the backend's security group only (port 3306, nothing else). See the comment in `mysql.tf`.
- [x] EC2 for the backend + IAM roles (`ec2.tf`, `iam.tf`) — builds `apps/api/Dockerfile` from a fresh git clone on boot and runs it
- [x] S3 + static hosting for the frontend (`s3.tf`) — provisions the bucket only; `apps/web/dist` still needs to be synced there manually or via CI. The frontend is already live on Vercel: https://cas-auto-real-web.vercel.app/, so this is the Terraform/architecture deliverable, not the primary deployment.

**Note:** the backend instance needs `apps/api/Dockerfile` to exist on whatever branch `git_branch` points at (default `main`) — merge the backend-dockerfile PR before applying this.

**S3 limitations (fine for this deliverable, worth knowing):**
- The website endpoint is **HTTP only** - S3 static website hosting doesn't support HTTPS directly. Getting HTTPS in front of it would mean adding CloudFront (or another CDN/proxy), which is out of scope here since the frontend's real deployment is Vercel anyway.
- `error_document` (`index.html`, for React Router's client-side routes) is served with an actual **404 status code**, not a 200 - S3 website hosting always does this for the configured error document, there's no way to make it a true rewrite without CloudFront + a rewrite function. The page still renders correctly since the browser gets the HTML regardless of status code, but this differs from `apps/web/vercel.json`'s rewrite, which returns 200.

## Sandbox notes

- The sandbox is **shared by the whole team**. It may still reset periodically (unclear how reliably), but it currently holds a **real, applied deployment with migrated production data** in MySQL - it is not disposable anymore. `ec2.tf`/`mysql.tf` pin `lifecycle { ignore_changes = [ami, user_data] }` specifically so a routine `terraform apply` can't accidentally replace (and wipe) the MySQL instance via AMI drift - see the comment in `mysql.tf` before touching that. Back up the MySQL data before any change that might replace either instance.
- AWS credentials in the sandbox are typically **session-based and expire** — re-export fresh credentials (`aws_access_key_id`, `aws_secret_access_key`, `aws_session_token`) before each `terraform plan`/`apply` if you get auth errors.
- Because it's shared, state is **remote** (S3 + DynamoDB lock), not local — see below. If the sandbox does get reset, re-run the bootstrap step, since the state bucket itself would be wiped too.

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
# then edit terraform.tfvars and set mysql_app_password / mysql_root_password / jwt_secret
# (or export TF_VAR_mysql_app_password / TF_VAR_mysql_root_password / TF_VAR_jwt_secret instead)
terraform init -backend-config=backend.hcl
terraform plan
terraform apply
```

Once applied, the API is reachable at `http://<backend_elastic_ip output>:3000` (stable across replacements - see `eip.tf`) and can be reached for shell access via SSM (`aws ssm start-session --target <instance-id>`) without needing an SSH key.

To tear everything down:

```bash
terraform destroy
```
