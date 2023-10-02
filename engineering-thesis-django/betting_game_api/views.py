from rest_framework import generics
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework.permissions import BasePermission, IsAdminUser, IsAuthenticated, AllowAny, BasePermission, SAFE_METHODS
from betting_game.models import FootballMatches, FootballTeams, Penalties, Guesses
from django.db.models import Q
from .serializers import TeamsSerializer, MatchesSerializer, GuessesSerializer

class IsAdminOrReadOnly(BasePermission):
    """
    The request is authenticated as an admin, or is a read-only request.
    """
    def has_permission(self, request, view):
        if request.method in SAFE_METHODS:
            return True
        return request.user and request.user.is_staff

class FootballTeamsList(generics.ListCreateAPIView):
    permission_classes = [AllowAny]
    queryset = FootballTeams.ftobjects.all()
    serializer_class = TeamsSerializer
    http_method_names = ['get']

class FootballTeamsDetail(generics.RetrieveDestroyAPIView):
    permission_classes = [AllowAny]
    serializer_class = TeamsSerializer
    http_method_names = ['get']

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
    permission_classes = [IsAdminOrReadOnly]
    queryset = FootballMatches.fmobjects.all()
    serializer_class = MatchesSerializer

class FootballMatchesDetail(generics.RetrieveUpdateDestroyAPIView):
    permission_classes = [IsAdminOrReadOnly]
    queryset = FootballMatches.objects.all()
    serializer_class = MatchesSerializer



class Group(APIView):
    permission_classes = [AllowAny]
    http_method_names = ['get']

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
    permission_classes = [AllowAny]
    http_method_names = ['get']

    def get(self, request, country, format=None):
        teams = FootballTeams.objects.filter(country=country.capitalize())
        serializer = TeamsSerializer(teams, many=True)
        return Response(serializer.data)
    
class GuessesList(APIView):
    permission_classes = [IsAuthenticated]
    http_method_names = ['get']

    def get(self, request, format=None):
        user_guesses = Guesses.objects.filter(user=request.user)
        guesses_serializer = GuessesSerializer(user_guesses, many=True)

        all_matches = FootballMatches.objects.all()
        matches_serializer = MatchesSerializer(all_matches, many=True)

        all_teams = FootballTeams.objects.all()
        teams_serializer = TeamsSerializer(all_teams, many=True)

        return Response({
            'my_guesses': guesses_serializer.data,
            'matches': matches_serializer.data,
            'teams': teams_serializer.data
        })



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