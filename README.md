# Spotifaïe - php projet page 6

The best music player ever.

## Description

This project is a web application that allows you to listen to music, create playlists.  
You can search music, artist, album or playlist.

## Installation

```bash
sudo apt-get update
sudo apt-get upgrade
sudo apt-get install apache2, php, php-pgsql, postgresql
```

## Database

```bash
sudo -u postgres psql
CREATE ROLE spotifaie_user WITH LOGIN PASSWORD 'your_password';
CREATE DATABASE spotifaie owner spotifai_user;
\q
```

## Setup the Project

```bash
cd /var/www/html
git clone https://github.com/ackimixs/spotifaie.git

fill the php/hidden.constants.php with your informations and rename it to constants.php
```

## FIll the database

```bash
psql -d spotifaie -U spotifaie_user -f sql/Creation.sql
psql -d spotifaie -U spotifaie_user -f sql/data_dump.sql
```

## Configuration

```bash
sudo nano /etc/apache2/sites-available/spotifai.conf
```

```apacheconf
<VirtualHost *:80>
    ServerAdmin webmaster@localhost
    DocumentRoot /var/www/html/spotifaie

    <Directory /var/www/html/spotifaie>
        AllowOverride All
        Order Allow,Deny
        Allow from All
    </Directory>

    ErrorLog ${APACHE_LOG_DIR}/spotifai-error.log
    CustomLog ${APACHE_LOG_DIR}/spotifai-access.log combined
</VirtualHost>
```

```bash
sudo a2ensite spotifai
sudo service apache2 restart
```

## Usage

```bash
http://localhost
create an account on the Sign_Up.php then login on the login.php
that will redirect you on the index.html
```

## What we do

the api has been written in php and the front in html/css/js.  
Only the auth is with php, the rest is with js.  
We use ajax to call the api.  
The JQuerry library is sometime used for the ajax calls.  
We use postgresql for the database.  
We use apache2 for the server.  
We use git for the versionning.  
We use a vm to host the server.