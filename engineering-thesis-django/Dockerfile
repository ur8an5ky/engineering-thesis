FROM python:3.10.12

WORKDIR /app

COPY requirements.txt /app/

RUN pip install --no-cache-dir -r requirements.txt

COPY . /app/

COPY entrypoint.sh /app/

RUN chmod +x /app/entrypoint.sh

ENV DJANGO_SETTINGS_MODULE=core.settings

RUN python manage.py migrate
RUN python manage.py collectstatic --no-input

EXPOSE 8000

ENTRYPOINT ["/app/entrypoint.sh"]