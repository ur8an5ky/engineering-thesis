from django.urls import path
from .views import FootballTeamsList, FootballTeamsDetail, FootballMatchesList, FootballMatchesDetail, Group, Country

app_name = 'betting_game_api'

urlpatterns = [
    path('team/<int:pk>/', FootballTeamsDetail.as_view(), name='team'),
    path('teams/', FootballTeamsList.as_view(), name='teams'),
    path('match/<int:pk>/', FootballMatchesDetail.as_view(), name='match'),
    path('matches/', FootballMatchesList.as_view(), name='matches'),
    path('group/<str:group>/', Group.as_view(), name='group'),
    path('country/<str:country>/', Country.as_view(), name='country'),
]