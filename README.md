# dashboard-prototyp

## Getting Started

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

To run and build the application with Docker uncomment the `app` part in [`docker-compose.yml`](docker-compose.yml) and run:

```sh
docker-compose up -d --build
```

#### pgAdmin

1. Go to http://localhost:8000/
2. Login using admin/nimda
3. Create a new server
    1. Host: postgres
    2. Port: 5432
    3. Username: postgres
    4. Password: postgres

Note that the server configuration is persistent and will survive restarts.

## Endpoints

| Route    | Method | Query Parameters                                                     | Request Body | Success Response | Example |
| -------- | ------ | -------------------------------------------------------------------- | ------------ | ---------------- | ------- |
| /mapdata | GET    | stateId (1-16, 0)<br> resolution (high, medium, low)<br> zoom (0-20) |              | 200 OK           |         |
| /cases   | GET    | stateId (1-16, 0)                                                    |              | 200 OK           |         |
| /options | GET    | guid (UUID)                                                          |              | 200 OK           |         |
| /options | POST   |                                                                      | TODO         | 201 Created      |         |
