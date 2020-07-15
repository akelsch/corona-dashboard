# corona-dashboard

Project as part of the web applications module at htw saar. It contains a backend application built with Express serving COVID-19 case data provided by RKI.

## Endpoints

See [Postman collection](etc/Corona%20Backend.postman_collection.json).

## Getting Started

### TLDR

1. `git clone`
2. `npm install`
3. `docker-compose up -d`
4. `npm run init`
5. `npm start`

### npm

#### `npm install`

Will install all dependencies that are required to run the application.

#### `npm start`

Will start the application using `node`.

#### `npm run init`

Will initialize the database including all tables and mapdata **(has to be run once before first start)**.

#### `npm run watch`

Will start the application using `nodemon` (useful during development).

### Docker

Running the following command will start a PostgreSQL database including PostGIS and pgAdmin:

```sh
docker-compose up -d
```

If you want to dockerize the application itself as well, add [`docker-compose.prod.yml`](docker-compose.prod.yml) to your list of compose files:

```sh
docker-compose -f docker-compose.yml -f docker-compose.prod.yml up -d --build
```

#### pgAdmin

1. Open http://localhost:8000/
2. Login
    - Username: admin
    - Password: nimda
3. Create a new server
    - Host: postgres
    - Port: 5432
    - Username: postgres
    - Password: mysecretpassword

Note that the server configuration is persistent and will survive restarts.

## Troubleshooting

It is not uncommon that something goes wrong with the Docker volume of PostgreSQL so it can be helpful to recreate it from scratch (especially during development).
To do so, run the following command:

```sh
docker volume rm corona-dashboard_pgdata
```

After that, run Docker Compose and the init script to recreate all tables and data.
