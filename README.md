### Prepared by : Dilendra Vikram Shahi

# Okicom base project

It is a base project for $\textcolor{blue}{\text{OKICOM}}$ with default $\textcolor{red}{\text{Laravel}}$ as backend (with $\textcolor{green}{\text{default laravel authentication}}$ and $\textcolor{green}{\text{AWS Cognito authentication}}$ options) and $\textcolor{red}{\text{VueJS}}$ as frontend. It has in built $\textcolor{red}{\text{registration}}$, $\textcolor{red}{\text{login}}$ and $\textcolor{red}{\text{reset password}}$ feature.

# Installation Guide

For installation follow the following guide:

1. Clone the project

```
git clone https://github.com/dshahi468/okicombaseproject.git
```

2. Run the docker composer command

```
docker run --rm \
 -v "./backend:/var/www/html" \
 -w /var/www/html \
 laravelsail/php83-composer \
 composer install --ignore-platform-reqs
```

3. Build the docker container

```
docker compose up -d
docker exec -it laravelAuthentication bash
yarn install
yarn dev
```

4. Access your resources as below:

- [Laravel Backend Application](http://localhost:8000)
- [VueJS Frontend Application](http://localhost:8081)
- [PostGreSQL Admin](http://localhost:8087)
