# TaskFlow App

**TaskFlow** is a modern, responsive task management web application. It allows users to register, log in, create, edit, and manage tasks with priority levels, due dates, and completion status. The app also supports task import/export and provides a clean, dark-glass aesthetic interface.

## Live Demo

Try the app live here: [TaskFlow App on Netlify](https://munya-taskflow.netlify.app/)  
GitHub repository: [https://github.com/munyaradzichiondegwa/taskflow-app](https://github.com/munyaradzichiondegwa/taskflow-app)

## Features

- **User Authentication**
  - Register and log in with persistent sessions
  - Remember Me functionality
- **Task Management**
  - Add, edit, delete, and mark tasks as complete
  - Filter tasks by status (all, pending, completed)
  - Sort tasks by date, title, or priority
- **Task Import/Export**
  - Export your tasks as JSON
  - Import tasks from a JSON file
- **Dashboard**
  - Overview of total, completed, and pending tasks
  - Responsive and interactive interface
- **Dark Glass UI**
  - Smooth glass-like design with modern gradients and animations

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

The app will run on `http://localhost:5173` by default.

## Build for Production

To build the app for deployment:

```bash
npm run build
```

The build output will be in the `dist` folder. You can deploy this folder to GitHub Pages or any static hosting service.

## Technologies Used

* [React](https://reactjs.org/)
* [Vite](https://vitejs.dev/)
* Vanilla CSS with modern glass/dark UI design
* LocalStorage for persistent data

## Contributing

Contributions are welcome! Feel free to submit issues or pull requests.

## License

This project is open source and available under the MIT License.


