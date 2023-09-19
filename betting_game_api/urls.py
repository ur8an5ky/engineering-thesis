from django.urls import path
from .views import FootballTeamsList, FootballTeamsDetail

app_name = 'betting_game_api'

urlpatterns = [
    path('<int:pk>/', FootballTeamsDetail.as_view(), name='detailcreate'),
    path('', FootballTeamsList.as_view(), name='listcreate'),
]