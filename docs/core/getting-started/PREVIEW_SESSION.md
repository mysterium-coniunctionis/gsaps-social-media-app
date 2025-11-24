# Local Preview Session (Static Build)

Use this walkthrough to spin up a shareable preview of the GSAPS Social Media App from the optimized production build.

## Prerequisites
- Node.js 14+
- npm 6+
- Ports 3000/host networking available

## Steps
1. Install dependencies
   ```bash
   npm install
   ```
2. Build the production bundle
   ```bash
   npm run build
   ```
3. Serve the static build locally
   ```bash
   npx serve -s build -l 3000
   ```
4. Open the app at `http://localhost:3000` (or forwarded port in your environment).

## Demo credentials
```
Username: demo_user
Password: demo123
```

The experience runs fully offline with mock data; clearing browser storage resets demo state.
