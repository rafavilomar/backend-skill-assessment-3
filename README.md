# Backend Skill Assessment

## Table of content
- [About](#about)
- [Database in Docker (Optional)](#database-in-docker)
- [Running the Project](#running-the-project)
- [Services documentation](#services-documentation)
- [Author](#author)


## About

This project corresponds to the Backend Skill Assessment for Designli. It exposes different services to manage the products, orders, and users.

## Before Running the Project
It's necessary to create a new `.env` file in the root project to define all necessary environment variables, there is a `.env.example` file with a variable list. Anyway, you can learn more about them here.

| Key | Description |
|-----|-------------|
| `PORT` | Port to expose the API |
| `DB_HOST` | Database host |
| `DB_PORT` | Database port |
| `DB_USER` | Database user |
| `DB_PASSWORD` | Database password |
| `DB_NAME` | Database name |
| `AUTH0_DOMAIN` | Auth0 domain |
| `AUTH0_CLIENT_ID` | Auth0 client ID |
| `AUTH0_CLIENT_SECRET` | Auth0 client secret |
| `AUTH0_ISSUER_URL` | Auth0 issuer URL |
| `AUTH0_AUDIENCE` | Auth0 audience |

## Database in Docker
If you want to use a database in Docker there is a docker-compose file in the root project. To run it, run the command below:
```bash
$ docker-compose up -d
```

If not, you can use any postgres database you want.

## Running the Project

#### Prerequisite
- Install NodeJS to execute javascript without any browser. You can install it [here](https://nodejs.org/en/download/).

#### Installation
Once you have NodeJS, run the command above in your terminal located on the root project:
```bash
$ npm install
```

#### For testing purposes

The project has a seeder to fill the database with some roles that runs automatically. Also, the service to create the admin use is public, so you can use it to create an admin.

#### Run the Project
```bash
# development
$ npm run start

# watch mode
$ npm run start:dev
```

### Service Documentation
This project is using [Swagger](https://swagger.io/) to map all endpoints, requests, and responses for the exposed service. If you want to see this information, in your browser, go to `http://localhost:[PORT]/api`.
### Author
- Author: Rafael Vilomar
- Email: rafael.vilomar@designli.co
