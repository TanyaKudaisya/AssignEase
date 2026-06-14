"""
Management command to create initial admin user and sample data
Run with: python manage.py setup_admin
"""
from django.core.management.base import BaseCommand
from django.contrib.auth.models import User
from main.models import Department, Faculty, Student, Course
import os


class Command(BaseCommand):
    help = 'Creates initial admin user and optionally sample data'

    def add_arguments(self, parser):
        parser.add_argument(
            '--reset',
            action='store_true',
            help='Delete existing sample data and recreate with correct IDs',
        )

    def handle(self, *args, **kwargs):
        reset = kwargs.get('reset', False)
        
        # If reset flag is set, delete old sample data
        if reset:
            self.stdout.write(self.style.WARNING('🔄 Resetting sample data...'))
            Faculty.objects.filter(faculty_id__in=['FAC001', '1001']).delete()
            Student.objects.filter(student_id__in=['STU001', '2001']).delete()
            Course.objects.filter(code='CS101').delete()
            self.stdout.write(self.style.SUCCESS('✅ Old sample data deleted'))
        
        # Create superuser if it doesn't exist
        username = os.environ.get('ADMIN_USERNAME', 'admin')
        email = os.environ.get('ADMIN_EMAIL', 'admin@assignease.com')
        password = os.environ.get('ADMIN_PASSWORD', 'admin123')

        if not User.objects.filter(username=username).exists():
            User.objects.create_superuser(
                username=username,
                email=email,
                password=password
            )
            self.stdout.write(self.style.SUCCESS(
                f'✅ Superuser created successfully!'
            ))
            self.stdout.write(self.style.SUCCESS(
                f'   Username: {username}'
            ))
            self.stdout.write(self.style.SUCCESS(
                f'   Password: {password}'
            ))
            self.stdout.write(self.style.WARNING(
                f'   ⚠️  Change this password in production!'
            ))
        else:
            self.stdout.write(self.style.SUCCESS(
                f'✅ Superuser "{username}" already exists'
            ))

        # Create a sample department if none exist
        if not Department.objects.exists():
            dept = Department.objects.create(
                department_id='CS',
                name='Computer Science'
            )
            self.stdout.write(self.style.SUCCESS(
                f'✅ Created sample department: {dept.name}'
            ))

            # Create a sample faculty with NUMERIC ID
            faculty = Faculty.objects.create(
                faculty_id='1001',
                name='Dr. John Smith',
                department=dept,
                email='faculty@example.com',
                password='faculty123'
            )
            self.stdout.write(self.style.SUCCESS(
                f'✅ Created sample faculty: {faculty.name}'
            ))
            self.stdout.write(self.style.SUCCESS(
                f'   Faculty ID: 1001, Password: faculty123'
            ))

            # Create a sample student with NUMERIC ID
            student = Student.objects.create(
                student_id='2001',
                name='Jane Doe',
                department=dept,
                email='student@example.com',
                password='student123'
            )
            self.stdout.write(self.style.SUCCESS(
                f'✅ Created sample student: {student.name}'
            ))
            self.stdout.write(self.style.SUCCESS(
                f'   Student ID: 2001, Password: student123'
            ))

            # Create a sample course
            course = Course.objects.create(
                code='CS101',
                name='Introduction to Computer Science',
                department=dept,
                faculty=faculty,
                studentKey=1234,
                facultyKey=5678
            )
            course.student.add(student)
            self.stdout.write(self.style.SUCCESS(
                f'✅ Created sample course: {course.name}'
            ))
            self.stdout.write(self.style.SUCCESS(
                f'   Course Code: CS101, Student Key: 1234'
            ))

            self.stdout.write(self.style.SUCCESS(
                '\n🎉 Setup complete! You can now:'
            ))
            self.stdout.write(self.style.SUCCESS(
                f'   1. Login to admin panel: /admin'
            ))
            self.stdout.write(self.style.SUCCESS(
                f'   2. Login as faculty: 1001 / faculty123'
            ))
            self.stdout.write(self.style.SUCCESS(
                f'   3. Login as student: 2001 / student123'
            ))
        else:
            self.stdout.write(self.style.SUCCESS(
                '✅ Database already has data'
            ))
