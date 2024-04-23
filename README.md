# foodshare-api

Idk, just a simple api for foodsharing app

```
project-root/
│
├── config/
│   ├── prisma.js           # Prisma config
│   └── ...
│
├── controllers/
│   ├── authController.js    # Controllers for auth-related routes
│   ├── foodController.js    # Controllers for food-related routes
│   └── ...
│
├── routes/
│   ├── authRouter.js        # API routes for auth
│   ├── foodRouter.js        # API routes for food
│   └── ...
│
├── middleware/
│   ├── logger.js            # Logger middleware
│   └── ...
│
│
├── app.js                   # Express application setup
│
├── server.js                # Express app entrypoint
│
└── .env                     # Environment variables configuration
```

# Requirements

```
Node.js 16.14.2 or later
Yarn 1.22.17 or later
```

# Configuration

Copy file .env.example to .env

```
cp .env.example .env
```

Sync your mongodb schema

```
npx prisma migrate
```
