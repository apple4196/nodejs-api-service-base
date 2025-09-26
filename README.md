# Node.js API Service Base

A basic Node.js API service with Docker Compose setup.

## Features

- Express.js web framework
- Docker containerization
- Docker Compose for easy deployment
- Health check endpoint
- Basic Hello World API

## Quick Start

### Using Docker Compose (Recommended)

1. Clone this repository
2. Run the service:
   ```bash
   docker-compose up --build
   ```

The API will be available at `http://localhost:3000`

### Local Development

1. Install dependencies:
   ```bash
   npm install
   ```

2. Start development server:
   ```bash
   npm run dev
   ```

## API Endpoints

- `GET /` - Hello World endpoint
- `GET /health` - Health check endpoint

## Example Response

```json
{
  "message": "Hello World!",
  "service": "nodejs-api-service-base",
  "timestamp": "2024-01-01T00:00:00.000Z"
}
```

## Project Structure

```
.
├── src/
│   └── app.js          # Main application file
├── Dockerfile          # Docker configuration
├── docker-compose.yml  # Docker Compose configuration
├── package.json        # Node.js dependencies
├── .gitignore         # Git ignore rules
└── .dockerignore      # Docker ignore rules
```

## Environment Variables

- `PORT` - Server port (default: 3000)
- `NODE_ENV` - Node environment (default: production in Docker)

## Docker Commands

```bash
# Build and start services
docker-compose up --build

# Start services in background
docker-compose up -d

# Stop services
docker-compose down

# Enter the container (interactive shell)
docker exec -it nodejs-api-service-base sh

# Inside the container, start the service manually
npm start

# View logs
docker-compose logs -f nodejs-api-service-base
```
