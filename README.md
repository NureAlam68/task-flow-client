# 📌 TaskFlow

## 📝 Introduction

**TaskFlow** is a modern and minimalistic **Task Management Application** where users can **add, edit, delete, and reorder tasks** using a **drag-and-drop** interface. The app categorizes tasks into **To-Do, In Progress, and Done**, ensuring **real-time updates** and **persistent storage with MongoDB**. Only **authenticated users** can access the app using **Firebase Authentication**.

---

## 🌍 Live Links

- 🔗 **Live Demo:** [https://taskflow-e64ba.web.app/]

---

## 📦 Dependencies

The project uses the following dependencies:

```json
"dependencies": {
    "@hello-pangea/dnd": "^18.0.1",
    "@tanstack/react-query": "^5.66.8",
    "axios": "^1.7.9",
    "date-fns": "^4.1.0",
    "firebase": "^11.3.1",
    "localforage": "^1.10.0",
    "lucide-react": "^0.475.0",
    "match-sorter": "^8.0.0",
    "moment": "^2.30.1",
    "react": "^19.0.0",
    "react-dom": "^19.0.0",
    "react-hot-toast": "^2.5.2",
    "react-icons": "^5.5.0",
    "react-router-dom": "^7.2.0",
    "sort-by": "^1.2.0",
    "sweetalert2": "^11.17.2"
}
```

---

## 🚀 Technologies Used

### 🎨 Frontend:

- ⚛️ React.js (Vite)
- 🔥 Firebase Authentication
- 📌 @hello-pangea/dnd (Drag-and-Drop Library)
- 🛤 React Router
- 🎨 Tailwind CSS
- 🔗 Axios (for API calls)
- 🍞 React Hot Toast (for notifications)
- 📅 Date-fns & Moment.js (for date handling)
- 🎨 Lucide-react & React Icons (for UI icons)
- ⚡ React Query (for efficient data fetching)

### 🛠 Backend:

- 🟢 Node.js
- 🚀 Express.js
- 🍃 MongoDB
- 🔓 CORS
- 🔑 Dotenv

### 📦 Deployment:

- 🌐 **Frontend**: Firebase
- 🏗 **Backend**: Vercel

---

## 🛠 Installation Steps

### 🎨 Frontend Setup:

1. Clone the frontend repository:

   ```sh
   git clone [Insert Frontend Repo Link]
   cd frontend
   ```

2. Install dependencies:

   ```sh
   npm install
   ```

3. Set up environment variables (`.env` file):

   ```plaintext
   VITE_FIREBASE_API_KEY=your_firebase_api_key
   VITE_FIREBASE_AUTH_DOMAIN=your_firebase_auth_domain
   VITE_FIREBASE_PROJECT_ID=your_firebase_project_id
   VITE_BACKEND_URL=https://task-flow-server-pied.vercel.app
   ```

4. Start the development server:

   ```sh
   npm run dev
   ```

### 🛠 Backend Setup:

1. Clone the backend repository:

   ```sh
   git clone [Insert Backend Repo Link]
   cd backend
   ```

2. Install dependencies:

   ```sh
   npm install
   ```

3. Set up environment variables (`.env` file):

   ```plaintext
   MONGO_URI=your_mongodb_connection_string
   PORT=5000
   JWT_SECRET=your_jwt_secret
   ```

4. Start the backend server:

   ```sh
   nodemon index.js
   ```

---

## 🌟 Features

✅ **User Authentication**: Secure login with Firebase Authentication (Google Sign-In).  
📝 **Task Management**: Add, edit, delete, and reorder tasks.  
🎯 **Drag-and-Drop Functionality**: Move tasks between categories and reorder them.  
⚡ **Real-Time Updates**: Tasks persist and update instantly.  
📱 **Mobile-Responsive UI**: Smooth experience on both desktop and mobile.  
🌙 **Optional Enhancements**: Dark mode, task due dates, and activity logs.

---

## 🤝 Contributing

Contributions are welcome! 🚀  
Feel free to fork the repository and submit pull requests with improvements or bug fixes.

---

## 💡 Developed By

Developed with ❤️ by **Nure Alam** 🚀
