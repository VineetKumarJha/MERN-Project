# 🏡 MERN Airbnb-like Listings App

A full-stack web application built using the MERN stack that allows users to explore, create, and manage property listings. This project simulates a simplified Airbnb-style platform with authentication and CRUD functionality.

---

## 🚀 Live Demo

🔗 https://mern-project-1-mjr1.onrender.com/listings

---

## 📌 Features

- 🔐 User Authentication (Signup/Login)
- 🏠 Create, Read, Update, Delete (CRUD) Listings
- 🖼️ Upload listing images
- 📂 Category-based filtering
- 🌐 Fully responsive UI
- ⚡ Server-side rendering using EJS
- 🔎 Explore listings page
- 🔁 Redirect from root `/` → `/listings`

---

## 🛠️ Tech Stack

### Frontend
- HTML
- CSS
- JavaScript
- EJS (Embedded JavaScript Templates)

### Backend
- Node.js
- Express.js

### Database
- MongoDB
- Mongoose

### Other Tools & Libraries
- Passport.js (Authentication)
- Multer (File Upload)
- Cloudinary (Image Storage)
- Express-session
- Connect-flash
- Method-override
- Dotenv

---

## 📁 Folder Structure
MERN_Project/
│--
├── models/ # Mongoose schemas
├── routes/ # Express routes
├── controllers/ # Business logic
├── views/ # EJS templates
├── public/ # Static files (CSS, JS)
├── utils/ # Helper functions
├── middleware/ # Custom middleware
├── app.js # Main server file
└── package.json

---

## ⚙️ Installation & Setup

### 1. Clone the repository
git clone https://github.com/VineetKumarJha/MERN-Project.git
cd MERN-Project

2. Install dependencies
npm install
3. Setup environment variables

Create a .env file and add:

CLOUD_NAME=your_cloudinary_name
CLOUD_API_KEY=your_api_key
CLOUD_API_SECRET=your_api_secret

DB_URL=your_mongodb_connection_string
SESSION_SECRET=your_secret
4. Run the app
npm start
OR (for development)
nodemon app.js
5. Open in browser
http://localhost:8080/listings

Deployment

Deployed on Render
Steps:
Push code to GitHub
Connect repo to Render
Add environment variables
Deploy

Future Improvements
❤️ Wishlist Feature
⭐ Reviews & Ratings
📍 Map Integration
💳 Payment Integration
⚛️ React Frontend Upgrade

👨‍💻 Author

Vineet Kumar Jha
CSE (AI & ML) Student
Aspiring MERN Stack Developer

⭐ Support

If you like this project:

⭐ Star the repo
🍴 Fork it
🚀 Contribute
