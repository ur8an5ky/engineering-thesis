from rest_framework import serializers
from betting_game.models import FootballTeams


class TeamsSerializer(serializers.ModelSerializer):
    class Meta:
        model = FootballTeams
        fields = ('id_team', 'name', 'country', 'city', 'group')