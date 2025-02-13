# Technology Leadership Journal API

Backend API for the Technology Leadership Journal application. This API provides endpoints for managing journal entries with categories like technology, delivery, business, team, organization, and mindset.

## Tech Stack

- Node.js
- Express.js
- SQLite database
- Swagger/OpenAPI documentation

## Getting Started

1. Install dependencies:
```bash
npm install
```

2. Start the development server:
```bash
npm run dev
```

The server will start on http://localhost:3001 with API documentation available at http://localhost:3001/api-docs

## API Endpoints

- `GET /entries` - List all journal entries
- `GET /entries/:id` - Get a single entry
- `POST /entries` - Create a new entry

## Deployment

This API is configured for deployment on Vercel:

1. Install Vercel CLI:
```bash
npm i -g vercel
```

2. Deploy to production:
```bash
vercel --prod
```

## Environment Variables

- `NODE_ENV`: Set to 'production' for production deployment

## Proprietary Notice

This software is proprietary and confidential. Unauthorized copying, transfer, or reproduction of the contents of this software, via any medium, is strictly prohibited.

Copyright © 2025 All rights reserved.
