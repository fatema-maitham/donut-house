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

## 📝 Planning
 
### User Stories
 
**Customer / General User Stories**
- AAG, I can view the home/landing page explaining what Donut House offers.
- AAU, I can sign up and log in to my account.
- AAU, I can log out of my account.
- AAU, I can view and edit my profile.
- AAG, I can view all available donuts.
- AAG, I can view the details of a specific donut.
- AAU, I can create a donut order.
- AAU, I can add donuts to my order.
- AAU, I can change the quantity of donuts in my order.
- AAU, I can remove donuts from my order.
- AAU, I can view my current order before placing it.
- AAU, I can place an order.
- AAU, I can view my previous orders.
- AAU, I can view the details and status of a specific order.
- AAU, I can cancel an order if it has not been processed.
- AAG, I can view the available Donut House locations.
- AAG, I can view the details of a specific location.
- AAU, I can select a location for my order.
- AAU, I can delete my account and its associated orders.

**Admin User Stories**
- AA, I can create a new donut.
- AA, I can edit a donut.
- AA, I can delete a donut.
- AA, I can create a Donut House location.
- AA, I can edit a location.
- AA, I can delete a location.
- AA, I can view all customer orders.
- AA, I can update an order's status.
 
### ERD (Entity Relationship Diagram)
 
![Donut House ERD](./docs/erd.png)
 
 
### Wireframes
 
![Donut House Wireframes](./docs/wireframes.png)


## 🗄️ Data Models

**User** — Stores account information and user role.

**Donut** — Stores donut name, description, price, category, and Cloudinary image URL.

**Order** — Stores the customer, location, order items, total, and order status.

**OrderItem** — Stores the donut, quantity, and price for each item in an order.

**Location** — Stores store name, address, phone number, and opening hours.

## 🍩 Donuts Routes

| HTTP Method | Route              | Action | Description                          |
|-------------|---------------------|--------|---------------------------------------|
| GET         | /donuts             | Index  | Displays all available donuts         |
| GET         | /donuts/new          | New    | Shows a form to create a new donut    |
| POST        | /donuts             | Create | Creates a new donut                   |
| GET         | /donuts/:id          | Show   | Displays details of a specific donut  |
| GET         | /donuts/:id/edit     | Edit   | Shows a form to edit a donut          |
| PUT         | /donuts/:id          | Update | Updates a specific donut              |
| DELETE      | /donuts/:id          | Delete | Deletes a specific donut              |

## 🛒 Cart Routes

| HTTP Method | Route            | Action | Description                          |
|-------------|--------------------|--------|----------------------------------------|
| GET         | /cart              | Index  | Displays the user's shopping cart      |
| POST        | /cart/:donutId      | Add    | Adds a donut to the cart               |
| PUT         | /cart/:donutId      | Update | Updates the quantity of a donut        |
| DELETE      | /cart/:donutId      | Remove | Removes a donut from the cart          |

## 📦 Orders Routes

| HTTP Method | Route            | Action        | Description                              |
|-------------|--------------------|----------------|--------------------------------------------|
| GET         | /orders            | Index          | Displays the logged-in user's orders       |
| GET         | /orders/:id         | Show           | Displays details of a specific order       |
| POST        | /orders            | Create         | Creates an order from the user's cart      |
| GET         | /orders/admin       | Admin Orders   | Allows admins to view all customer orders  |
| PUT         | /orders/:id         | Update         | Updates an order's status                  |

## 📍 Locations Routes

| HTTP Method | Route              | Action | Description                          |
|-------------|----------------------|--------|----------------------------------------|
| GET         | /locations           | Index  | Displays all pickup locations          |
| GET         | /locations/new        | New    | Shows a form to create a location      |
| POST        | /locations           | Create | Creates a new pickup location          |
| GET         | /locations/:id/edit   | Edit   | Shows a form to edit a location        |
| PUT         | /locations/:id        | Update | Updates a pickup location               |
| DELETE      | /locations/:id        | Delete | Deletes a pickup location               |

## 👤 Authentication Routes

| HTTP Method | Route            | Action     | Description                                |
|-------------|--------------------|------------|----------------------------------------------|
| GET         | /auth/sign-up       | Sign Up    | Displays the registration form                |
| POST        | /auth/sign-up       | Register   | Creates a new customer account                |
| GET         | /auth/sign-in       | Sign In    | Displays the login form                       |
| POST        | /auth/sign-in       | Login      | Logs in the user and starts a session         |
| GET         | /auth/sign-out      | Logout     | Logs out the user and destroys the session    |

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
