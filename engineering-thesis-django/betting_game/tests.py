from django.test import TestCase
from django.utils import timezone
from django.contrib.auth.models import User
from .models import FootballTeams, FootballMatches, Guesses

class TestFootballMatch(TestCase):
    def setUp(self):
        self.team1 = FootballTeams.objects.create(name="Team1", country="Country1", city="City1", group="A")
        self.team2 = FootballTeams.objects.create(name="Team2", country="Country2", city="City2", group="B")

    def test_add_match(self):
        match = FootballMatches.objects.create(
            id_hosts=self.team1,
            score_hosts=0,
            id_visitors=self.team2,
            score_visitors=0,
            phase="Phase",
            start=timezone.now(),
            isPenalties=False
        )

        self.assertEqual(FootballMatches.objects.count(), 1)
        self.assertEqual(match.id_hosts, self.team1)
        self.assertEqual(match.score_hosts, 0)
        self.assertEqual(match.id_visitors, self.team2)
        self.assertEqual(match.score_visitors, 0)
        self.assertEqual(match.phase, "Phase")
        self.assertIsNotNone(match.start)
        self.assertFalse(match.isPenalties)
        self.assertEqual(str(match), f"{self.team1} vs {self.team2} - {match.start}")

    def test_edit_match_score(self):
        match = FootballMatches.objects.create(
            id_hosts=self.team1,
            score_hosts=0,
            id_visitors=self.team2,
            score_visitors=0,
            phase="Phase",
            start=timezone.now(),
            isPenalties=False
        )

        match.score_hosts = 3
        match.score_visitors = 2
        match.save()

        updated_match = FootballMatches.objects.get(pk=match.pk)

        self.assertEqual(updated_match.score_hosts, 3)
        self.assertEqual(updated_match.score_visitors, 2)
        self.assertEqual(str(updated_match), f"{self.team1} vs {self.team2} - {updated_match.start}")

class TestGuessesModel(TestCase):
    def setUp(self):
        self.team1 = FootballTeams.objects.create(name="Team1", country="Country1", city="City1", group="A")
        self.team2 = FootballTeams.objects.create(name="Team2", country="Country2", city="City2", group="B")
        self.match = FootballMatches.objects.create(
            id_hosts=self.team1,
            score_hosts=0,
            id_visitors=self.team2,
            score_visitors=0,
            phase="Phase",
            start=timezone.now(),
            isPenalties=False
        )
        self.user = User.objects.create_user(username='testuser', password='12345')
        self.guess = Guesses.objects.create(
            id_match=self.match,
            guess_hosts_score=1,
            guess_visitors_score=2,
            user=self.user
        )

    def test_guess_str(self):
        self.assertEqual(
            str(self.guess),
            f"{self.user} guessed {self.guess.guess_hosts_score} - {self.guess.guess_visitors_score} for match {self.match}"
        )
