# 🚀 Deployment Guide: Render + Supabase

This guide will help you deploy AssignEase using Render for hosting and Supabase for the database.

## Part 1: Setup Supabase Database (5 minutes)

### 1. Create Supabase Account
- Go to https://supabase.com/
- Click **"Start your project"**
- Sign up with GitHub (easiest)

### 2. Create a New Project
- Click **"New Project"**
- Fill in:
  - **Name**: `assignease` (or your choice)
  - **Database Password**: Create a strong password (SAVE THIS!)
  - **Region**: Choose closest to you
  - **Pricing Plan**: Free
- Click **"Create new project"**
- Wait 2-3 minutes for setup

### 3. Get Database Connection String
- Go to **Project Settings** (gear icon, bottom left)
- Click **"Database"** in the left sidebar
- Scroll to **"Connection string"**
- Select **"URI"** tab
- Copy the connection string (looks like):
  ```
  postgresql://postgres:[YOUR-PASSWORD]@db.xxxxx.supabase.co:5432/postgres
  ```
- **IMPORTANT**: Replace `[YOUR-PASSWORD]` with your actual database password!

### 4. Save Your Connection String
Keep this safe - you'll need it for Render!

---

## Part 2: Deploy to Render (10 minutes)

### 1. Go to Render
- Visit https://dashboard.render.com/
- Sign up/login with GitHub

### 2. Create New Web Service
- Click **"New +"** → **"Web Service"**
- Find **"AssignEase"** repository
- Click **"Connect"**

### 3. Configure Service
Fill in these settings:

**Basic Settings:**
- **Name**: `assignease` (or your choice)
- **Region**: Same as Supabase (or closest)
- **Branch**: `main`
- **Root Directory**: Leave blank
- **Runtime**: Python 3
- **Build Command**: `./build.sh`
- **Start Command**: `gunicorn assignease.wsgi:application`
- **Instance Type**: Free

### 4. Add Environment Variables
Click **"Advanced"** → **"Add Environment Variable"**

Add these variables:

| Key | Value |
|-----|-------|
| `SECRET_KEY` | Click "Generate" button |
| `DATABASE_URL` | Your Supabase connection string from Part 1 |
| `PYTHON_VERSION` | `3.11.0` |
| `DEBUG` | `False` |

**Example DATABASE_URL:**
```
postgresql://postgres:YourPassword123@db.abcdefghijk.supabase.co:5432/postgres
```

### 5. Deploy!
- Click **"Create Web Service"**
- Render will start building (takes 5-10 minutes)
- Watch the logs - you should see:
  - ✅ Installing dependencies
  - ✅ Running collectstatic
  - ✅ Running migrations
  - ✅ Starting gunicorn
  - ✅ "Your service is live"

### 6. Access Your App
Your app will be live at:
```
https://assignease.onrender.com
```
(or whatever name you chose)

---

## Part 3: Create Admin User (Required!)

### 1. Open Shell in Render
- Go to your web service in Render
- Click **"Shell"** tab (top right)
- Wait for shell to connect

### 2. Create Superuser
Run this command:
```bash
python manage.py createsuperuser
```

Follow the prompts:
- Username: (your choice)
- Email: (optional, can skip)
- Password: (create strong password)
- Confirm password

### 3. Login to Admin
- Go to: `https://your-app.onrender.com/admin`
- Login with your superuser credentials
- You're in! 🎉

---

## Part 4: Post-Deployment Setup

### 1. Create Departments
- In admin panel, go to **Departments**
- Add your departments (e.g., Computer Science, Mathematics)

### 2. Create Faculty Accounts
- Go to **Faculty** in admin
- Add faculty members with:
  - Faculty ID
  - Name
  - Email
  - Password
  - Department

### 3. Create Student Accounts
- Go to **Students** in admin
- Add students with:
  - Student ID
  - Name
  - Email
  - Password
  - Department

### 4. Create Courses
- Go to **Courses** in admin
- Create courses with:
  - Course code
  - Course name
  - Department
  - Faculty
  - Student key (for enrollment)
  - Faculty key

### 5. Test Everything
- Logout from admin
- Go to main site: `https://your-app.onrender.com`
- Test login as:
  - Student
  - Faculty
  - Admin

---

## 🎉 You're Live!

Your AssignEase LMS is now deployed with:
- ✅ Render hosting (with auto-deploy on git push)
- ✅ Supabase PostgreSQL database
- ✅ HTTPS enabled
- ✅ Static files served via WhiteNoise

---

## 📝 Important Notes

### Free Tier Limitations
- **Render**: App sleeps after 15 min inactivity (30-60s to wake up)
- **Supabase**: 500MB database, 2GB bandwidth/month
- **Media Files**: Uploaded files are lost on restart (use Cloudinary or AWS S3 for production)

### Monitoring
- **Render Logs**: Dashboard → Your Service → "Logs" tab
- **Supabase Database**: Dashboard → Table Editor
- **Errors**: Check Render logs if something breaks

### Updates
When you push to GitHub:
1. Render automatically detects changes
2. Runs build.sh
3. Deploys new version
4. Takes 2-5 minutes

### Database Backups
- Supabase free tier: No automatic backups
- Recommended: Manually export data weekly
- Go to Supabase → Database → Backups

### Custom Domain (Optional)
1. Buy domain (Namecheap, GoDaddy, etc.)
2. In Render: Settings → Custom Domains
3. Add your domain
4. Update DNS records as instructed

---

## 🆘 Troubleshooting

### App shows "Application Error"
- Check Render logs for errors
- Verify DATABASE_URL is correct
- Check SECRET_KEY is set

### Database connection errors
- Verify DATABASE_URL format
- Check Supabase project is not paused
- Ensure password in URL is correct (no special chars causing issues)

### Static files not loading
- Check build logs: "collectstatic" should run
- Verify STATIC_ROOT in settings.py
- WhiteNoise should be in MIDDLEWARE

### App is slow
- Free tier sleeps after 15 min
- First request takes 30-60s
- Upgrade to paid tier for always-on

---

## 🎓 Next Steps

1. **Add Real Data**: Create courses, assignments, students
2. **Test Features**: Calendar, discussions, quizzes, attendance
3. **Share**: Give URL to users
4. **Monitor**: Check logs regularly
5. **Upgrade**: Consider paid tier when ready

**Need help?** Open an issue on GitHub!

---

**Deployed with ❤️ using Render + Supabase**
