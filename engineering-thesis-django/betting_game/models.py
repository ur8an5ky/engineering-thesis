from django.db import models
from django.utils import timezone
from django.conf import settings


class FootballTeams(models.Model):
    class FootballTeamsObjects(models.Manager):
        def get_queryset(self):
            return super().get_queryset()

    id_team = models.AutoField(primary_key=True)
    name = models.CharField(max_length=25)
    country = models.CharField(max_length=25)
    city = models.CharField(max_length=25)
    group = models.CharField(max_length=1, choices=[('A', 'Group A'), ('B', 'Group B'), ('C', 'Group C'), ('D', 'Group D'), ('E', 'Group E'), ('F', 'Group F'), ('G', 'Group G'), ('H', 'Group H')])
    objects = models.Manager()
    ftobjects = FootballTeamsObjects()

    def __str__(self):
        return self.name
    
class FootballMatches(models.Model):

    class FootballMatchesObjects(models.Manager):
        def get_queryset(self):
            return super().get_queryset()

    id_match = models.AutoField(primary_key=True)
    id_hosts = models.ForeignKey(FootballTeams, on_delete=models.CASCADE, related_name='hosted_matches')
    score_hosts = models.PositiveIntegerField()
    id_visitors = models.ForeignKey(FootballTeams, on_delete=models.CASCADE, related_name='visited_matches')
    score_visitors = models.PositiveIntegerField()
    phase = models.CharField(max_length=13)
    start = models.DateTimeField()
    isPenalties = models.BooleanField(default=False)
    objects = models.Manager()
    fmobjects = FootballMatchesObjects()
    toVerifyPoints = models.BooleanField(default=False)

    def __str__(self):
        return f"{self.id_hosts} vs {self.id_visitors} - {self.start}"

class Penalties(models.Model):
    id_match = models.ForeignKey(FootballMatches, on_delete=models.CASCADE)
    penalties_team1 = models.PositiveIntegerField()
    penalties_team2 = models.PositiveIntegerField()


class Guesses(models.Model):
    id = models.AutoField(primary_key=True)
    id_match = models.ForeignKey(FootballMatches, on_delete=models.CASCADE, related_name='match_guesses')
    guess_hosts_score = models.PositiveIntegerField()
    guess_visitors_score = models.PositiveIntegerField()
    points = models.PositiveIntegerField(default=0)
    user = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE, related_name='user_guesses')

    def __str__(self):
        return f"{self.user} guessed {self.guess_hosts_score} - {self.guess_visitors_score} for match {self.id_match}"
