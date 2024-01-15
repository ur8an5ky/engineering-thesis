# Użyj oficjalnego obrazu Pythona w odpowiedniej wersji
FROM python:3.10.12

# Ustaw katalog roboczy w kontenerze
WORKDIR /app

# Skopiuj plik requirements.txt do katalogu roboczego
COPY requirements.txt /app/

# Zainstaluj zależności
RUN pip install --no-cache-dir -r requirements.txt

# Skopiuj pozostałe pliki projektu do katalogu roboczego
COPY . /app/

# Ustaw zmienną środowiskową wskazującą na ustawienia Django dla środowiska produkcyjnego
# Upewnij się, że 'core.settings' jest poprawną ścieżką do twoich ustawień Django
ENV DJANGO_SETTINGS_MODULE=core.settings

# Uruchom migracje i zbierz statyczne pliki, jeśli to konieczne
RUN python manage.py migrate
RUN python manage.py collectstatic --no-input

# Udostępnij port 8000
EXPOSE 8000

# Utwórz skrypt uruchomieniowy jako entrypoint.sh
RUN echo '#!/bin/bash\n\
if [ "$DJANGO_ENV" = "development" ]; then\n\
  echo "Starting Django development server..."\n\
  python manage.py runserver 0.0.0.0:8000\n\
elif [ "$DJANGO_ENV" = "production" ]; then\n\
  echo "Starting Gunicorn production server..."\n\
  gunicorn --bind 0.0.0.0:8000 core.wsgi:application\n\
else\n\
  echo "Starting Gunicorn..."\n\
  gunicorn --bind 0.0.0.0:8000 core.wsgi:application\n\
fi' > /app/entrypoint.sh

# Nadaj prawa do wykonania skryptu
RUN chmod +x /app/entrypoint.sh

# Ustaw skrypt uruchomieniowy jako punkt wejścia
ENTRYPOINT ["/app/entrypoint.sh"]
