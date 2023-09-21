from django.test import TestCase
from django.utils import timezone
from .models import FootballTeams, FootballMatches

class TestFootballMatch(TestCase):
    def setUp(self):
        # Tworzymy dwie drużyny do testów
        self.team1 = FootballTeams.objects.create(name="Team1", country="Country1", city="City1", group="A")
        self.team2 = FootballTeams.objects.create(name="Team2", country="Country2", city="City2", group="B")

    def test_add_match(self):
        # Utworzenie nowego meczu
        match = FootballMatches.objects.create(
            id_hosts=self.team1,
            score_hosts=0,
            id_visitors=self.team2,
            score_visitors=0,
            phase="Phase",
            start=timezone.now(),
            isPenalties=False
        )

        # Sprawdzenie, czy mecz został dodany poprawnie
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
        # Utworzenie nowego meczu
        match = FootballMatches.objects.create(
            id_hosts=self.team1,
            score_hosts=0,
            id_visitors=self.team2,
            score_visitors=0,
            phase="Phase",
            start=timezone.now(),
            isPenalties=False
        )

        # Edycja wyniku meczu
        match.score_hosts = 3
        match.score_visitors = 2
        match.save()

        # Pobranie z bazy zaktualizowanego meczu
        updated_match = FootballMatches.objects.get(pk=match.pk)

        # Sprawdzenie, czy wynik został zaktualizowany poprawnie
        self.assertEqual(updated_match.score_hosts, 3)
        self.assertEqual(updated_match.score_visitors, 2)
        self.assertEqual(str(updated_match), f"{self.team1} vs {self.team2} - {updated_match.start}")
