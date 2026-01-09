#!/bin/bash

# GSAPS Social Media App - Quick Deploy Script
# Usage: ./scripts/deploy.sh [platform]
# Platforms: vercel, netlify, surge, railway, docker

set -e

PLATFORM=${1:-"vercel"}
PROJECT_NAME="gsaps-social-media-app"

echo "🚀 GSAPS Deploy Script"
echo "======================"
echo "Platform: $PLATFORM"
echo ""

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Check if npm dependencies are installed
if [ ! -d "node_modules" ]; then
    echo -e "${YELLOW}Installing dependencies...${NC}"
    npm ci --legacy-peer-deps
fi

# Build the app
echo -e "${BLUE}Building application...${NC}"
CI=false GENERATE_SOURCEMAP=false npm run build

case $PLATFORM in
    "vercel")
        echo -e "${BLUE}Deploying to Vercel...${NC}"

        if ! command -v vercel &> /dev/null; then
            echo "Installing Vercel CLI..."
            npm install -g vercel
        fi

        # Deploy
        vercel --prod

        echo -e "${GREEN}✓ Deployed to Vercel!${NC}"
        ;;

    "netlify")
        echo -e "${BLUE}Deploying to Netlify...${NC}"

        if ! command -v netlify &> /dev/null; then
            echo "Installing Netlify CLI..."
            npm install -g netlify-cli
        fi

        # Deploy
        netlify deploy --prod --dir=build

        echo -e "${GREEN}✓ Deployed to Netlify!${NC}"
        ;;

    "surge")
        echo -e "${BLUE}Deploying to Surge...${NC}"

        if ! command -v surge &> /dev/null; then
            echo "Installing Surge CLI..."
            npm install -g surge
        fi

        # Create 200.html for SPA routing
        cp build/index.html build/200.html

        # Deploy (will prompt for domain if not logged in)
        surge ./build ${PROJECT_NAME}.surge.sh

        echo -e "${GREEN}✓ Deployed to Surge!${NC}"
        echo -e "URL: https://${PROJECT_NAME}.surge.sh"
        ;;

    "railway")
        echo -e "${BLUE}Deploying to Railway...${NC}"

        if ! command -v railway &> /dev/null; then
            echo "Installing Railway CLI..."
            npm install -g @railway/cli
        fi

        # Deploy
        railway up

        echo -e "${GREEN}✓ Deployed to Railway!${NC}"
        ;;

    "docker")
        echo -e "${BLUE}Building and running Docker container...${NC}"

        # Build image
        docker build -t ${PROJECT_NAME}:latest .

        # Stop existing container if running
        docker stop ${PROJECT_NAME} 2>/dev/null || true
        docker rm ${PROJECT_NAME} 2>/dev/null || true

        # Run container
        docker run -d \
            --name ${PROJECT_NAME} \
            -p 8080:80 \
            --restart unless-stopped \
            ${PROJECT_NAME}:latest

        echo -e "${GREEN}✓ Running on http://localhost:8080${NC}"
        ;;

    "local")
        echo -e "${BLUE}Starting local preview server...${NC}"

        if ! command -v serve &> /dev/null; then
            echo "Installing serve..."
            npm install -g serve
        fi

        echo -e "${GREEN}Starting server on http://localhost:3000${NC}"
        serve -s build -l 3000
        ;;

    *)
        echo -e "${RED}Unknown platform: $PLATFORM${NC}"
        echo ""
        echo "Available platforms:"
        echo "  vercel   - Deploy to Vercel (recommended)"
        echo "  netlify  - Deploy to Netlify"
        echo "  surge    - Deploy to Surge.sh"
        echo "  railway  - Deploy to Railway (full-stack)"
        echo "  docker   - Build and run Docker container"
        echo "  local    - Preview build locally"
        exit 1
        ;;
esac

echo ""
echo -e "${GREEN}🎉 Deployment complete!${NC}"
echo ""
echo "2026 Killer Features to test:"
echo "  • Aria AI - Press Ctrl+K"
echo "  • Voice Rooms - /voice-rooms"
echo "  • 3D Spaces - /virtual-spaces"
echo "  • Smart Network - /network"
