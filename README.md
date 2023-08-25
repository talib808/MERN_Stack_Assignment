### E-Commerce Web Application
> • Live Recording - - [Assignment]()
- This is an E-Commerce web application built using MERN (MongoDB, Express, React, Node.js) stack. It allows users to register, log in, manage products, and add products to their cart. The application has separate functionalities for both store owners and customers.

### Features
- User Registration and Login: Users can register and log in with their credentials.
- Store Registration and Login: Store owners can register and log in to manage products.
- Product Management: Store owners can add, update, and delete products.
- Cart Functionality: Users can add and remove products from their cart.
- Cart Display: Users can view their cart contents and total price.
- Responsive Design: The application is designed to be responsive on various screen sizes.

### Technologies Used
- Frontend: React.js, Axios
- Backend: Node.js, Express.js
- Database: MongoDB
- Authentication: JSON Web Tokens (JWT)
- Styling: CSS
- Routing: React Router
- State Management: React Hooks (useState, useEffect, useContext)
- API Calls: Axios
### Folder Structure 
 ## client: Contains the React frontend code.
 - src/components: Holds different React components.

## server: Contains the Node.js backend code.
- routes: Defines routes for user, store, product, and cart management.
- models: Defines MongoDB schemas for User, Store, Product, and Cart.
- middlewares: Includes authentication middleware.
- db: Contains the MongoDB connection setup.

### Installation
* Clone the repository:
```
git clone <repository-url>
````
#### Install the dependencies for the frontend and backend:
```
cd frontend
npm install
```
```
cd ../backend
npm install
```
### Usage 
> Start the backend server:
```
cd backend
nodemon index.js
```
> In a new terminal window, start the React app:
```
cd frontend
npm start
```
> The application will be accessible at `http://localhost:3000`.

### Database Setup
- The application uses MongoDB as the database.
- The connection details can be configured in the db/connection.js file.
- MongoDB models are defined in the server/models directory.

### Authentication
- JWT (JSON Web Tokens) are used for user authentication.
- Middleware in server/middlewares/auth.js verifies user tokens.

### API Endpoints
- See server/routes for the list of available API routes.
- For example:
- POST /user/register: Register a new user.
- POST /user/login: Log in a user.
- POST /store/register: Register a new store.
- POST /store/login: Log in a store.
- POST /product/add-product: Add a new product.
- ...

