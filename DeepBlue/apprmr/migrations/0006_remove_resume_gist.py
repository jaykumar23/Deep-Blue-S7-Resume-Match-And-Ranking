# Generated by Django 3.1.6 on 2022-04-08 21:35

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('apprmr', '0005_auto_20220409_0258'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='resume',
            name='gist',
        ),
    ]
