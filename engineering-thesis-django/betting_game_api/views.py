from rest_framework import generics, status
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework_simplejwt.authentication import JWTAuthentication
from rest_framework.permissions import BasePermission, IsAdminUser, IsAuthenticated, AllowAny, BasePermission, SAFE_METHODS
from rest_framework.decorators import api_view, permission_classes
from betting_game.models import FootballMatches, FootballTeams, Penalties, Guesses
from django.db.models import Q
from .serializers import TeamsSerializer, MatchesSerializer, GuessesSerializer, MatchUpdateSerializer

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
    authentication_classes = [JWTAuthentication] 
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
    
class MatchUpdateView(generics.UpdateAPIView):
    permission_classes = [IsAdminUser]
    queryset = FootballMatches.objects.all()
    serializer_class = MatchUpdateSerializer

@api_view(['POST'])
def add_guess(request):
    user = request.user
    id_match = request.data.get('id_match')
    guess_hosts_score = request.data.get('guess_hosts_score')
    guess_visitors_score = request.data.get('guess_visitors_score')
    
    match = FootballMatches.objects.get(id_match=id_match)

    guess = Guesses(user=user, id_match=match, guess_hosts_score=guess_hosts_score, guess_visitors_score=guess_visitors_score)
    guess.save()
    
    return Response({"message": "Guess added successfully!"}, status=status.HTTP_201_CREATED)

@api_view(['PUT'])
def update_guess(request, match_id):
    user = request.user
    guess_hosts_score = request.data.get('guess_hosts_score')
    guess_visitors_score = request.data.get('guess_visitors_score')
    
    try:
        guess = Guesses.objects.get(user=user, id_match=match_id)
        guess.guess_hosts_score = guess_hosts_score
        guess.guess_visitors_score = guess_visitors_score
        guess.save()
        return Response({"message": "Guess updated successfully!"}, status=status.HTTP_200_OK)
    except Guesses.DoesNotExist:
        return Response({"error": "Guess not found!"}, status=status.HTTP_404_NOT_FOUND)

@api_view(['PUT'])
@permission_classes([IsAdminUser])
def update_match(request, match_id):
    try:
        match = FootballMatches.objects.get(id_match=match_id)
        
        # Updating the match based on incoming data
        match.score_hosts = request.data.get('score_hosts')
        match.score_visitors = request.data.get('score_visitors')
        match.save()
        
        return Response({"message": "Match updated successfully!"}, status=status.HTTP_200_OK)
    except FootballMatches.DoesNotExist:
        return Response({"error": "Match not found!"}, status=status.HTTP_404_NOT_FOUND)


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