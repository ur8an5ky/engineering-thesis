from rest_framework import serializers
from betting_game.models import FootballTeams, FootballMatches, Penalties, Guesses


class TeamsSerializer(serializers.ModelSerializer):
    class Meta:
        model = FootballTeams
        fields = ('id_team', 'name', 'country', 'city', 'group')

class MatchesSerializer(serializers.ModelSerializer):
    class Meta:
        model = FootballMatches
        fields = ('id_match', 'id_hosts', 'score_hosts', 'id_visitors', 'score_visitors', 'phase', 'start', 'isPenalties')

class GuessesSerializer(serializers.ModelSerializer):
    class Meta:
        model = Guesses
        fields = '__all__'