# Types Package Publishing & Deployment Guide

## 📦 Package Information

- **Package Name**: `@shahjahan-arif/billing-types`
- **Current Version**: 1.0.2
- **GitHub Repository**: https://github.com/shahjahan-arif/billing-types.git
- **NPM Registry**: https://www.npmjs.com/package/@shahjahan-arif/billing-types

---

## 🔄 Publishing Workflow

### Step 1: Make Changes to Types

```bash
cd /Users/paytohash/Documents/service-app/types

# Make your changes to files in src/
# Example: src/enums/TicketStatus.ts, src/models/Ticket.ts, etc.
```

### Step 2: Build the Package

```bash
# Compile TypeScript to JavaScript
npm run build

# This generates the dist/ folder with compiled files
```

### Step 3: Update Version

Edit `package.json` and bump the version:

```json
{
  "name": "@shahjahan-arif/billing-types",
  "version": "1.0.3", // Increment version
  // ...
}
```

**Version Guidelines:**
- **Patch** (1.0.x): Bug fixes, minor updates
- **Minor** (1.x.0): New features, backward compatible
- **Major** (x.0.0): Breaking changes

### Step 4: Git Commit & Push

```bash
# Add all changes
git add .

# Commit with descriptive message
git commit -m "feat: Add new feature description"

# Push to GitHub
git push origin main
```

### Step 5: Publish to NPM

```bash
# Login to NPM (only needed once)
npm login

# Publish the package
npm publish --access public

# Verify publication
npm view @shahjahan-arif/billing-types
```

---

## 🚀 Using Published Package in Projects

### Backend Integration

```bash
cd /Users/paytohash/Documents/service-app/backend

# Install/Update the package
npm install @shahjahan-arif/billing-types@latest

# Or update existing
npm update @shahjahan-arif/billing-types
```

### Frontend Integration

```bash
cd /Users/paytohash/Documents/service-app/frontend

# Install/Update the package
npm install @shahjahan-arif/billing-types@latest

# Or update existing
npm update @shahjahan-arif/billing-types
```

### Partner Frontend Integration

```bash
cd /Users/paytohash/Documents/service-app/partner-frontend

# Install/Update the package
npm install @shahjahan-arif/billing-types@latest
```

---

## 📝 Common Publishing Commands

### Quick Publish Checklist

```bash
# 1. Navigate to types directory
cd /Users/paytohash/Documents/service-app/types

# 2. Build the package
npm run build

# 3. Update version in package.json (manually)

# 4. Commit changes
git add .
git commit -m "chore: Bump version to X.X.X"

# 5. Push to GitHub
git push origin main

# 6. Publish to NPM
npm publish --access public
```

### Useful NPM Commands

```bash
# Check current version
npm version

# View package info
npm view @shahjahan-arif/billing-types

# Check published versions
npm view @shahjahan-arif/billing-types versions

# Unpublish a version (within 72 hours only)
npm unpublish @shahjahan-arif/billing-types@1.0.x

# Check what files will be published
npm pack --dry-run
```

---

## 🔧 Main Repository Integration

### Pushing Code to Main Service-App Repo

```bash
# Navigate to main project
cd /Users/paytohash/Documents/service-app

# Check current branch
git branch

# Check status
git status

# Stage changes
git add .

# Commit with descriptive message
git commit -m "feat: Implement equipment issue ticket integration"

# Push to current branch
git push origin icons

# Or push to main
git checkout main
git merge icons
git push origin main
```

### Creating Pull Request

```bash
# Push feature branch
git push origin icons

# Then go to GitHub:
# https://github.com/PayToHash/service-app
# Click "Compare & pull request"
# Add description and submit PR
```

---

## 📋 Recent Changes (v1.0.2)

### What Was Added

1. **TicketCategory Enum** (`src/enums/TicketStatus.ts`)
   ```typescript
   export enum TicketCategory {
     BILLING = 'BILLING',
     TECHNICAL = 'TECHNICAL',
     EQUIPMENT_ISSUE = 'EQUIPMENT_ISSUE', // NEW
     GENERAL = 'GENERAL',
   }
   ```

2. **Ticket Metadata** (`src/models/Ticket.ts`)
   ```typescript
   export interface Ticket {
     // ... existing fields
     metadata?: {
       equipmentId?: string;
       equipmentName?: string;
       equipmentModel?: string;
       issueType?: string;
       [key: string]: any;
     } | null;
   }
   ```

### Integration Points

- **Backend**: TicketService sends notification when equipment issue created
- **Frontend**: ReportIssueModal creates ticket with equipment metadata
- **Provider**: Ticket list shows equipment category badge

---

## 🔒 NPM Authentication

### First Time Setup

```bash
# Login to NPM
npm login

# Enter credentials:
# Username: your-npm-username
# Password: your-npm-password
# Email: your-email@example.com
```

### Using NPM Token

```bash
# Generate token at: https://www.npmjs.com/settings/~/tokens

# Add to ~/.npmrc
//registry.npmjs.org/:_authToken=YOUR_TOKEN_HERE

# Or set environment variable
export NPM_TOKEN=your_token_here
```

---

## 🐛 Troubleshooting

### Build Errors

```bash
# Clean build
npm run clean
npm run build

# Check TypeScript errors
npx tsc --noEmit
```

### Publish Errors

```bash
# Check if version already exists
npm view @shahjahan-arif/billing-types versions

# Verify you're logged in
npm whoami

# Check package.json name matches
cat package.json | grep name
```

### Git Push Errors

```bash
# Pull latest changes first
git pull origin main --rebase

# Force push (use carefully)
git push origin main --force
```

---

## 📚 Best Practices

### Before Publishing

1. ✅ Run `npm run build` successfully
2. ✅ Update version in package.json
3. ✅ Write clear commit message
4. ✅ Test in local project first
5. ✅ Push to GitHub before npm publish
6. ✅ Verify no breaking changes

### Commit Message Format

```bash
# Feature
git commit -m "feat: Add new equipment issue category"

# Bug fix
git commit -m "fix: Correct ticket metadata type"

# Documentation
git commit -m "docs: Update publishing guide"

# Chore
git commit -m "chore: Bump version to 1.0.3"

# Breaking change
git commit -m "feat!: Change ticket interface (BREAKING)"
```

### Version Bumping Strategy

- **Daily updates**: Patch version (1.0.x)
- **New features**: Minor version (1.x.0)
- **API changes**: Major version (x.0.0)

---

## 🔗 Useful Links

- **NPM Package**: https://www.npmjs.com/package/@shahjahan-arif/billing-types
- **GitHub Repo**: https://github.com/shahjahan-arif/billing-types
- **Main Project**: https://github.com/PayToHash/service-app
- **NPM Docs**: https://docs.npmjs.com/

---

## 📞 Support

If you encounter issues:

1. Check NPM registry: `npm view @shahjahan-arif/billing-types`
2. Verify GitHub repo is accessible
3. Ensure you're logged in: `npm whoami`
4. Check package.json syntax
5. Review build output for errors

---

**Last Updated**: November 21, 2025
**Current Version**: 1.0.2
**Maintainer**: PayToHash Team
