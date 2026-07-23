# Infrastructure (Terraform)

Provisions the AWS architecture described in the [root README](../README.md#architecture) and [docs/architecture.svg](../docs/architecture.svg): a VPC with a public subnet (backend EC2, and MySQL - see the note below) and a private subnet, an S3 bucket for the frontend, and the IAM roles/security groups tying it together.

**Deviation from the diagram:** MySQL runs in the public subnet, not the private one shown in `docs/architecture.svg`. The private subnet has no NAT Gateway, so an instance there can't reach the internet at all - and `mysql.tf`'s `user_data` needs internet access to install MySQL. Adding a NAT Gateway would have kept MySQL private but costs money to run continuously; running it in the public subnet instead keeps this free, at the cost of MySQL only being one security-group misconfiguration away from exposure instead of two. The private subnet is currently unused as a result.

## Status

- [x] VPC, subnets, Internet Gateway, route tables (`vpc.tf`)
- [x] Security groups (`security_groups.tf`) — backend (SSH + API port) and MySQL (only reachable from the backend group)
- [x] MySQL instance (`mysql.tf`) — self-hosted MySQL 8 on EC2, not RDS (RDS availability in the sandbox is unknown). Runs in the **public** subnet, not private as originally planned - the private subnet has no NAT, so `dnf install` in `user_data` couldn't reach the internet there. Locked down to the backend's security group only (port 3306, nothing else). See the comment in `mysql.tf`.
- [x] EC2 for the backend + IAM roles (`ec2.tf`, `iam.tf`) — builds `apps/api/Dockerfile` from a fresh git clone on boot and runs it
- [ ] S3 + static hosting for the frontend (lower priority — frontend is already live on Vercel: https://cas-auto-real-web.vercel.app/)

**Note:** the backend instance needs `apps/api/Dockerfile` to exist on whatever branch `git_branch` points at (default `main`) — merge the backend-dockerfile PR before applying this.

## Usage

Requires the [Terraform CLI](https://developer.hashicorp.com/terraform/install) and AWS credentials configured (e.g. via `aws configure` or environment variables).

```bash
cd terraform
cp terraform.tfvars.example terraform.tfvars   # adjust values if needed
# then edit terraform.tfvars and set mysql_app_password / mysql_root_password / jwt_secret
# (or export TF_VAR_mysql_app_password / TF_VAR_mysql_root_password / TF_VAR_jwt_secret instead)
terraform init
terraform plan
terraform apply
```

Once applied, the API is reachable at `http://<backend_public_ip output>:3000` and can be reached for shell access via SSM (`aws ssm start-session --target <instance-id>`) without needing an SSH key.

State is currently **local** (`terraform.tfstate`, gitignored) — see [CONTRIBUTING.md](../CONTRIBUTING.md) if this needs to move to a shared remote backend later.

To tear everything down:

```bash
terraform destroy
```
