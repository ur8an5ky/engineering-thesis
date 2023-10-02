# Generated by Django 4.2.4 on 2023-10-02 16:46

from django.conf import settings
from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
        ('betting_game', '0001_initial'),
    ]

    operations = [
        migrations.AddField(
            model_name='guesses',
            name='user',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='user_guesses', to=settings.AUTH_USER_MODEL),
        ),
        migrations.AddField(
            model_name='footballmatches',
            name='id_hosts',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='hosted_matches', to='betting_game.footballteams'),
        ),
        migrations.AddField(
            model_name='footballmatches',
            name='id_visitors',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='visited_matches', to='betting_game.footballteams'),
        ),
    ]
