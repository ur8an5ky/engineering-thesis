from rest_framework import generics
from betting_game.models import FootballMatches, FootballTeams, Penalties
from .serializers import TeamsSerializer


class FootballTeamsList(generics.ListCreateAPIView):
    queryset = FootballTeams.ftobjects.all()
    serializer_class = TeamsSerializer


class FootballTeamsDetail(generics.RetrieveDestroyAPIView):
    queryset = FootballTeams.objects.all()
    serializer_class = TeamsSerializer


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