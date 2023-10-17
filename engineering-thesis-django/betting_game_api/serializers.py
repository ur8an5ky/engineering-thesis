from rest_framework import serializers
from betting_game.models import FootballTeams, FootballMatches, Penalties, Guesses


class TeamsSerializer(serializers.ModelSerializer):
    class Meta:
        model = FootballTeams
        fields = ('id_team', 'name', 'country', 'city', 'group')

class MatchesSerializer(serializers.ModelSerializer):
    hosts_name = serializers.SerializerMethodField()
    visitors_name = serializers.SerializerMethodField()
    match_group = serializers.SerializerMethodField()

    class Meta:
        model = FootballMatches
        fields = ('id_match', 'id_hosts', 'hosts_name', 'score_hosts', 
                  'id_visitors', 'visitors_name', 'score_visitors', 
                  'phase', 'start', 'match_group', 'isPenalties', 'toVerifyPoints')

    def get_hosts_name(self, obj):
        return obj.id_hosts.name

    def get_visitors_name(self, obj):
        return obj.id_visitors.name
    
    def get_match_group(self, obj):
        groups = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H']
        if obj.id_visitors.group in groups:
            return obj.id_visitors.group
        else:
            return 'None'

class GuessesSerializer(serializers.ModelSerializer):
    class Meta:
        model = Guesses
        fields = '__all__'

class MatchUpdateSerializer(serializers.ModelSerializer):
    class Meta:
        model = FootballMatches
        fields = ('id_match', 'score_hosts', 'score_visitors', 'toVerifyPoints')
