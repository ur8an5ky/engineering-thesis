from django.urls import path
from django.views.generic import TemplateView

app_name = 'betting_game'

urlpatterns = [
    path('', TemplateView.as_view(template_name="betting_game/index.html")),
]