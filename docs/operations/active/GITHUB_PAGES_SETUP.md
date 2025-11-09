# 📄 GitHub Pages Setup Guide

This guide will help you enable GitHub Pages for the GSAPS Social Media App, creating a beautiful public documentation site.

---

## 🎯 What You'll Get

After setup, you'll have a live website at:
```
https://mysterium-coniunctionis.github.io/gsaps-social-media-app
```

The site will feature:
- ✨ Beautiful landing page showcasing all features
- 📊 Real-time project statistics
- 🗺️ Interactive development roadmap
- 🔗 Direct links to GitHub repo and documentation
- 📱 Fully responsive design

---

## ⚡ Quick Setup (5 Minutes)

### Step 1: Enable GitHub Pages

1. Go to your repository on GitHub:
   ```
   https://github.com/mysterium-coniunctionis/gsaps-social-media-app
   ```

2. Click **Settings** (top menu)

3. Scroll down to **Pages** in the left sidebar

4. Under **Source**, select:
   - **Source:** Deploy from a branch
   - **Branch:** `main`
   - **Folder:** `/docs`

5. Click **Save**

### Step 2: Wait for Deployment

GitHub will automatically deploy your site. This takes 2-5 minutes.

You'll see a message:
```
✅ Your site is live at https://mysterium-coniunctionis.github.io/gsaps-social-media-app/
```

### Step 3: Verify

Visit your live site:
```
https://mysterium-coniunctionis.github.io/gsaps-social-media-app/
```

You should see the beautiful GSAPS landing page!

---

## 🚀 Automated Deployment (Already Configured!)

I've set up GitHub Actions to automatically deploy updates. Every time you push to `main`:

1. ✅ GitHub Actions runs automatically
2. ✅ Deploys the latest `docs/` folder
3. ✅ Your site updates within 2-5 minutes

**Workflow file:** `.github/workflows/pages.yml`

---

## 📁 What Was Created

### Files Added:

1. **`docs/index.html`** - Beautiful landing page
   - Modern gradient design
   - Feature showcase
   - Technology stack
   - Development roadmap
   - Quick start guide
   - Statistics dashboard

2. **`docs/_config.yml`** - Jekyll configuration
   - Site metadata
   - SEO settings
   - Theme configuration

3. **`.github/workflows/pages.yml`** - Automated deployment
   - Triggers on push to main
   - Deploys docs folder
   - No manual intervention needed

---

## 🎨 Customizing Your Site

### Update Landing Page

Edit `docs/index.html` to customize:
- **Colors:** Change gradient colors in `<style>` section
- **Content:** Update text, statistics, features
- **Links:** Modify GitHub URLs and social links
- **Images:** Add screenshots or logos

### Update Site Metadata

Edit `docs/_config.yml` to change:
- **Title:** Site name
- **Description:** SEO description
- **URL:** Production URL
- **Social links:** Twitter, LinkedIn, etc.

---

## 🔍 Monitoring Deployments

### Check Deployment Status

1. Go to **Actions** tab in your GitHub repo
2. Look for "Deploy to GitHub Pages" workflow
3. Click to see deployment logs

### View Deployment History

1. Go to **Settings** → **Pages**
2. See all deployments under "GitHub Pages"
3. Each deployment shows:
   - Commit hash
   - Deployment time
   - Success/failure status

---

## 🐛 Troubleshooting

### Site Not Loading?

**Check deployment status:**
1. Go to **Actions** tab
2. Look for green checkmark on latest workflow
3. If red X, click to see error logs

**Common fixes:**
- Wait 5-10 minutes (first deployment is slower)
- Clear browser cache (Cmd+Shift+R)
- Check that `/docs` folder exists in main branch

### 404 Error?

Make sure:
- ✅ GitHub Pages is enabled in Settings
- ✅ Source is set to `main` branch, `/docs` folder
- ✅ `docs/index.html` exists in repository

### Styles Not Loading?

If page loads but looks unstyled:
- Check browser console for errors (F12)
- Verify `index.html` has inline styles
- Clear browser cache and reload

---

## 📊 Adding Google Analytics (Optional)

Want to track visitors?

1. Get a Google Analytics tracking ID

2. Edit `docs/_config.yml`:
   ```yaml
   google_analytics: UA-XXXXXXXXX-X
   ```

3. Add tracking script to `docs/index.html` before `</head>`:
   ```html
   <!-- Google Analytics -->
   <script async src="https://www.googletagmanager.com/gtag/js?id=UA-XXXXXXXXX-X"></script>
   <script>
     window.dataLayer = window.dataLayer || [];
     function gtag(){dataLayer.push(arguments);}
     gtag('js', new Date());
     gtag('config', 'UA-XXXXXXXXX-X');
   </script>
   ```

---

## 🎯 Custom Domain (Optional)

Want to use your own domain? (e.g., `docs.gsaps.org`)

### Step 1: Add CNAME File

Create `docs/CNAME`:
```
docs.gsaps.org
```

### Step 2: Configure DNS

At your domain registrar, add a CNAME record:
```
Type: CNAME
Host: docs
Value: mysterium-coniunctionis.github.io
```

### Step 3: Update GitHub Settings

1. Go to **Settings** → **Pages**
2. Under **Custom domain**, enter: `docs.gsaps.org`
3. Click **Save**
4. Wait for DNS check (can take up to 24 hours)

---

## 🔗 Sharing Your Site

### Social Media

Share your beautiful new docs site:
```
🎉 Check out the GSAPS Social Media App!

A next-generation academic social platform for psychedelic research.

🔬 Research Library
💬 Rich Engagement
🎨 Modern Design

https://mysterium-coniunctionis.github.io/gsaps-social-media-app/

#GSAPS #OpenSource #React
```

### Add to README

The README already links to docs, but you can add a badge:
```markdown
[![Documentation](https://img.shields.io/badge/docs-live-brightgreen)](https://mysterium-coniunctionis.github.io/gsaps-social-media-app/)
```

---

## ✅ Success Checklist

After setup, verify:

- [x] GitHub Pages enabled in Settings
- [x] Source set to `main` branch, `/docs` folder
- [x] Actions workflow running successfully
- [x] Site loads at GitHub Pages URL
- [x] All links work correctly
- [x] Responsive design works on mobile
- [x] SEO metadata present

---

## 📚 Additional Resources

- [GitHub Pages Documentation](https://docs.github.com/en/pages)
- [Jekyll Themes](https://pages.github.com/themes/)
- [GitHub Actions for Pages](https://github.com/actions/deploy-pages)

---

## 🎉 You're Done!

Your GSAPS Social Media App now has:
- ✅ Professional documentation site
- ✅ Automated deployments
- ✅ Beautiful landing page
- ✅ SEO optimization

Share it with the world! 🚀
