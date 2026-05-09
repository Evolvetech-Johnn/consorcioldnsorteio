/**
 * README file for Backend structure
 * Describes the directory structure and how to use it
 */

# Backend - Lead Consortium API

## 📁 Directory Structure

```
src/
├── config/          # Configuration files
│   ├── environment.ts
│   ├── database.ts
│   └── constants.ts
├── models/          # Mongoose schemas
├── controllers/     # Request handlers
├── services/        # Business logic
├── routes/          # API routes
├── middleware/      # Express middleware
├── validators/      # Zod schemas
├── types/          # TypeScript types
├── utils/          # Utility functions
├── app.ts          # Express setup
└── server.ts       # Entry point
```

## 🚀 Getting Started

### Install Dependencies
```bash
npm install
```

### Development Server
```bash
npm run dev
```

### Build for Production
```bash
npm run build
```

### Start Production
```bash
npm start
```

### Type Check
```bash
npm run type-check
```

### Lint Code
```bash
npm run lint
```

## 📦 Technologies

- **Node.js** - Runtime
- **Express** - Web framework
- **TypeScript** - Type safety
- **MongoDB** - Database with Mongoose ODM
- **JWT** - Authentication
- **Bcryptjs** - Password hashing
- **Zod** - Validation
- **Helmet** - Security headers
- **CORS** - Cross-origin support

## 🔒 Security Features

- JWT token authentication
- Bcrypt password hashing
- Helmet.js for security headers
- CORS configuration
- Rate limiting ready
- Input validation with Zod

## 📝 Code Style

- ESLint + Prettier configured
- 2-space indentation
- Single quotes
- Trailing commas (es5)
- Line width: 100 characters
- Semicolons required

## 🔧 Configuration Files

- `tsconfig.json` - TypeScript configuration
- `.eslintrc.json` - Linting rules
- `.prettierrc` - Code formatting
- `.env.example` - Environment variables template

## 📚 Environment Variables

Create `.env` file based on `.env.example`:

```
NODE_ENV=development
PORT=5000
MONGODB_URI=mongodb+srv://...
JWT_SECRET=your-secret-key
JWT_EXPIRES_IN=24h
BCRYPT_SALT_ROUNDS=12
CORS_ORIGIN=http://localhost:5173
```

## 🏗️ Architecture

### MVC + Service Layer Pattern

```
Routes → Controllers → Services → Models → Database
```

### Error Handling

- Centralized error handler
- Custom error types
- Consistent error responses

### Database

MongoDB with Mongoose for schema validation and type safety.

## 📚 Documentation

- [Express Documentation](https://expressjs.com)
- [Mongoose Documentation](https://mongoosejs.com)
- [JWT Documentation](https://jwt.io)
- [TypeScript Documentation](https://www.typescriptlang.org)
- [Zod Documentation](https://zod.dev)

## ✅ Health Check

```bash
curl http://localhost:5000/health
```

Response:
```json
{
  "status": "OK",
  "timestamp": "2024-01-01T00:00:00.000Z"
}
```

## 🔐 API Structure

All API responses follow this structure:

```typescript
{
  success: boolean
  data?: T
  message?: string
  error?: string
}
```

## 📊 Planned Endpoints

Will be implemented in following phases:

- `/api/auth/*` - Authentication
- `/api/leads/*` - Lead management
- `/api/raffles/*` - Raffle system
- `/api/stats/*` - Statistics
- `/api/export/*` - Data export
