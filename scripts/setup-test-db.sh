#!/bin/bash

# Load environment variables
export $(grep -v '^#' .env | xargs)

# Create test database
PGPASSWORD=$DB_PASSWORD psql -h $DB_HOST -U $DB_USERNAME -d postgres -c "DROP DATABASE IF EXISTS prm_test;"
PGPASSWORD=$DB_PASSWORD psql -h $DB_HOST -U $DB_USERNAME -d postgres -c "CREATE DATABASE prm_test;"

echo "Test database setup complete!" 