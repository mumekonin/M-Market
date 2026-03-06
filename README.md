# M-Market Electronics — Backend

REST API for M-Market Electronics built with **NestJS** — a progressive Node.js framework — connected to **MongoDB** via Mongoose as the database, and deployed on **Render** as a live web service.

## Live API
- **Base URL:** [https://m-market-2.onrender.com/](https://m-market-2.onrender.com/)

## 🔐 Demo Credentials

| Role  | Email | Password |
|-------|-------|----------|
| Admin | admin@gmail.com | 1234 |
| User  | user@gmail.com  | 1234  |

## 🛠️ Tech Stack

| Tool | Purpose |
|------|---------|
| NestJS | Backend framework |
| MongoDB + Mongoose | Database |
| JWT | Authentication |
| Role-Based Guard | Authorization (Admin / User) |
| Multer | File upload handling |
| Cloudinary | Cloud image storage |

## 📁 Project Structure

```
src/
├── cloudinary/              # Cloudinary config & upload logic
├── commons/
│   ├── decorators/          # Custom decorators (e.g. get current user)
│   ├── guards/              # JWT & Role-based auth guards
│   ├── enums.ts             # App-wide enums (roles, status, etc.)
│   ├── multer.config.ts     # Multer file upload configuration
│   ├── upload.intercepter.ts# File upload interceptor
│   └── utils.ts             # Shared utility functions
├── orders/
│   ├── controller/          # Order routes & request handling
│   ├── dto/                 # Data transfer objects for orders
│   ├── response/            # Response shapes/interfaces
│   ├── schemas/             # Mongoose order schema
│   ├── service/             # Order business logic
│   └── orders.module.ts
├── products/
│   ├── controller/          # Product routes & request handling
│   ├── dto/                 # Data transfer objects for products
│   ├── response/            # Response shapes/interfaces
│   ├── schemas/             # Mongoose product schema
│   ├── service/             # Product business logic
│   └── product.module.ts
└── users/
    ├── controller/          # User routes & request handling
    ├── dto/                 # Data transfer objects for users
    ├── response/            # Response shapes/interfaces
    └── schema/              # Mongoose user schema
```

## 🚀 Setup

```bash
git clone https://github.com/your-username/m-market-backend.git
cd m-market-backend
npm install
npm run start:dev
```

## ☁️ Deployment
Hosted on **Render** as a Web Service. Build command: `npm install && npm run build`. Start command: `npm run start:prod`.

## Related
🌐 Frontend repo: [m-market-frontend](https://github.com/mumekonin/m-market-electronics)
   deployed Frontend: [viwe](https://m-market-electronics.vercel.app/)
