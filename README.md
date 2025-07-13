# 🍎 Fruitnest - Fresh Fruit Delivery Platform

<!-- ![Fruitnest Banner](Frontend/fruitnest-client/public/mainLogo.png) -->

A modern, full-stack e-commerce platform for fresh fruit delivery platform.

## 🌐 Live Demo

- **Frontend**: [https://fruitnest-client.vercel.app](https://fruitnest-client.vercel.app)
- **Backend API**: [https://fruitnest-api.vercel.app](https://fruitnest-api.vercel.app)

## 🚀 Features

- 🛒 **Modern Shopping Experience**: Intuitive product browsing and cart management
- 📱 **Responsive Design**: Mobile-first design with Tailwind CSS
- 🎨 **Interactive UI**: Smooth animations with Framer Motion
- 🔄 **State Management**: Efficient state handling with Redux Toolkit

## 🛠️ Tech Stack

### Frontend

- **Framework**: React with TypeScript
- **Styling**: Tailwind CSS + DaisyUI
- **State Management**: Redux Toolkit + Redux Persist
- **Routing**: React Router DOM v7
- **Animations**: Framer Motion
- **UI Components**:
  - Lucide React (Icons)
  - Swiper.js (Carousels)
  - Sonner (Toast notifications)
- **Build Tool**: Vite
- **Deployment**: Vercel

### Backend

- **Runtime**: Node.js with TypeScript
- **Framework**: Express.js
- **Database**: MongoDB with Mongoose ODM
- **Validation**: Zod schema validation
- **Security**: CORS, Cookie Parser
- **Code Quality**: ESLint + Prettier
- **Deployment**: Vercel
- **Development**: ts-node-dev for hot reloading

### Development Tools

- **Language**: TypeScript
- **Linting**: ESLint
- **Formatting**: Prettier
- **Package Manager**: npm
- **Version Control**: Git

## 📁 Project Structure

```
Qtech/
├── Backend/
│   └── Fruitnest-api/          # Express.js API server
│       ├── src/
│       │   ├── app/
│       │   │   ├── builder/    # Query builder utilities
│       │   │   ├── config/     # Configuration files
│       │   │   ├── errors/     # Error handling
│       │   │   ├── middlewares/ # Custom middlewares
│       │   │   ├── modules/    # Feature modules
│       │   │   └── routes/     # API routes
│       │   ├── app.ts          # Express app configuration
│       │   └── server.ts       # Server entry point
│       └── package.json
│
└── Frontend/
    └── fruitnest-client/       # React frontend application
        ├── src/
        │   ├── components/     # Reusable UI components
        │   ├── pages/          # Page components
        │   ├── redux/          # State management
        │   ├── routes/         # Routing configuration
        │   ├── types/          # TypeScript definitions
        │   └── utils/          # Utility functions
        └── package.json
```

## 🚀 Getting Started

### Prerequisites

- Node.js (v18 or higher)
- npm or yarn
- MongoDB database
- Git

### Installation

1. **Clone the repository**

   ```bash
   git clone https://github.com/ainayeem/qtech-com.git
   cd qtech-com
   ```

2. **Backend Setup**

   ```bash
   cd Backend/Fruitnest-api
   npm install

   # Create .env file and configure:
   # DATABASE_URL=your_mongodb_connection_string
   # NODE_ENV=development

   npm run dev
   ```

3. **Frontend Setup**
   ```bash
   cd Frontend/fruitnest-client
   npm install
   npm run dev
   ```

## 📝 API Documentation

### Base URL

- Development: `http://localhost:5000/api`
- Production: `https://fruitnest-api.vercel.app/api`

### Main Endpoints

- `GET /products` - Get all products
- `GET /products/:id` - Get single product

## 🚀 Deployment

### Frontend (Vercel)

```bash
cd Frontend/fruitnest-client
npm run build
vercel --prod
```

### Backend (Vercel)

```bash
cd Backend/Fruitnest-api
npm run build
vercel --prod
```
