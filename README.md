﻿# notesWorkshop

## Starting the project

First, you need to properly edit the .env file, enter your email and access code from yandex.smtp, or disable email confirmation by specifying 

`` 
USE_EMAIL_CHECK = 0
``

If you don't use email confirmation, you'll have to go into the database and get the code yourself

### Run docker-compose

#### To start dev mode use 

``` bash 
docker-compose --profile dev up -d
```
After starting containers use script for migrate database

``` bash 
docker-compose exec backend_dev sh -c "sh /usr/src/app/run-migrations.sh"
```

#### To start prod mode use 

``` bash 
docker-compose --profile prod up -d
```
After starting containers use script for migrate database

``` bash 
docker-compose exec backend_prod sh -c "sh /usr/src/app/run-migrations.sh"
```


## Usage

Goto http://localhost:3000
