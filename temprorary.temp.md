# Auth routes:
- Register: POST: /auth/register
- Login: POST: /auth/login
- Logout: POST: /auth/logout
- Verify email: POST /auth/:verify
- Resend verify email: POST: /auth/resend-verify
- Request password reset: POST: /auth/password/request-reset
- Reset password: POST: /auth/password/reset
- Change password: POST: /auth/password/change

# User routes:
- Get all users: GET: /users
- Get user by id or email: GET: /users/:identifier

- Add admin role to User: POST: /users/admin/:identifier
- Remove admin role from User: DELETE: /users/admin/:identifier

- Get user cart: GET: /users/cart
- Clear user cart: DELETE: /users/cart/clear
- Add product to user cart: POST: /users/cart/:productId
- Remove product from user cart: Delete: /users/cart/:productId

# Product routes:
- Get all products: GET: /products
- Get product by id: GET: /products/:id
- Get product by name: GET: /products/:name
- Add product: POST: /products
- Edit product: PATCH: /products/:id
- Delete product: DELETE: /products/:id

# Transaction routes:
- Get all user transactions: GET: /transactions
- Purchase items: POST: /purchase