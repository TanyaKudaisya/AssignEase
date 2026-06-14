# 🚀 AssignEase - Post-Deployment Setup

## ✅ Automatic Setup

When you deploy to Render, the following happens automatically:

1. ✅ Database tables are created (migrations run)
2. ✅ Admin superuser is created
3. ✅ Sample department (Computer Science) is created
4. ✅ Sample faculty account is created
5. ✅ Sample student account is created
6. ✅ Sample course is created

## 🔑 Default Login Credentials

After deployment completes, you can login with these accounts:

### Admin Panel
- **URL:** `https://your-app.onrender.com/admin`
- **Username:** `admin`
- **Password:** `admin123`

### Faculty Login
- **Faculty ID:** `1001`
- **Password:** `faculty123`

### Student Login
- **Student ID:** `2001`
- **Password:** `student123`

⚠️ **SECURITY:** Change these passwords immediately in production!

---

## 🎯 Next Steps

### 1. Login to Admin Panel
1. Go to `https://your-app.onrender.com/admin`
2. Login with admin credentials above
3. **Change your admin password** (User → admin → Change password)

### 2. Add Your Real Data
- **Departments:** Add your institution's departments
- **Faculty:** Create faculty accounts with proper credentials
- **Students:** Create student accounts
- **Courses:** Create courses with enrollment keys

### 3. Delete Sample Data (Optional)
If you don't need the sample accounts:
- Delete faculty with ID 1001
- Delete student with ID 2001
- Delete CS101 (course)
- Keep Computer Science department or delete if not needed

---

## 🔧 Customizing Admin Credentials

You can set custom admin credentials BEFORE deploying by adding these environment variables in Render:

| Variable | Description | Example |
|----------|-------------|---------|
| `ADMIN_USERNAME` | Custom admin username | `myadmin` |
| `ADMIN_EMAIL` | Custom admin email | `admin@myschool.edu` |
| `ADMIN_PASSWORD` | Custom admin password | `MySecurePass123!` |

**How to set:**
1. Render Dashboard → Your Service
2. Environment tab
3. Add environment variables
4. Save and trigger a new deploy

If not set, defaults above will be used.

---

## 📝 How It Works

The `build.sh` script runs during deployment:

```bash
pip install -r requirements.txt      # Install dependencies
python manage.py collectstatic       # Collect static files
python manage.py migrate             # Create database tables
python manage.py setup_admin         # Create admin & sample data
```

The `setup_admin` command is **idempotent** - it's safe to run multiple times and won't create duplicates.

---

## 🐛 Troubleshooting

**Problem:** Can't login with default credentials

**Solutions:**
1. Check Render logs for `setup_admin` success message
2. Verify migrations ran successfully
3. Check DATABASE_URL is set correctly
4. Try manually triggering a new deploy

**Problem:** "relation does not exist" error

**Solution:** Migration files weren't included. Make sure all `migrations/0001_initial.py` files are in your git repo.

---

## 📚 Documentation

For full deployment guide, see `DEPLOYMENT.md`

For help, open an issue on GitHub!

---

**Auto-generated during deployment** 🤖
