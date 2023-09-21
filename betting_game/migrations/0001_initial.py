# Generated by Django 4.2.4 on 2023-09-19 12:48

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='FootballTeams',
            fields=[
                ('id_team', models.AutoField(primary_key=True, serialize=False)),
                ('name', models.CharField(max_length=25)),
                ('country', models.CharField(max_length=25)),
                ('city', models.CharField(max_length=25)),
                ('group', models.CharField(choices=[('A', 'Group A'), ('B', 'Group B'), ('C', 'Group C'), ('D', 'Group D'), ('E', 'Group E'), ('F', 'Group F'), ('G', 'Group G'), ('H', 'Group H')], max_length=1)),
            ],
        ),

    ]
