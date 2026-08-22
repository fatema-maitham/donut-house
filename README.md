# 🍩 Donut House

Donut House is a full-stack donut ordering web application where customers can browse donuts, place orders, and manage their orders. Administrators can manage donuts, locations, and customer orders.

## ✨ Features

### 👤 Authentication
- Sign up and log in
- Session-based authentication
- Customer and admin roles
- Secure logout

### 🍩 Donut Menu
- Browse all available donuts
- View individual donut details
- View donut images hosted with Cloudinary
- Admins can create, edit, and delete donuts

### 🛒 Orders
- Create donut orders
- Select donut quantities
- Calculate order totals
- View order history
- View individual order details
- Admins can view and manage customer orders
- Update order status

### 📍 Locations
- View Donut House locations
- Admins can create, edit, and delete locations

## 👥 User Roles

### Customer
- Browse donuts
- View donut details
- Place orders
- View their orders
- View locations

### Admin
- Manage donuts
- Manage locations
- View all orders
- Update order status

## 🗄️ Data Models

**User** — Stores account information and user role.

**Donut** — Stores donut name, description, price, category, and Cloudinary image URL.

**Order** — Stores the customer, location, order items, total, and order status.

**OrderItem** — Stores the donut, quantity, and price for each item in an order.

**Location** — Stores store name, address, phone number, and opening hours.

## 🛠️ Technologies
- Node.js
- Express.js
- MongoDB
- Mongoose
- EJS
- HTML
- CSS
- JavaScript
- Express Session
- bcrypt
- Cloudinary
- Git & GitHub

## 📁 Project Structure

```text
donut-house/
│
├── controllers/
│   ├── authController.js
│   ├── donutController.js
│   ├── orderController.js
│   └── locationController.js
│
├── models/
│   ├── User.js
│   ├── Donut.js
│   ├── Order.js
│   ├── OrderItem.js
│   └── Location.js
│
├── routes/
│   ├── authRoutes.js
│   ├── donutRoutes.js
│   ├── orderRoutes.js
│   └── locationRoutes.js
│
├── middleware/
│   ├── isLoggedIn.js
│   └── isAdmin.js
│
├── views/
│   ├── partials/
│   ├── auth/
│   ├── donuts/
│   ├── orders/
│   ├── locations/
│   └── index.ejs
│
├── public/
│   ├── css/
│   │   └── style.css
│   └── js/
│       └── app.js
│
├── config/
│
├── .env
├── .gitignore
├── package.json
├── package-lock.json
├── server.js
└── README.md
```

## 🚀 Getting Started

### 1. Clone the repository

```bash
git clone https://github.com/fatema-maitham/donut-house
cd donut-house
```

### 2. Install dependencies

```bash
npm install
```

### 3. Create `.env`

```env
MONGODB_URI=your_mongodb_connection_string
SESSION_SECRET=your_session_secret
CLOUDINARY_CLOUD_NAME=your_cloudinary_cloud_name
CLOUDINARY_API_KEY=your_cloudinary_api_key
CLOUDINARY_API_SECRET=your_cloudinary_api_secret
```

### 4. Start the application

```bash
npm run dev
```

The application will run at:

```text
http://localhost:3000
```

## 🎯 Project Goal

The goal of Donut House is to build a complete full-stack application that demonstrates:

- Authentication
- Authorization
- CRUD operations
- MongoDB relationships
- Session management
- Image uploads with Cloudinary
- Customer ordering
- Admin management

## 📌 Future Improvements

- Online payment integration
- Order notifications
- Customer reviews and ratings
- Order tracking
- Search and filtering
