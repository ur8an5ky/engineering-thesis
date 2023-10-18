from django.urls import path
from .views import (FootballTeamsList, FootballTeamsDetail, FootballMatchesList, FootballMatchesDetail, 
                    Group, Country, GuessesList, MatchUpdateView, CountriesView, add_guess, update_guess, update_match)

app_name = 'betting_game_api'

urlpatterns = [
    path('team/<int:pk>/', FootballTeamsDetail.as_view(), name='team'),
    path('teams/', FootballTeamsList.as_view(), name='teams'),
    path('match/<int:pk>/', FootballMatchesDetail.as_view(), name='match'),
    path('matches/', FootballMatchesList.as_view(), name='matches'),
    path('group/<str:group>/', Group.as_view(), name='group'),
    path('country/<str:country>/', Country.as_view(), name='country'),
    path('my-guesses/', GuessesList.as_view(), name='my-guesses'),
    path('add-guess/', add_guess, name='add-guess'),
    path('update-guess/<int:match_id>/', update_guess, name='update-guess'),
    path('update-match/<int:match_id>/', update_match, name='update-match'),
    path('countries/', CountriesView.as_view(), name='countries'),
]