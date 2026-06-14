# AssignEase

A modern Learning Management System (LMS) built with Django that simplifies assignment management for educational institutions.

## 🎯 Features

### For Students
- **Dashboard** - View all enrolled courses at a glance
- **Assignment Management** - Submit assignments and track deadlines
- **Calendar View** - Interactive calendar showing all assignment due dates
- **Discussion Forums** - Engage in course discussions
- **Quiz System** - Take quizzes and view results
- **Attendance Tracking** - Monitor your attendance records
- **Profile Management** - Update profile and change password

### For Faculty
- **Course Management** - Create and manage multiple courses
- **Assignment Creation** - Create assignments with deadlines and file uploads
- **Submission Tracking** - View and grade student submissions
- **Calendar View** - Manage all assignment deadlines across courses
- **Announcements** - Post course announcements with rich text editor
- **Discussion Moderation** - Moderate course discussions
- **Quiz Management** - Create and manage quizzes
- **Attendance Management** - Mark and track student attendance
- **Analytics** - View submission statistics and student progress

### For Administrators
- **User Management** - Manage students and faculty accounts
- **Department Management** - Organize courses by departments
- **Course Administration** - Oversee all courses and enrollments
- **System Settings** - Configure application settings

## 🎨 Design

AssignEase features a modern, responsive design with:
- Clean and intuitive user interface
- Custom color scheme (Teal, Gold, Dark Blue)
- Smooth animations and transitions
- Mobile-responsive layout
- Interactive calendar with color-coded events
- Rich text editor for announcements and content

## 🛠️ Tech Stack

- **Backend**: Django 4.0.4
- **Frontend**: HTML5, CSS3, JavaScript, Bootstrap 5
- **Database**: SQLite (development) / PostgreSQL (production)
- **Calendar**: FullCalendar.js
- **Text Editor**: Froala Editor
- **File Handling**: Django File Storage

## 📋 Prerequisites

- Python 3.8 or higher
- pip (Python package manager)
- Virtual environment (recommended)

## 🚀 Installation

### Local Development

1. **Clone the repository**
   ```bash
   git clone https://github.com/TanyaKudaisya/AssignEase.git
   cd AssignEase
   ```

2. **Create a virtual environment**
   ```bash
   python -m venv venv
   ```

3. **Activate the virtual environment**
   - Windows:
     ```bash
     venv\Scripts\activate
     ```
   - macOS/Linux:
     ```bash
     source venv/bin/activate
     ```

4. **Install dependencies**
   ```bash
   pip install -r requirements.txt
   ```

5. **Run migrations**
   ```bash
   python manage.py migrate
   ```

6. **Create a superuser (admin)**
   ```bash
   python manage.py createsuperuser
   ```

7. **Run the development server**
   ```bash
   python manage.py runserver
   ```

8. **Access the application**
   - Open your browser and go to: `http://127.0.0.1:8000/`
   - Admin panel: `http://127.0.0.1:8000/admin/`

### Deploy to Render

1. **Fork or clone this repository**

2. **Create a new Web Service on Render**
   - Go to [Render Dashboard](https://dashboard.render.com/)
   - Click "New +" and select "Web Service"
   - Connect your GitHub repository

3. **Configure the service**
   - **Name**: assignease (or your preferred name)
   - **Environment**: Python
   - **Build Command**: `./build.sh`
   - **Start Command**: `gunicorn assignease.wsgi:application`

4. **Add Environment Variables** (in Render dashboard):
   - `SECRET_KEY`: Generate a secure key (use Django's `get_random_secret_key()`)
   - `DEBUG`: `False`
   - `DATABASE_URL`: Will be auto-filled if you create a PostgreSQL database
   - `RENDER_EXTERNAL_HOSTNAME`: Your Render app URL (e.g., `assignease.onrender.com`)

5. **Create a PostgreSQL Database** (optional but recommended):
   - In Render, create a new PostgreSQL database
   - Link it to your web service
   - The `DATABASE_URL` will be automatically set

6. **Deploy**
   - Click "Create Web Service"
   - Render will automatically deploy your app
   - First deployment takes 5-10 minutes

Your app will be live at: `https://your-app-name.onrender.com`

## 👥 Default Login

After setting up, you can create users through the admin panel or use guest accounts:

- **Guest Student**: Click "Sign in as Guest" → "Student"
- **Guest Faculty**: Click "Sign in as Guest" → "Teacher"
- **Admin**: Use the superuser credentials you created

## 📁 Project Structure

```
AssignEase/
├── assignease/          # Main Django project settings
│   ├── settings.py
│   ├── urls.py
│   └── wsgi.py
├── main/                # Core app (courses, assignments, users)
├── discussion/          # Discussion forum app
├── attendance/          # Attendance tracking app
├── quiz/                # Quiz management app
├── static/              # Static files (CSS, JS, images)
├── templates/           # HTML templates
├── media/               # User uploaded files
├── manage.py
└── requirements.txt
```

## 🎓 Usage

### For Students

1. **Login** with your student credentials
2. **Enroll in courses** using the course access key
3. **View assignments** from the course dashboard
4. **Submit assignments** before the deadline
5. **Check the calendar** to track all due dates
6. **Participate in discussions** with classmates and instructors

### For Faculty

1. **Login** with your faculty credentials
2. **Create courses** and generate access keys
3. **Post announcements** to keep students informed
4. **Create assignments** with deadlines and descriptions
5. **Grade submissions** and provide feedback
6. **Monitor the calendar** to manage all deadlines
7. **Track attendance** and student participation

### For Administrators

1. **Login** to the admin panel
2. **Create departments** to organize courses
3. **Add users** (students and faculty)
4. **Manage courses** and enrollments
5. **Monitor system** activity and usage

## 🎨 Color Scheme

- **Primary Dark**: `#051622`
- **Primary Teal**: `#2ebdb4`
- **Primary Gold**: `#f1d79b`
- **Dark Blue Alt**: `#062f4e`

## 📱 Browser Support

- Chrome/Edge (latest)
- Firefox (latest)
- Safari (latest)
- Mobile browsers

## 🔒 Security

- CSRF protection enabled
- Password hashing with Django's authentication system
- File upload validation
- Session-based authentication
- XSS protection

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License - see the [LICENCE](LICENCE) file for details.

## 👤 Author

**Tanya Kudaisya**

- GitHub: [@TanyaKudaisya](https://github.com/TanyaKudaisya)
- Repository: [AssignEase](https://github.com/TanyaKudaisya/AssignEase)

## 🙏 Acknowledgments

- Django community for the excellent framework
- Bootstrap for the responsive UI components
- FullCalendar.js for the interactive calendar feature
- All contributors and users of AssignEase

## 📧 Support

For support, please open an issue in the GitHub repository or contact the maintainer.

## 🔄 Updates

Check the [releases page](https://github.com/TanyaKudaisya/AssignEase/releases) for the latest updates and features.

---

**Made with ❤️ for education**
