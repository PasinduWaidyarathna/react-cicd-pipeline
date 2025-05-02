# CICD Pipeline with DockerHub and EC2

This project demonstrates a complete CI/CD workflow for a React.js application using GitHub Actions. It includes multiple workflows:
- **DockerHub + EC2 Deployment**
- **ECR + EC2 Deployment**
- **Unit Tests and Security Scans**

## Project Structure

```
.github/workflows/
│
├── dockerhub-ec2-cicd.yml          # CI/CD workflow for DockerHub & EC2
├── ecr-ec2-cicd.yml                # CI/CD workflow for AWS ECR & EC2
└── unit-tests-and-vulnerability-scans.yml # PR tests and security scans

nginx/
└── nginx.conf                      # Custom Nginx configuration

Dockerfile                          # Multi-stage Docker build
src/                                # React source code
public/                             # Static public assets
```

---

## CI/CD Pipeline: DockerHub → EC2

**Trigger:** Manual (`workflow_dispatch`)

### Steps:
1. **Build and Push Docker Image**
   - Builds the app using `docker/build-push-action`
   - Pushes image to DockerHub

2. **EC2 Deployment**
   - SSH into the EC2 instance
   - Installs Docker (if not present)
   - Pulls image from DockerHub
   - Runs the container on port 80

---

## CI/CD Pipeline: ECR → EC2

**Trigger:** On push to `main` or manual

### Steps:
1. **Build and Push Docker Image**
   - Uses `aws-actions/configure-aws-credentials` and `docker/build-push-action`
   - Pushes the Docker image to AWS ECR

2. **EC2 Deployment**
   - Installs Docker and AWS CLI (if needed)
   - Authenticates with ECR
   - Pulls the latest image
   - Runs the container

---

## Unit Tests and Vulnerability Scans

**Trigger:** On PR to `main` or manual

### Steps:
1. **Run Unit Tests**
   - Executes tests using `npm test`

2. **File System Scan (Trivy)**
   - Scans the repository's codebase for vulnerabilities

3. **Container Image Scan (Trivy)**
   - Builds the Docker image
   - Scans the image for vulnerabilities
   - Uploads results to GitHub Security tab

---

## Dockerfile

Multi-stage build using Node.js and Nginx:
```Dockerfile
# Build Stage
FROM node:18-alpine as build
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . ./
RUN npm run build

# Production Stage
FROM nginx:stable-alpine
COPY --from=build /app/build /usr/share/nginx/html
COPY nginx/nginx.conf /etc/nginx/conf.d/default.conf
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
```

---

## Nginx Configuration

Supports SPA routing:
```nginx
server {
    listen 80;

    location / {
        root /usr/share/nginx/html;
        index index.html index.htm;
        try_files $uri $uri/ /index.html;
    }

    add_header X-Frame-Options "SAMEORIGIN";
    add_header X-XSS-Protection "1; mode=block";
    add_header X-Content-Type-Options "nosniff";
}
```

---

## Secrets Required

Set the following secrets in your GitHub repo:
- `SSH_USER`, `SSH_HOST`, `SSH_PRIVATE_KEY`
- `DOCKER_USERNAME`, `DOCKER_PASSWORD`
- `AWS_ACCESS_KEY_ID`, `AWS_SECRET_ACCESS_KEY`, `AWS_REGION`, `ECR_REPOSITORY_URI`, `ECR_REGISTRY`

---

## Contributing
Feel free to submit issues, fork the repository, and send pull requests. Contributions are welcome!

## Author
- **Pasindu Waidyarathna**
