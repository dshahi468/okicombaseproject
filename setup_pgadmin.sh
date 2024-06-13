#!/bin/bash

# Wait for PostgreSQL to start
until pg_isready -h pgsql -p 5432 -U "${DB_USERNAME}"; do
  echo "Waiting for PostgreSQL to start..."
  sleep 2
done

# Configuration for pgAdmin4
PGADMIN_SETUP_DIR=/pgadmin4
export PGADMIN_SETUP_DIR

# Write server configuration to pgadmin4.db
python3 /usr/lib/python3/dist-packages/pgadmin4-web/setup.py --load-servers "${PGADMIN_SETUP_DIR}/servers.json"
