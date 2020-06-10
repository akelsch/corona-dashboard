# dashboard-prototyp

## Getting Started

Running the following command will start a Node.js server and a PostgreSQL database (including pgAdmin):

```sh
docker-compose up -d
```

To rebuild the application run:

```sh
docker-compose up -d --build
```

### Setting up pgAdmin

1. Go to http://localhost:8000/
2. Login using admin/nimda
3. Create a new server
    1. Host: postgres
    2. Port: 5432
    3. Username: postgres
    4. Password: postgres

Note that the server configuration is persistent and will survive restarts.
