#!/bin/bash

if [ "$DJANGO_ENV" = "development" ]; then
  echo "Starting Django development server..."
  python manage.py runserver 0.0.0.0:8000
elif [ "$DJANGO_ENV" = "production" ]; then
  echo "Starting Gunicorn production server..."
  gunicorn --bind 0.0.0.0:8000 core.wsgi:application
else
  echo "Starting Gunicorn..."
  gunicorn --bind 0.0.0.0:8000 core.wsgi:application
fi
