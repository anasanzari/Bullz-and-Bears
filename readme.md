## Bullz-and-Bears

### Setting Up

1. Run `npm install` in project root.
2. Run `bower install` in public folder.

### Running locally
#### Frontend

run `grunt server` from project root. Access it with http://localhost:8080

#### Backend

1. create env file in root (refer .env.example)
2. run `php artisan key:generate`
3. run `php artisan migrate`
4. run `php artisan db:seed`
5. run `php artisan update:initStocks` [to initialize stocks. You need to enable Curl extension for php]
6. run `php artisan serve` from root. [keep it running in the background & use http://localhost:8080 to view the Game.]

### Database Overview

1. Stocks : Most important table in the application, where all the live stocks are saved. Stocks are updated every minute by cronjob.
2. bought stocks : Stores stocks bought by users
3. short sell : Short selling details of users
4. schedules: Stores scheduled transcations
5. history : Every transcation is basically logged in history table, so that if anything goes wrong, we can simulate the game by running the transactions again.

### Project Structure

#### Backend code
1. Crons : app/console/commands/
2. Apis : app/Http
3. Models: app/*.php
4. Game Configuration : config/bullz.php

#### Frontend code
1. html and js : resources/src
2. styles : resources/assests
3. Facebook App configuration:
    production app id : '551333468325789'
    Test : '882961331768341'


### Improvement Suggestions
1. Writing Tests: Use Laravel test api to test the game properly
2. Fix Simulation Code
3. Facebook share events
4. Ideas to make it more interesting.
