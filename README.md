# TaskFlow App

TaskFlow is a modern, visually polished task management web application built with **React**, **Vite**, and modular **JavaScript**. It provides a smooth way to create, organize, sort, and track tasks while offering a unique **dark glass (glassmorphism)** user interface.

All data is stored client-side using LocalStorage, making the app fast, lightweight, and offline-ready.

---

## Live Demo

**Netlify Deployment:**  
https://munya-taskflow.netlify.app/

**GitHub Repository:**  
https://github.com/munyaradzichiondegwa/taskflow-app

---

## Features

### User Authentication
- Register and log in with email and password
- Optional **Remember Me** for long-term sessions
- Client-side authentication stored in LocalStorage

### Task Management
- Create, edit, delete, and complete tasks
- Priority selection (Low, Medium, High)
- Due date assignment
- Visual priority badges
- Smooth UI animations

### Dashboard Overview
- Summary of **Total**, **Completed**, and **Pending** tasks
- Responsive layout across all devices

### Filtering & Sorting
- Filter by task status (All, Pending, Completed)
- Sort tasks by:
  - Due date
  - Title
  - Priority

### Task Import & Export
- Export all tasks as a JSON file
- Import tasks from a JSON file
- Error-checked JSON validation

### Dark Glass UI
Based on glassmorphism principles:
- Frosted panels  
- Semi-transparent backgrounds  
- Soft shadows and glow effects  
- Clean, minimalist typography  
- Smooth transitions  

---

## Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/munyaradzichiondegwa/taskflow-app.git
````

2. Install dependencies:

   ```bash
   cd taskflow-app
   npm install
   ```

3. Start the development server:

   ```bash
   npm run dev
   ```

4. Open the app in your browser:
   **[http://localhost:5173](http://localhost:5173)**

---

## Building for Production

Even though the repository does not include a committed `dist/` folder, you can generate your own production build:

```bash
npm run build
```

This will create the `dist/` directory locally, which can be deployed to:

* Netlify
* Vercel
* GitHub Pages
* Any static hosting service

---

## Project Structure

```
taskflow-app/
├── public/              # Static assets
├── src/
│   ├── components/      # Reusable UI components
│   ├── pages/           # Login, Register, Dashboard
│   ├── styles/          # Global & component styles
│   ├── utils/           # LocalStorage, import/export helpers
│   ├── App.jsx          # Main application component
│   └── main.jsx         # React entry point
├── index.html           # Root template
├── package.json         # Scripts & dependencies
└── vite.config.js       # Vite configuration
```

---

## Technologies Used

* **React**
* **Vite**
* **JavaScript**
* **CSS (custom, no frameworks)**
* **LocalStorage API**

---

## How It Works (Overview)

### Authentication

* Email and password stored in LocalStorage
* Login state handled through React state + `useEffect`

### Tasks

Each task is stored as an object:

```json
{
  "id": 123456789,
  "title": "Example Task",
  "description": "Details about this task",
  "priority": "High",
  "dueDate": "2025-11-28",
  "completed": false
}
```

### Import & Export

* JSON export via Blob (download link)
* JSON import via FileReader
* Validation protects against malformed data

---

## Contributing

Contributions are welcome!
Feel free to open issues or submit pull requests.

---

## License

This project is released under the **MIT License**.

