from django.db import models
from django.contrib.auth.models import User
from django.utils import timezone


class FootballTeams(models.Model):
    id_team = models.AutoField(primary_key=True)
    name = models.CharField(max_length=25)
    country = models.CharField(max_length=25)
    city = models.CharField(max_length=25)
    group = models.CharField(max_length=1, choices=[('A', 'Group A'), ('B', 'Group B'), ('C', 'Group C'), ('D', 'Group D'), ('E', 'Group E'), ('F', 'Group F'), ('G', 'Group G'), ('H', 'Group H')])

    def __str__(self):
        return self.name
    
class FootballMatches(models.Model):
    id_match = models.AutoField(primary_key=True)
    id_hosts = models.ForeignKey(FootballTeams, on_delete=models.CASCADE, related_name='hosted_matches')
    score_hosts = models.PositiveIntegerField()
    id_visitors = models.ForeignKey(FootballTeams, on_delete=models.CASCADE, related_name='visited_matches')
    score_visitors = models.PositiveIntegerField()
    phase = models.CharField(max_length=13)
    start = models.DateTimeField()
    isPenalties = models.BooleanField(default=False)

    def __str__(self):
        return f"{self.id_hosts} vs {self.id_visitors} - {self.start}"

class Penalties(models.Model):
    id_match = models.ForeignKey(FootballMatches, on_delete=models.CASCADE)
    penalties_team1 = models.PositiveIntegerField()
    penalties_team2 = models.PositiveIntegerField()

    def __str__(self):
        return f"Penalties for Match {self.id_match}"
    