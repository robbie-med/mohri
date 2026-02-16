# Deployment Instructions

## GitHub Setup

1. **Create the repository on GitHub:**
   ```bash
   # Go to github.com and create new repo named "mohri"
   # Or use gh CLI:
   gh repo create mohri --public --source=. --remote=origin
   ```

2. **Push to GitHub:**
   ```bash
   git branch -M main
   git remote add origin git@github.com:robbie-med/mohri.git
   git push -u origin main
   ```

3. **Enable GitHub Pages:**
   - Go to repository Settings → Pages
   - Source: "GitHub Actions"
   - The workflow will automatically deploy on push to main

4. **Verify CNAME:**
   - The CNAME file in `/public` contains: `mohri.robbiemed.org`
   - Your DNS CNAME record should point to: `robbie-med.github.io`

## Alternative: Manual Deployment

If you prefer to deploy manually:

```bash
# Build the project
npm run build

# The dist/ folder contains your site
# Upload dist/ to any static hosting service
```

## Local Development

```bash
# Install dependencies
npm install

# Start dev server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

## Custom Domain Setup

Your CNAME record should be:
```
mohri.robbiemed.org → robbie-med.github.io
```

After first deployment:
- Visit mohri.robbiemed.org
- It may take 5-10 minutes for DNS/SSL to propagate

## Data Persistence

All data is stored in browser localStorage:
- User profile
- People and their timelines
- No backend required
- Data persists across sessions
- Clear browser data to reset

## Updates

To deploy updates:
```bash
git add .
git commit -m "Update: description of changes"
git push origin main
```

GitHub Actions will automatically rebuild and deploy.
