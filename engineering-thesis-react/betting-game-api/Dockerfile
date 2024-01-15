# Etap 1: Zbuduj aplikację

# Użyj oficjalnego obrazu Node.js jako obrazu bazowego
FROM node:21.4.0 as build

# Ustaw katalog roboczy w kontenerze
WORKDIR /app

# Skopiuj pliki package.json i yarn.lock (lub tylko package.json, jeśli nie używasz yarn.lock)
COPY package.json yarn.lock /app/

# Zainstaluj zależności
RUN yarn install

# Skopiuj pozostałe pliki projektu do katalogu roboczego
COPY . /app/

# Zbuduj aplikację
RUN yarn build

# Etap 2: Uruchom aplikację

# Etap 2: Uruchom aplikację
FROM nginx:alpine

# Tworzenie niestandardowego pliku konfiguracyjnego Nginx
RUN echo "server {\n\
    listen 80;\n\
    server_name localhost;\n\
\n\
    # Przekierowanie dla Django API\n\
    location /api/ {\n\
        proxy_set_header Host \$http_host;\n\
        proxy_set_header X-Real-IP \$remote_addr;\n\
        proxy_set_header X-Forwarded-For \$proxy_add_x_forwarded_for;\n\
        proxy_set_header X-Forwarded-Proto \$scheme;\n\
        proxy_pass http://engineering-thesis-django:8000;\n\
    }\n\
\n\
    # Serwowanie statycznych plików React\n\
    location / {\n\
        root /usr/share/nginx/html;\n\
        try_files \$uri \$uri/ /index.html;\n\
    }\n\
}" > /etc/nginx/conf.d/default.conf

# Skopiuj zbudowane pliki z etapu 1
COPY --from=build /app/dist /usr/share/nginx/html

# Ustaw port na którym będzie działał serwer
EXPOSE 80

# Uruchom serwer Nginx
CMD ["nginx", "-g", "daemon off;"]