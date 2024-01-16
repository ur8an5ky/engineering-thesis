# App for engineering thesis entitled:
# *Implementation of the production service of a web application developed in Django technology*

## Download
```bash
git clone https://github.com/ur8an5ky/engineering-thesis.git
```

## Run with Gunicorn and Nginx:
```bash
docker compose up
```

Once the application is correctly launched using `Gunicorn` and `Nginx`, it is available on: [localhost:8080](localhost:8080)

### `docker-compose.yml` file explanation:
```yaml
 # Specifies the version of the Docker Compose file format
version: '3.8' 

# Defines the services that make up your application
services:
    # Name of the first service
    django:
        # Path to the directory containing the Dockerfile for the Django app
        build: ./engineering-thesis-django
        volumes:
            # Mounts the project directory into the container at /app
            - ./engineering-thesis-django:/app
        ports:
            # Maps port 8000 of the container to port 8000 on the host
            - "8000:8000"
        # Names the container for easier reference
        container_name: engineering-thesis-django

    react:
        # Path to the directory containing the Dockerfile for the React app
        build: ./engineering-thesis-react/betting-game-api
        ports:
            # Maps port 80 of the container to port 8080 on the host
            - "8080:80"
        # Names the container for easier reference
        container_name: engineering-thesis-react
        # Specifies that this service depends on the django service
        depends_on:
            - django

```
`Dockerfile` and its explanation for `engineering-thesis-django` available in `engineering-thesis-django` directory.

Similarly, `Dockerfile` and its explanation for `engineering-thesis-react` available in `engineering-thesis-react/betting-game-api` directory.
