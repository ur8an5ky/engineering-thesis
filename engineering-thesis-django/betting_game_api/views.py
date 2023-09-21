from rest_framework import generics
from rest_framework.response import Response
from rest_framework.views import APIView
from betting_game.models import FootballMatches, FootballTeams, Penalties
from django.db.models import Q
from .serializers import TeamsSerializer, MatchesSerializer


class FootballTeamsList(generics.ListCreateAPIView):
    queryset = FootballTeams.ftobjects.all()
    serializer_class = TeamsSerializer


class FootballTeamsDetail(generics.RetrieveDestroyAPIView):
    serializer_class = TeamsSerializer

    def get_queryset(self):
        return FootballTeams.objects.all()

    def retrieve(self, request, *args, **kwargs):
        instance = self.get_object()
        matches = FootballMatches.objects.filter(Q(id_hosts=instance) | Q(id_visitors=instance)).order_by('id_match')

        team_serializer = self.get_serializer(instance)
        matches_serializer = MatchesSerializer(matches, many=True)

        return Response({
            'team': team_serializer.data,
            'matches': matches_serializer.data
        })


class FootballMatchesList(generics.ListCreateAPIView):
    queryset = FootballMatches.fmobjects.all()
    serializer_class = MatchesSerializer


class FootballMatchesDetail(generics.RetrieveDestroyAPIView):
    queryset = FootballMatches.objects.all()
    serializer_class = MatchesSerializer

class Group(APIView):
    def get(self, request, group, format=None):
        teams = FootballTeams.objects.filter(group=group.upper())
        matches = FootballMatches.objects.filter(phase='group', id_hosts__group=group.upper())

        teams_serializer = TeamsSerializer(teams, many=True)
        matches_serializer = MatchesSerializer(matches, many=True)

        return Response({
            'teams': teams_serializer.data,
            'matches': matches_serializer.data
        })
    
class Country(APIView):
    def get(self, request, country, format=None):
        teams = FootballTeams.objects.filter(country=country.capitalize())
        serializer = TeamsSerializer(teams, many=True)
        return Response(serializer.data)

""" Concrete View Classes
#CreateAPIView
Used for create-only endpoints.
#ListAPIView
Used for read-only endpoints to represent a collection of model instances.
#RetrieveAPIView
Used for read-only endpoints to represent a single model instance.
#DestroyAPIView
Used for delete-only endpoints for a single model instance.
#UpdateAPIView
Used for update-only endpoints for a single model instance.
##ListCreateAPIView
Used for read-write endpoints to represent a collection of model instances.
RetrieveUpdateAPIView
Used for read or update endpoints to represent a single model instance.
#RetrieveDestroyAPIView
Used for read or delete endpoints to represent a single model instance.
#RetrieveUpdateDestroyAPIView
Used for read-write-delete endpoints to represent a single model instance.
"""