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

# Kopiowanie niestandardowego pliku konfiguracyjnego Nginx
COPY default.conf /etc/nginx/conf.d/default.conf

# Skopiuj zbudowane pliki z etapu 1
COPY --from=build /app/dist /usr/share/nginx/html

# Ustaw port na którym będzie działał serwer
EXPOSE 80

# Uruchom serwer Nginx
CMD ["nginx", "-g", "daemon off;"]
