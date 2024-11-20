# ☕ CoffeeShop

A full-stack coffee shop website that allows users to browse products, add them to the cart, and make purchases. Admin users can manage products, administrators and discounts.
## Table of contents
- [Getting Started](https://github.com/4Zade/CoffeeShop/blob/fix-Lukas/README.md#getting-started)
- [Features](https://github.com/4Zade/CoffeeShop/tree/fix-Lukas?tab=readme-ov-file#features)
- [Tech Stack](https://github.com/4Zade/CoffeeShop/tree/fix-Lukas?tab=readme-ov-file#features)
- [Installation](https://github.com/4Zade/CoffeeShop/tree/fix-Lukas?tab=readme-ov-file#features)
- [Usage](https://github.com/4Zade/CoffeeShop/tree/fix-Lukas?tab=readme-ov-file#usage)
- [API Documentation](https://github.com/4Zade/CoffeeShop/tree/fix-Lukas?tab=readme-ov-file#api-documentation)
- [Collaborators](https://github.com/4Zade/CoffeeShop/tree/fix-Lukas?tab=readme-ov-file#collaborators)
- [License](https://github.com/4Zade/CoffeeShop/tree/fix-Lukas?tab=readme-ov-file#collaborators)



## Getting started
This project is a full-stack application built using ReactJS and ExpressJS, both written in TypeScript.



### Prerequisites
Ensure you have the following installed:
- **NodeJS** (v16 or later)



## Features
### User Features:
- 🛒 Browse and search products.
- 📋 View, add, edit, and clear items in the cart.
- 💳 Purchase products and view transaction history.

### Admin Features:
- 🔒 Manage products (add, edit, delete).
- 👤 Manage administrators (add, remove).
- 🏷️ Manage discount codes (add, edit, delete).

### General Features:
- 🔑 User authentication and role-based access.
- 🌟 Product favorite system.
- 📧 Email verification for account activation.
- 🔓 Password reset via email.


## Tech Stack
- **Frontend:** ReactJS (TypeScript), TailwindCSS
- **Backend:** ExpressJS (TypeScript)
- **Database:** MongoDB
- **Authentication:** JWT-based

## Installation
### Clone the Repository
```bash
git clone https://github.com/username/coffeeshop.git
cd CoffeeShop
```
### Frontend Setup
```bash
cd Frontend
npm install
```
### Backend Setup
```bash
cd Backend
npm install
```
### Environment Variables
Create `.env` files in `backend` directory. Example:
```
PORT=7000
BASE_URL=http://localhost:7000

MONGO_URI=your_mongo_uri

MAIL_USER=your_used_email
MAIL_PASSWORD=your_app_secret 
MAIL_URL=http://localhost:5173

JWT_SECRET=your_jwt_secret
```
### Run the Application
**Without docker (development):**
```bash
# In backend/
npm run dev

# In frontend/
npm run dev
```
**Without docker (production):**
```bash
# In backend/
npm run start:build

# In frontend/
npm run start:build
```
**With docker:**
```bash
docker-compose up --build
```
## Usage
### Access the Application
- Frontend: http://localhost:5173
- Backend API: http://localhost:7000/api/v1
- API Documentation: http://localhost:7000/api-docs

## API Documentation
### Authentication
- `POST /api/v1/auth/register` - Allows the user to register.
- `POST /api/v1/auth/login` - Allows the user to login.
- `POST /api/v1/auth/logout` - Allows the user to logout.
- `GET /api/v1/auth/status` - Checks if the user is logged in.
- `POST /api/v1/auth/verify/{token}` - Verifies the user.
- `POST /api/v1/auth/resend-verify` - Resends the verification email to the user.
- `POST /api/v1/auth/password/request-reset` - Sends a password reset email to the user.
- `POST /api/v1/auth/password/reset/{token}` - Resets the users password.
- `POST /api/v1/auth/password/change` - Changes the users password.

### Products
- `GET /api/v1/products` - Retrive all products.
- `POST /api/v1/products` - Create a new product.
- `GET /api/v1/products/{id}` - Retrive product by ID.
- `PATCH /api/v1/products/{id}` - Update product by ID.
- `DELETE /api/v1/products/{id}` - Delete product by ID.
- `POST /api/v1/products/review` - Review a product (favorite/unfavorite).

### Users
- `GET /api/v1/users` - Retrive all users.
- `GET /api/v1/users/{email}` - Retrieve user by Email.
- `PATCH /api/v1/users` - Update user.

### Users/admins
- `GET /api/v1/users/admins` - Get all users with admin role.
- `POST /api/v1/users/admins/{email}` - Add user as admin by Email.
- `DELETE /api/v1/users/admins/{email}` - Remove user admin role by Email.

### Users/cart
- `GET /api/v1/users/cart` - Get user cart.
- `POST /api/v1/users/cart/{productId}` - Add product to users cart.
- `DELETE /api/v1/users/cart/{productId}` - Remove product from users cart.
- `DELETE /api/v1/users/cart/clear` - Clear users cart.

### Users/discounts
- `GET /api/v1/users/discounts` - Get all discount codes.
- `POST /api/v1/users/discounts` - Create a new discount code.
- `DELETE /api/v1/users/discounts/{code}` - Delete discount code.
- `PATCH /api/v1/users/discounts/{code}` - Update discount code.
- `GET /api/v1/users/discounts/{code}` - Checks and applies discount code.

### Users/contacts
- `POST /api/v1/users/contacts` - Send an email to coffee shop owners.

### Transactions
- `POST /api/v1/purchase` - Make a purchase.
- `GET /api/v1/transactions` - Get all user transactions.
- `GET /api/v1/transactions/{id}` - Get user transaction by ID.

## Collaborators
This project was a collective effort by a team of developers. Each member contributed to both the frontend and backend, ensuring a cohesive and functional application. Here’s the team behind this project:
|    Name    |                      Github                     |               Role               |
|------------|-------------------------------------------------|----------------------------------|
|Lukas       |[ForZade](https://github.com/ForZade)            | Full-stack Development, Team lead|
|Jaunius     |[Vanopakalikas](https://github.com/Vanopakalikas)| Full-stack Development           |
|Danielis    |[DanVolu](https://github.com/DanVolu)            | Full-stack Development           |
|Adamas      |[xvqpz](https://github.com/xvqpz)                | Full-stack Development           |
|Ričardas    |[KaRichR](https://github.com/KaRichR)            | Full-stack Development           |

## License
#This project is licensed under the MIT License. See the **[LICENSE](https://github.com/4Zade/CoffeeShop/blob/fix-Lukas/LICENSE.md#mit-license)** file for details.
