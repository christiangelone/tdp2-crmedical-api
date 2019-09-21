# CRMedical API

## Prerequirements
 * Docker CE
 * Docker compose 

## Start the local environment
```
~$ docker-compose-up
```
* The API will be listening on `localhost` port `3333`
* The DB will be listening on `localhost` port `5432`

## Create database
Enter inside db container and execute psql
```
~$ docker exec -it tdp2-crmedical-api_db_1 psql -U postgres
```
```
postgres# CREATE DATABASE myhealthapp;
```

Note: After creating the database restart the local environment

## Deploy to heroku
```
~$ heroku login
```
```
~$ git push heroku master
```

