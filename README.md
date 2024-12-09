---

# Hono + MongoDB API Project

This project is a small backend API built using **Hono** (a fast web framework) and **MongoDB**. It provides basic CRUD operations, authentication (using JWT tokens), and secure API access.

## Table of Contents
- [Technologies Used](#technologies-used)
- [Folder Structure](#folder-structure)
- [Installation](#installation)
- [How It Works](#how-it-works)
  - [Routes and Middleware](#routes-and-middleware)
  - [Database](#database)
- [Running the Project](#running-the-project)

## Technologies Used

- **Hono**: A fast and lightweight web framework for Node.js.
- **MongoDB**: A NoSQL database for storing data in a flexible, JSON-like format.
- **JWT (JSON Web Tokens)**: Used for user authentication and securing API routes.
- **Bun**: A fast JavaScript runtime for executing the application.

## Folder Structure

```
hono-mongo-project/
├── src/
│   ├── controllers/
│   │   ├── authController.js        # Handles user registration and login
│   │   └── crudController.js        # Handles CRUD operations (Create, Read, Update, Delete)
│   ├── middleware/
│   │   └── authMiddleware.js        # Auth middleware to secure routes with JWT
│   ├── models/
│   │   └── itemModel.js             # MongoDB schema for items
│   ├── routes/
│   │   ├── authRoutes.js            # Auth-related routes (login, registration)
│   │   └── crudRoutes.js            # CRUD routes for items
│   └── app.js                       # Main entry point for the application
├── .env                             # Environment variables for configuration (e.g., MongoDB URI, JWT Secret)
├── package.json                     # Project dependencies and scripts
└── README.md                        # Project documentation
```

### Description of Each Folder/File

- **`src/controllers/`**: Contains the logic for handling various requests:
  - `authController.js`: Manages user registration and login processes, issuing JWT tokens.
  - `crudController.js`: Handles CRUD operations for items (adding, fetching, updating, and deleting items).

- **`src/middleware/`**:
  - `authMiddleware.js`: Middleware to protect routes by checking for a valid JWT token. It ensures only authenticated users can access certain endpoints.

- **`src/models/`**:
  - `itemModel.js`: Defines the MongoDB schema for items, which includes fields like `name`, `price`, `description`, etc.

- **`src/routes/`**:
  - `authRoutes.js`: Defines routes for user authentication (e.g., `/register`, `/login`).
  - `crudRoutes.js`: Defines routes for CRUD operations on items (e.g., `/api/items`, `/api/items/:id`).

- **`src/app.js`**: The main entry point where the server is created and routes are registered.

- **`.env`**: Contains sensitive information, like MongoDB connection URI and JWT secret, used in the backend.

- **`package.json`**: Contains the project dependencies and scripts (including the `dev` script to run the app using Bun).

## Installation

1. **Clone the repository:**
   ```bash
   git clone https://github.com/your-username/hono-mongo-project.git
   cd hono-mongo-project
   ```

2. **Install dependencies using Bun**:
   Make sure Bun is installed on your machine. If not, follow the [Bun installation guide](https://bun.sh/docs/install).
   ```bash
   bun install
   ```

3. **Set up environment variables**:
   Create a `.env` file in the root directory and add the following:
   ```plaintext
   MONGO_URI=mongodb://localhost:27017/your-database
   JWT_SECRET=your-jwt-secret-key
   ```

4. **Run the server**:
   Use the following command to run the app using Bun:
   ```bash
   bun run dev
   ```

   The server should now be running on `http://localhost:3000`.

## How It Works

### Routes and Middleware

1. **Authentication Routes**:
   - **`POST /auth/register`**: Allows users to register by providing a `username` and `password`. The password is hashed before being stored.
   - **`POST /auth/login`**: Allows users to log in using their `username` and `password`. Upon successful login, the user receives a JWT token that must be included in the `Authorization` header for accessing secure routes.

2. **CRUD Routes**:
   - **`POST /api/items`**: Adds a new item to the MongoDB database. The item must include fields like `name`, `description`, `price`, etc.
   - **`GET /api/items`**: Retrieves all items from the database.
   - **`GET /api/items/:id`**: Retrieves a specific item by its ID.
   - **`PUT /api/items/:id`**: Updates an item by its ID.
   - **`DELETE /api/items/:id`**: Deletes an item by its ID.

   All CRUD routes are protected with the `authMiddleware`, which checks for a valid JWT token.

### Database

The MongoDB database stores the items in a collection named `items`. Each item is a document containing information like `name`, `description`, `price`, and a timestamp for `createdAt` and `updatedAt`.

When a user registers or logs in, their credentials are stored and verified using JWT for secure authentication. The JWT token must be sent in the `Authorization` header when accessing secured API routes (CRUD operations).

---

## Running the Project

1. **Start the MongoDB server** (if it's not already running):
   - If using MongoDB locally, make sure the MongoDB service is running on your system.

2. **Run the development server**:
   ```bash
   bun run dev
   ```

3. **Access the API**:
   - Use [Postman](https://www.postman.com/) or any API client to interact with the API.
   - **Registration**: Make a `POST` request to `/auth/register` with a JSON body like:
     ```json
     {
       "username": "john_doe",
       "password": "password123"
     }
     ```
   - **Login**: Make a `POST` request to `/auth/login` with the same body:
     ```json
     {
       "username": "john_doe",
       "password": "password123"
     }
     ```
     You will receive a JWT token, which you can use for authentication in future requests.

   - **CRUD Operations**: Use the token in the `Authorization` header to perform operations on `/api/items`.

---

## Conclusion

This project demonstrates a simple yet functional backend API using Hono, MongoDB, and JWT for authentication. It showcases the power of Hono for building fast and lightweight APIs, combined with MongoDB's flexibility and Bun's performance.

Let me know if you have any questions or suggestions for improvements!

