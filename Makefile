# Start the development server
dev:
    docker-compose up --build

# Run unit tests
test:
    docker-compose run --rm app npm run test