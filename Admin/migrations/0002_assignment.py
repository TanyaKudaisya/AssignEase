# Generated by Django 3.2.1 on 2021-06-02 06:20

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('Admin', '0001_initial'),
    ]

    operations = [
        migrations.CreateModel(
            name='Assignment',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('Subject_Name', models.CharField(max_length=200)),
                ('Assignment_Title', models.CharField(max_length=200)),
                ('Assignment_Description', models.CharField(max_length=200)),
                ('Assignment_File', models.CharField(max_length=200)),
                ('Due_Date', models.CharField(max_length=200)),
            ],
        ),
    ]
