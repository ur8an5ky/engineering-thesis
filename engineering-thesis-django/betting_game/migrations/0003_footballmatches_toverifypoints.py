# Generated by Django 4.2.4 on 2023-10-11 14:44

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('betting_game', '0002_initial'),
    ]

    operations = [
        migrations.AddField(
            model_name='footballmatches',
            name='toVerifyPoints',
            field=models.BooleanField(default=False),
        ),
    ]
