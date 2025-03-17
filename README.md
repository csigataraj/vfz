# VFZ project

This is a pet project for VFZ

## About this Project

This is a React app built with the following technologies and libraries:

- React 18
- React Router
- React Query
- Chakra UI
- Zustand (for state management)

Please follow these instructions carefully to setup this project on your machine.

## Running the App

Run the React app using the following commands:

```bash
# Install dependencies
npm install

# Start the development server
npm run dev
```

This will start the back-end process at `http://localhost:5173`

### Alternative running

```bash
#Run build
npm run build

# Use Docker Compose:
docker-compose up
```

This will start the application in a docker container and you can use it at 'http://localhost:5173'

## Running the tests

```bash
#To run unit tests
npm run test

# To run e2e tests (running the app in dev)
npm run test:e2e

# To run e2e tests (running the app in docker container)
npx playwright http:/localhost:3000
```

