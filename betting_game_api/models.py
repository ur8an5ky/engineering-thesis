from django.db import models
from django.contrib.auth.models import User
from django.utils import timezone


class Teams(models.Model):
    id_team = models.AutoField(primary_key=True)
    name = models.CharField(max_length=25)
    country = models.CharField(max_length=25)
    city = models.CharField(max_length=25)
    group = models.CharField(max_length=1)

    def __str__(self):
        return self.name
    
class FootballMatches(models.Model):
    id_match = models.AutoField(primary_key=True)
    id_hosts = models.ForeignKey(Teams, on_delete=models.CASCADE, related_name='hosted_matches')
    score_hosts = models.PositiveIntegerField()
    id_visitors = models.ForeignKey(Teams, on_delete=models.CASCADE, related_name='visited_matches')
    score_visitors = models.PositiveIntegerField()
    phase = models.CharField(max_length=13)
    start = models.DateTimeField()
    penalties = models.CharField(max_length=255, blank=True, null=True)

    def __str__(self):
        return f"{self.id_hosts} vs {self.id_visitors} - {self.start}"
