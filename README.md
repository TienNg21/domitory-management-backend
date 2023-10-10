
## Installation

- Install dependencies module
```bash
$ npm install
```

- Config mysql database
    - Create database name. Ex: "group32db"

- Config enviroment variables
    - Create a file name ".env"
    - Copy from .env.example to .env
    - Config DB_USERNAME, DB_PASSWORD, DB_NAME value

## Running the app
```bash
# development
$ npm run start

# watch mode
$ npm run start:dev
```

## Migrate database
```bash
$ npm run migrateDB
```

## Seed data
```bash
$ npm run seedDB
```

## Drop database
```bash
$ npm run dropDB
```