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
# Ensure 'core.settings' is the correct path to your Django settings
ENV DJANGO_SETTINGS_MODULE=core.settings

# Run migrations and collect static files, if necessary
RUN python manage.py migrate
RUN python manage.py collectstatic --no-input

# Expose port 8000
EXPOSE 8000

# Set the entrypoint script as the entry point
ENTRYPOINT ["/app/entrypoint.sh"]