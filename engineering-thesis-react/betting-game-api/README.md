### `Dockerfile` explanation:
```Dockerfile
# Stage 1: Build the application

# Use the official Node.js image as the base image
FROM node:21.4.0 as build

# Set the working directory in the container
WORKDIR /app

# Copy package.json and yarn.lock files
COPY package.json yarn.lock /app/

# Install dependencies
RUN yarn install

# Copy the rest of the project files to the working directory
COPY . /app/

# Build the application
RUN yarn build

# Stage 2: Run the application

# Use Nginx alpine image for the runtime stage
FROM nginx:alpine

# Copy custom Nginx configuration file
COPY default.conf /etc/nginx/conf.d/default.conf

# Copy built files from stage 1
COPY --from=build /app/dist /usr/share/nginx/html

# Set the port that the server will run on
EXPOSE 80

# Start the Nginx server
CMD ["nginx", "-g", "daemon off;"]
```

This `Dockerfile` cannot be built and run independently.

### Custom `Nginx` configuration file `default.conf` explanation:
```nginx
server {
    # Listen on port 80 (default HTTP port)
    listen 80;
    # Set the server name
    server_name localhost;

    # Define behavior for the /api/ endpoint
    location /api/ {
        # Set headers for proxying requests to Django application
        proxy_set_header Host $http_host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;

        # Proxy pass to the Django app on specified internal URL
        proxy_pass http://engineering-thesis-django:8000;
    }

    # Define behavior for the root URL and other URLs not matched by previous location blocks
    location / {
        # Set the root directory where files are served from
        root /usr/share/nginx/html;
        # Define how to attempt to serve files: first as files, then as directories, then falling back to index.html
        try_files $uri $uri/ /index.html;
    }
}

```