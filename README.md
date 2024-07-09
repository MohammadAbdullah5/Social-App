# Social App

This repository contains the source code for a social app developed using the MERN (MongoDB, Express, React, Node.js) stack and Redux for state management. The app includes various functionalities such as authentication and authorization, CRUD operations for users, creating posts, liking and commenting on posts, and viewing posts.

## Table of Contents
- [Features](#features)
- [Tech Stack](#tech-stack)
- [Installation](#installation)
- [Usage](#usage)
- [API Endpoints](#api-endpoints)
- [Contributing](#contributing)
- [License](#license)

## Features
- **User Authentication and Authorization:** Secure registration and login functionality using JWT.
- **User CRUD Operations:** Create, Read, Update, and Delete user profiles.
- **Post CRUD Operations:** Create, Read, Update, and Delete posts.
- **Liking Posts:** Users can like and unlike posts.
- **Commenting on Posts:** Users can add comments to posts.
- **Viewing Posts:** Users can view all posts and the details of individual posts.

## Tech Stack
- **Frontend:**
  - React
  - Redux
  - Redux Thunk
  - Axios
  - React Router
  - Tailwind CSS
- **Backend:**
  - Node.js
  - Express.js
  - MongoDB
  - Mongoose
  - Multer for multi-media storage
  - JWT for authentication

## Installation
To get the project up and running on your local machine, follow these steps:

1. **Clone the repository:**
    ```bash
    git clone https://github.com/mohammadabdullah5/social-app.git
    cd social-app
    ```

2. **Install dependencies for both the frontend and backend:**
    ```bash
    # Navigate to the backend directory and install dependencies
    cd backend
    npm install

    # Navigate to the frontend directory and install dependencies
    cd ../frontend
    npm install
    ```

3. **Set up environment variables:**
    Create a `.env` file in the `backend` directory and add the following environment variables:
    ```env
    PORT=5000
    MONGO_URI="mongodb+srv://abd5434:abd5434@cluster0.qqvjyam.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0"
    ```

4. **Start the development servers:**
    ```bash
    # Start the backend server
    cd backend
    npm run dev

    # Start the frontend server
    cd ../frontend
    npm run dev
    ```

## Usage
1. **Register a new user:** Navigate to the registration page and create a new account.
2. **Login:** Use your credentials to log in.
3. **Create a post:** Once logged in, you can create new posts.
4. **Like and comment on posts:** Interact with posts by liking and commenting on them.
5. **View posts:** Browse all posts and view the details of individual posts.

## API Endpoints
Here is a summary of the available API endpoints:

- **User Routes:**
  - `POST /api/users/register` - Register a new user
  - `POST /api/users/login` - Login a user
  - `GET /api/users/:id` - Get user details
  - `PUT /api/users/:id` - Update user details
  - `DELETE /api/users/:id` - Delete user

- **Post Routes:**
  - `POST /api/posts` - Create a new post
  - `GET /api/posts` - Get all posts
  - `GET /api/posts/:id` - Get a specific post
  - `PUT /api/posts/:id` - Update a post
  - `DELETE /api/posts/:id` - Delete a post
  - `POST /api/posts/:id/like` - Like a post
  - `POST /api/posts/:id/comment` - Add a comment to a post

## Contributing
Contributions are welcome! Please fork the repository and create a pull request with your changes. Ensure that your code adheres to the project's coding standards and includes appropriate tests.

## License
This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.

---

Feel free to reach out if you have any questions or need further assistance. Happy coding!
