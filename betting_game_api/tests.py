from django.test import TestCase
from django.urls import reverse
from rest_framework import status
from rest_framework.test import APIClient
from betting_game.models import FootballTeams, FootballMatches

class FootballTeamsDetailTests(TestCase):
    def setUp(self):
        self.team = FootballTeams.objects.create(
            name='Example Team',
            country='Example',
            city='Example City',
            group='A'
        )
        self.match = FootballMatches.objects.create(
            id_hosts=self.team,
            score_hosts=0,
            id_visitors=self.team,
            score_visitors=0,
            phase='Phase',
            start='2023-09-21T12:00Z',
            isPenalties=False
        )

    def test_retrieve_team_and_matches(self):
        url = reverse('betting_game_api:team', kwargs={'pk': self.team.id_team})
        client = APIClient()
        response = client.get(url)

        self.assertEqual(response.status_code, status.HTTP_200_OK)

        team = response.data['team']
        matches = response.data['matches']

        self.assertEqual(team['name'], 'Example Team')
        self.assertEqual(len(matches), 1)
        self.assertEqual(matches[0]['id_match'], self.match.id_match)


class GroupTests(TestCase):
    def setUp(self):
        self.team = FootballTeams.objects.create(
            name='Example Team',
            country='Example',
            city='Example City',
            group='A'
        )
        self.match = FootballMatches.objects.create(
            id_hosts=self.team,
            score_hosts=0,
            id_visitors=self.team,
            score_visitors=0,
            phase='group',
            start='2023-09-21T12:00Z',
            isPenalties=False
        )

    def test_group_view(self):
        url = reverse('betting_game_api:group', kwargs={'group': self.team.group.lower()})
        client = APIClient()
        response = client.get(url)

        self.assertEqual(response.status_code, 200)

        teams = response.data['teams']
        matches = response.data['matches']

        self.assertEqual(len(teams), 1)
        self.assertEqual(len(matches), 1)

class CountryTests(TestCase):
    def setUp(self):
        self.team = FootballTeams.objects.create(
            name='Example Team',
            country='Example',
            city='Example City',
            group='A'
        )

    def test_country_view(self):
        url = reverse('betting_game_api:country', kwargs={'country': self.team.country.lower()})
        client = APIClient()
        response = client.get(url)

        self.assertEqual(response.status_code, 200)

        teams = response.data

        self.assertEqual(len(teams), 1)
        self.assertEqual(teams[0]['name'], 'Example Team')
