# Contributing to the GSAPS Social Media App

Thank you for your interest in contributing! This guide outlines how to get set up locally, our coding standards, and how to propose changes.

## 🛠️ Local Development Setup

1. **Clone the repository**
   ```bash
   git clone https://github.com/mysterium-coniunctionis/gsaps-social-media-app.git
   cd gsaps-social-media-app
   ```
2. **Install dependencies**
   ```bash
   npm install
   ```
3. **Run the app locally**
   ```bash
   npm start
   ```
   The development server runs at `http://localhost:3000` by default.

## ✨ Coding Standards

We use **ESLint** and **Prettier** to keep the codebase consistent.

- Run `npm run lint` before opening a pull request. The command enforces zero lint warnings.
- Run `npm run format` to verify formatting. Use `npx prettier --write` on the same globs if files need formatting.
- Prefer functional React components, hooks, and descriptive prop names.
- Keep commits focused and include descriptive messages of the change.

## 🌿 Branching & Pull Requests

1. Create a feature branch from `main` using `git checkout -b feature/your-change`.
2. Make your changes, committing early and often.
3. Rebase onto the latest `main` before opening a PR to keep history clean.
4. Open a pull request against `main` with:
   - A clear title summarizing the change.
   - A description of what changed, why, and any relevant screenshots.
   - A checklist showing lint/tests were run.
5. Request reviews from maintainers and respond to feedback promptly.

## ✅ Required Checks

Before marking a PR ready for review, ensure the following scripts pass:

```bash
# Static analysis
npm run lint

# Unit tests (watch mode disabled with CI=true)
CI=true npm test
```

Thank you for helping improve the GSAPS Social Media App! If you have questions or ideas, feel free to open a discussion or issue.
