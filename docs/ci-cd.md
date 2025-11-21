# CI/CD, Security, and Delivery Guide

This repository uses GitHub Actions for CI, security scanning, and Kubernetes delivery with staging and production environments.

## Workflows

- **CI** (`.github/workflows/ci.yml`)
  - Triggers on pull requests and pushes to main.
  - Runs `npm ci`, `npm run lint`, `npm test -- --watch=false --passWithNoTests`, and `npm run build`.
  - Uploads build artifacts for downstream jobs.
- **Security** (`.github/workflows/security.yml`)
  - Runs `npm audit --audit-level=high`.
  - Uses Trivy to scan the working directory and Docker image configuration for CVEs and misconfigurations.
- **Deploy** (`.github/workflows/deploy.yml`)
  - Builds and pushes a Docker image to GHCR.
  - Deploys to Kubernetes with Kustomize overlays for `staging` and `production`.
  - Uses Argo Rollouts for blue/green releases with active and preview services.
  - Requires GitHub environment protection for `staging` and `production`.

## Required GitHub Secrets

- `GHCR_USERNAME` / `GHCR_TOKEN` (or use `GITHUB_TOKEN`) for container pushes.
- `KUBE_CONFIG_STAGING` and `KUBE_CONFIG_PRODUCTION` for kubectl access.
- `OTEL_EXPORTER_OTLP_ENDPOINT` / `OTEL_EXPORTER_OTLP_TOKEN` in the Kubernetes secret store for observability export.
- Secret manager entries referenced by `infra/k8s/base/external-secret.yaml` (`/social-media/observability`, `/social-media/frontend`).

## Deploy Targets

- Kustomize overlays live in `infra/k8s/overlays/staging` and `infra/k8s/overlays/production`.
- Blue/green rollout uses `social-media-frontend` active service and `social-media-frontend-preview` for previews.
- HorizontalPodAutoscaler handles autoscaling; ingress annotations assume an NGINX ingress in front of a CDN (e.g., Cloudflare).
- Object storage (ACK S3 Bucket) and External Secrets provide media storage and secret management.

## Local Validation

```bash
npm ci
npm run lint
npm test -- --watch=false --passWithNoTests
npm run build
```

To preview Kubernetes manifests locally:

```bash
kubectl kustomize infra/k8s/overlays/staging
kubectl kustomize infra/k8s/overlays/production
```
