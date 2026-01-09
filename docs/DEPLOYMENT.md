# Deployment Guide

This guide covers all deployment options for the GSAPS Social Media App.

## Quick Start

### One-Click Deploy

| Platform | Deploy Button |
|----------|---------------|
| **Vercel** | [![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/mysterium-coniunctionis/gsaps-social-media-app) |
| **Netlify** | [![Deploy to Netlify](https://www.netlify.com/img/deploy/button.svg)](https://app.netlify.com/start/deploy?repository=https://github.com/mysterium-coniunctionis/gsaps-social-media-app) |
| **Railway** | [![Deploy on Railway](https://railway.app/button.svg)](https://railway.app/template/gsaps-social-media-app) |

### CLI Deploy

```bash
# Quick deploy script
./scripts/deploy.sh [platform]

# Available platforms:
./scripts/deploy.sh vercel    # Deploy to Vercel (recommended)
./scripts/deploy.sh netlify   # Deploy to Netlify
./scripts/deploy.sh surge     # Deploy to Surge.sh
./scripts/deploy.sh railway   # Deploy to Railway
./scripts/deploy.sh docker    # Build & run Docker locally
./scripts/deploy.sh local     # Preview build locally
```

---

## Platform Setup

### 1. Vercel (Recommended)

Vercel offers the best experience for React apps with instant preview deployments.

#### Setup Steps:

1. **Install Vercel CLI:**
   ```bash
   npm install -g vercel
   ```

2. **Login:**
   ```bash
   vercel login
   ```

3. **Deploy:**
   ```bash
   vercel
   ```

4. **Production deploy:**
   ```bash
   vercel --prod
   ```

#### GitHub Integration:
1. Go to [vercel.com](https://vercel.com)
2. Import your GitHub repository
3. Every push automatically deploys
4. Every PR gets a preview URL

#### Required Secrets for GitHub Actions:
```
VERCEL_TOKEN      # From vercel.com/account/tokens
VERCEL_ORG_ID     # From .vercel/project.json after linking
VERCEL_PROJECT_ID # From .vercel/project.json after linking
```

---

### 2. Netlify

Excellent alternative with similar features to Vercel.

#### Setup Steps:

1. **Install Netlify CLI:**
   ```bash
   npm install -g netlify-cli
   ```

2. **Login:**
   ```bash
   netlify login
   ```

3. **Initialize:**
   ```bash
   netlify init
   ```

4. **Deploy:**
   ```bash
   netlify deploy --prod
   ```

#### GitHub Integration:
1. Go to [app.netlify.com](https://app.netlify.com)
2. Click "Add new site" → "Import from Git"
3. Select your repository
4. Build settings are auto-detected from `netlify.toml`

#### Required Secrets for GitHub Actions:
```
NETLIFY_AUTH_TOKEN # From app.netlify.com/user/applications
NETLIFY_SITE_ID    # From site settings → Site details
```

---

### 3. Surge.sh (Simple & Fast)

Best for quick, simple deployments.

#### Setup Steps:

1. **Install Surge:**
   ```bash
   npm install -g surge
   ```

2. **Build and deploy:**
   ```bash
   npm run build
   cp build/index.html build/200.html  # SPA routing
   surge ./build your-domain.surge.sh
   ```

#### Required Secrets for GitHub Actions:
```
SURGE_LOGIN  # Your email
SURGE_TOKEN  # From: surge token
```

---

### 4. Railway (Full-Stack)

Best for deploying both frontend and backend together.

#### Setup Steps:

1. **Install Railway CLI:**
   ```bash
   npm install -g @railway/cli
   ```

2. **Login:**
   ```bash
   railway login
   ```

3. **Initialize:**
   ```bash
   railway init
   ```

4. **Deploy:**
   ```bash
   railway up
   ```

#### Features:
- PostgreSQL database provisioning
- Environment variable management
- Automatic HTTPS
- Preview environments

---

### 5. Docker

For self-hosted or Kubernetes deployments.

#### Local Docker:

```bash
# Build image
docker build -t gsaps-app .

# Run container
docker run -d -p 8080:80 gsaps-app

# Visit http://localhost:8080
```

#### Docker Compose:

```yaml
version: '3.8'
services:
  app:
    build: .
    ports:
      - "8080:80"
    environment:
      - REACT_APP_API_URL=http://api:3001
    depends_on:
      - api
      - db

  api:
    build: ./server
    ports:
      - "3001:3001"
    environment:
      - DATABASE_URL=postgresql://postgres:postgres@db:5432/gsaps
    depends_on:
      - db

  db:
    image: postgres:15-alpine
    environment:
      - POSTGRES_DB=gsaps
      - POSTGRES_PASSWORD=postgres
    volumes:
      - postgres_data:/var/lib/postgresql/data

volumes:
  postgres_data:
```

---

### 6. Kubernetes (Production)

The project includes full Kubernetes manifests with Argo Rollouts for progressive delivery.

#### Deploy to Staging:

```bash
# Set image
cd infra/k8s/overlays/staging
kustomize edit set image ghcr.io/example/gsaps:YOUR_TAG

# Apply
kubectl apply -k .

# Promote rollout
kubectl argo rollouts promote social-media-frontend -n social-media
```

#### Deploy to Production:

```bash
# Set image
cd infra/k8s/overlays/production
kustomize edit set image ghcr.io/example/gsaps:YOUR_TAG

# Apply
kubectl apply -k .
```

---

## Automated Deployments

### Preview Deployments (PRs)

Every PR automatically gets a preview deployment. Configure by setting the `DEPLOY_TARGET` repository variable:

| Value | Platform |
|-------|----------|
| `vercel` | Vercel (default) |
| `netlify` | Netlify |
| `surge` | Surge.sh |
| `pages` | GitHub Pages |

### Production Deployments

- **Main branch** → Staging (Kubernetes)
- **Tags (v*)** → Production (Kubernetes)
- **Manual trigger** → Choose environment

---

## Environment Variables

### Required:

| Variable | Description | Example |
|----------|-------------|---------|
| `REACT_APP_API_URL` | Backend API URL | `https://api.gsaps.com` |
| `REACT_APP_WS_URL` | WebSocket URL | `wss://ws.gsaps.com` |

### Optional:

| Variable | Description | Default |
|----------|-------------|---------|
| `GENERATE_SOURCEMAP` | Generate source maps | `false` |
| `REACT_APP_ENV` | Environment name | `production` |
| `CI` | CI mode | `true` |

---

## Troubleshooting

### Build Fails with Dependency Errors

```bash
npm ci --legacy-peer-deps
```

### SPA Routing Not Working

Ensure you have a redirect rule:
- **Vercel**: Configured in `vercel.json`
- **Netlify**: Configured in `netlify.toml`
- **Surge**: Copy `index.html` to `200.html`
- **Nginx**: Add `try_files $uri /index.html`

### Environment Variables Not Loading

1. Ensure variables start with `REACT_APP_`
2. Rebuild after changing env vars
3. Check platform-specific env var settings

---

## Testing Deployments

After deploying, verify the 2026 Killer Features:

1. **Aria AI** - Press `Ctrl+K` anywhere
2. **Voice Rooms** - Navigate to `/voice-rooms`
3. **3D Spaces** - Navigate to `/virtual-spaces`
4. **Smart Network** - Navigate to `/network`
5. **What's New** - First login shows feature tour

---

## Support

- [GitHub Issues](https://github.com/mysterium-coniunctionis/gsaps-social-media-app/issues)
- [Documentation](./README.md)
