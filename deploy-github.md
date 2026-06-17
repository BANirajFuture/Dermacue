# Push Dermacue to GitHub — step-by-step

Your code is ready locally at `study_Agent/dermacue/` with an initial commit on branch `main`.

Account email: **ba.pm.niraj.verma@gmail.com** (use this to sign in to GitHub).

---

## Part 1 — Connect GitHub (one-time)

### A. Create or sign in to GitHub

1. Open [https://github.com/login](https://github.com/login)
2. Sign in with **ba.pm.niraj.verma@gmail.com**  
   - If you don’t have an account: **Sign up** → use that email → verify email

### B. Install GitHub CLI (optional but easiest)

On Mac (Terminal):

```bash
brew install gh
gh auth login
```

Choose:

- GitHub.com
- HTTPS
- Login with browser → authorize when browser opens

Verify:

```bash
gh auth status
```

### C. Git identity on your Mac (one-time, if not set)

Git needs a name/email **on your machine** for commits (separate from GitHub login):

```bash
git config --global user.email "ba.pm.niraj.verma@gmail.com"
git config --global user.name "Niraj Verma"
```

Check:

```bash
git config --global --list
```

---

## Part 2 — Create repo on GitHub and push

Open Terminal and run:

```bash
cd /Users/nirajverma/study_Agent/dermacue
```

### Option A — Using GitHub CLI (recommended)

```bash
gh repo create dermacue --public --source=. --remote=origin --push
```

- Creates repo `dermacue` under your GitHub user
- Pushes `main` automatically  
- Repo URL: `https://github.com/YOUR_USERNAME/dermacue`

If the name `dermacue` is taken, use:

```bash
gh repo create dermacue-clinic --public --source=. --remote=origin --push
```

### Option B — Using GitHub website (no `gh` CLI)

1. Go to [https://github.com/new](https://github.com/new)
2. **Repository name:** `dermacue`
3. **Public**
4. Do **not** add README, .gitignore, or license (you already have code)
5. Click **Create repository**
6. Copy the commands under “…or push an existing repository from the command line”:

```bash
cd /Users/nirajverma/study_Agent/dermacue
git remote add origin https://github.com/YOUR_USERNAME/dermacue.git
git branch -M main
git push -u origin main
```

When prompted for password: use a **Personal Access Token**, not your GitHub password.

**Create token:** GitHub → Settings → Developer settings → Personal access tokens → Tokens (classic) → Generate → scope **repo** → copy token and paste when Terminal asks for password.

---

## Part 3 — Verify on GitHub

1. Open `https://github.com/YOUR_USERNAME/dermacue`
2. You should see:
   - `phase-1-website/index.html`
   - `plans/`
   - `README.md`

---

## Part 4 — Deploy to Vercel (share link with reviewers)

1. [https://vercel.com](https://vercel.com) → **Sign up with GitHub** (same account)
2. **Add New Project** → Import **dermacue**
3. **Root Directory:** click Edit → set to **`phase-1-website`**
4. **Build Command:** leave empty  
5. **Output Directory:** leave empty  
6. **Deploy**

You get a live URL like: `https://dermacue-xyz.vercel.app`

Every `git push` to `main` redeploys automatically.

Full detail: `phase-1-website/deploy-vercel.md`

---

## Part 5 — After push (before sharing with clinic)

Edit `phase-1-website/config.js`:

- `whatsapp`, `phoneDisplay`, `phoneTel`, `email`
- Optional: `bookingUrl` (Practo link)

Then:

```bash
cd /Users/nirajverma/study_Agent/dermacue
git add phase-1-website/config.js
git commit -m "Add clinic contact details"
git push
```

Vercel redeploys in ~1 minute.

Photos: see `plans/phase-1-mvp-website.md` → **Add photos**.

---

## Troubleshooting

| Problem | Fix |
|---------|-----|
| `gh: command not found` | Use Option B (website) or `brew install gh` |
| `Permission denied (publickey)` | Use HTTPS remote URL, not SSH |
| `Authentication failed` | Use Personal Access Token as password |
| Vercel shows 404 | Root Directory must be `phase-1-website` |
| Wrong GitHub account | `gh auth logout` then `gh auth login` again |

---

## What’s already done locally

- Git repo initialized in `dermacue/`
- Initial commit on `main` (website + plans + i18n)
- You only need: **create remote repo + push** (Part 2)
