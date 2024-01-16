### `Dockerfile` explanation:
```Dockerfile
# Use the official Python image with the desired version
FROM python:3.10.12

# Set the working directory in the container
WORKDIR /app

# Copy the requirements.txt file into the working directory
COPY requirements.txt /app/

# Install dependencies
RUN pip install --no-cache-dir -r requirements.txt

# Copy the rest of the project files into the working directory
COPY . /app/

# Copy the entrypoint.sh script into the container
COPY entrypoint.sh /app/

# Give execution rights to the entrypoint script
RUN chmod +x /app/entrypoint.sh

# Set environment variable for Django settings for production
ENV DJANGO_SETTINGS_MODULE=core.settings

# Run migrations and collect static files
RUN python manage.py migrate
RUN python manage.py collectstatic --no-input

# Expose port 8000
EXPOSE 8000

# Set the entrypoint script as the entry point
ENTRYPOINT ["/app/entrypoint.sh"]
```

### `entrypoint.sh` file explanation:
This is a simple `bash` script that runs the `Gunicorn` server by default, but is also adapted to run the `Django development server`.

Thanks to that, this `Dockerfile` can be built and run on its own with commands:
#### Build:
```bash
docker build -t engineering-thesis-django .
```
#### Run with Gunicorn:
```bash
docker run -it -p 8000:8000 engineering-thesis-django
```
or
```bash
docker run -it -e DJANGO_ENV=production -p 8000:8000 enginering-thesis-django
```
#### Run with Django development server:
```bash
docker run -it -e DJANGO_ENV=development -p 8000:8000 enginering-thesis-django
```