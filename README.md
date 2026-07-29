# Autohaus Royal

Fullstack web application for a German car dealership built with React, NestJS, and MySQL.

## Tech Stack

- **Frontend:** React 18, TypeScript, Vite, Tailwind CSS, React Router, Zustand
- **Backend:** NestJS, TypeORM, JWT Authentication
- **Database:** MySQL 8 (Docker)

## Features

- Vehicle catalog with filters (brand, category, fuel type, price, year)
- Vehicle detail page with test drive booking
- Favorites/watchlist — save vehicles and revisit them on `/merkliste` (stored in `localStorage`, no account needed)
- Admin panel (protected with JWT)
  - Add, edit, and delete vehicles
  - View appointments
- Landing page with reviews and footer
- Contact, About, and Careers pages

## Architecture

![Architecture diagram](docs/architecture.svg)

The app runs inside a VPC: the frontend is served from an S3 bucket, the backend API runs in the public subnet, and MySQL lives in the private subnet, only reachable from the backend.

> **Note:** the current Terraform implementation runs MySQL in the public subnet instead, restricted to the backend by security group rather than subnet isolation - see [terraform/README.md](terraform/README.md) for why. The diagram above shows the target design this deviates from.

## Getting Started

### Prerequisites

- Node.js v20+
- pnpm
- Docker Desktop

### Installation

1. Clone the repository

\`\`\`bash
git clone https://github.com/YOUR_USERNAME/autohaus.git
cd autohaus
\`\`\`

2. Start MySQL with Docker

\`\`\`bash
docker-compose up -d
\`\`\`

3. Setup the backend

\`\`\`bash
cd apps/api
cp .env.example .env
pnpm install
pnpm start:dev
\`\`\`

4. Setup the frontend

\`\`\`bash
cd apps/web
pnpm install
pnpm dev
\`\`\`

### Access

| Service | URL |
|---|---|
| Frontend | http://localhost:5173 |
| Backend API | http://localhost:3000 |
| Admin Panel | http://localhost:5173/admin |

### Default Admin Credentials

Create an admin user by sending a POST request to:

\`\`\`
POST http://localhost:3000/auth/register
{
  "email": "admin@autohaus.de",
  "password": "your_password"
}
\`\`\`

## API Endpoints

### Vehicles
| Method | Endpoint | Description |
|---|---|---|
| GET | /vehicles | Get all vehicles (with filters) |
| GET | /vehicles/:id | Get vehicle by ID |
| POST | /vehicles | Create vehicle |
| PATCH | /vehicles/:id | Update vehicle |
| DELETE | /vehicles/:id | Delete vehicle |

### Appointments
| Method | Endpoint | Description |
|---|---|---|
| GET | /appointments | Get all appointments |
| POST | /appointments | Create appointment |

### Auth
| Method | Endpoint | Description |
|---|---|---|
| POST | /auth/login | Login |
| POST | /auth/register | Register admin user |

### Newsletter
| Method | Endpoint | Description |
|---|---|---|
| POST | /newsletter/subscribe | Subscribe an email to the newsletter |
| GET | /newsletter/subscribers | List subscribers |

> In production these endpoints are reached through the `/api` proxy, e.g. `GET /api/vehicles` on the frontend resolves to `GET /vehicles` on the backend. See [Deployment](#deployment-production).

## Project Structure

\`\`\`
autohaus/
├── apps/
│   ├── web/          # React frontend
│   └── api/          # NestJS backend
├── terraform/        # AWS infrastructure (VPC, EC2, S3, MySQL) - see terraform/README.md
├── docker-compose.yml
└── package.json
\`\`\`

## Deployment (Production)

The app is deployed and live. The frontend runs on **Vercel**; the backend and database run on **AWS**, provisioned with Terraform.

| Piece | Where | Address |
|---|---|---|
| Frontend | Vercel | https://cas-auto-real-web.vercel.app |
| Backend API | AWS EC2 (Elastic IP) | `http://3.77.123.218:3000` |
| Database | Self-hosted MySQL 8 on EC2 | Private, reachable only from the backend |

### How the pieces connect

The browser only ever talks to Vercel over HTTPS. Requests to `/api/*` are rewritten by [`apps/web/vercel.json`](apps/web/vercel.json) to the backend's Elastic IP, so Vercel proxies them to the backend server-side over HTTP and the browser never sees mixed content. `VITE_API_URL` is set to `/api` in the Vercel project, so every `${VITE_API_URL}/...` call resolves to the proxied path.

The backend is an EC2 instance that builds `apps/api/Dockerfile` from a fresh git clone on boot and runs the container. Its public address is pinned with an Elastic IP so instance replacements don't change it. MySQL runs on its own EC2 instance, reachable only from the backend's security group on port 3306.

### Deploying / updating the infrastructure

The AWS side is managed entirely by Terraform. State lives remotely in an S3 bucket with a DynamoDB lock, shared across the team. The full step-by-step (bootstrap, AWS SSO credentials, apply) is in [terraform/README.md](terraform/README.md). In short:

\`\`\`bash
cd terraform
terraform init -backend-config=backend.hcl
terraform plan
terraform apply
\`\`\`

To roll a change that only runs in `user_data` (which executes on first boot) onto the running backend, replace just that instance — MySQL is a separate instance and stays untouched, and the Elastic IP re-attaches automatically:

\`\`\`bash
terraform apply -replace=aws_instance.backend
\`\`\`

The frontend deploys on its own: pushing to `main` triggers a Vercel build of `apps/web`.

### Required Terraform variables

Set these before applying, via `terraform.tfvars` or `TF_VAR_*` environment variables. They have no defaults and must never be committed:

| Variable | Purpose |
|---|---|
| `mysql_app_password` | Password for the application database user |
| `mysql_root_password` | MySQL root password |
| `jwt_secret` | Secret used to sign the backend's JWTs |

See [terraform/terraform.tfvars.example](terraform/terraform.tfvars.example) for the full list and the character-safety notes for these secrets.