import React, { useState, useEffect } from "react";

export default function Dashboard({ currentUser, handleLogout, now }) {
  // --- Task State ---
  const [tasks, setTasks] = useState([]);
  const [shownTasks, setShownTasks] = useState([]);
  const [deleteId, setDeleteId] = useState(null);

  // --- Modal/Form State ---
  const [modalOpen, setModalOpen] = useState(false);
  const [editingTask, setEditingTask] = useState(null);

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [dueDate, setDueDate] = useState("");
  const [priority, setPriority] = useState("medium");

  // --- Filter & Sort ---
  const [filterStatus, setFilterStatus] = useState("all");
  const [sortBy, setSortBy] = useState("date");

  // --- Load tasks from localStorage ---
  useEffect(() => {
    const stored = localStorage.getItem("tasks");
    if (stored) {
      try {
        setTasks(JSON.parse(stored));
      } catch {}
    }
  }, []);

  // --- Save tasks to localStorage whenever tasks change ---
  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }, [tasks]);

  // --- Derived Stats ---
  const total = tasks.length;
  const completed = tasks.filter(t => t.completed).length;
  const pending = total - completed;

  // --- Update shownTasks when tasks, filter, or sort changes ---
  useEffect(() => {
    let filtered = [...tasks];
    if (filterStatus === "completed") filtered = filtered.filter(t => t.completed);
    if (filterStatus === "pending") filtered = filtered.filter(t => !t.completed);

    if (sortBy === "date") filtered.sort((a, b) => new Date(a.dueDate || 0) - new Date(b.dueDate || 0));
    if (sortBy === "priority") filtered.sort((a, b) => ({ high: 0, medium: 1, low: 2 }[a.priority] - { high: 0, medium: 1, low: 2 }[b.priority]));
    if (sortBy === "title") filtered.sort((a, b) => a.title.localeCompare(b.title));

    setShownTasks(filtered);
  }, [tasks, filterStatus, sortBy]);

  // --- Handlers ---
  const openNewTask = () => {
    setEditingTask(null);
    setTitle("");
    setDescription("");
    setDueDate("");
    setPriority("medium");
    setModalOpen(true);
  };

  const openEditTask = (task) => {
    setEditingTask(task);
    setTitle(task.title);
    setDescription(task.description);
    setDueDate(task.dueDate);
    setPriority(task.priority);
    setModalOpen(true);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!title.trim()) return;

    const taskData = {
      id: editingTask?.id || Date.now(),
      title: title.trim(),
      description,
      dueDate,
      priority,
      completed: editingTask?.completed || false,
    };

    setTasks(prev => {
      const exists = prev.find(t => t.id === taskData.id);
      if (exists) return prev.map(t => t.id === taskData.id ? taskData : t);
      return [...prev, taskData];
    });

    setModalOpen(false);
  };

  const toggleComplete = (id) => {
    setTasks(prev => prev.map(t => t.id === id ? { ...t, completed: !t.completed } : t));
  };

  const handleDeleteConfirm = () => {
    setTasks(prev => prev.filter(t => t.id !== deleteId));
    setDeleteId(null);
  };

  const handleExport = () => {
    const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(tasks));
    const a = document.createElement("a");
    a.href = dataStr;
    a.download = "tasks.json";
    a.click();
  };

  const handleImport = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (ev) => {
      try {
        const imported = JSON.parse(ev.target.result);
        if (Array.isArray(imported)) setTasks(imported);
      } catch (err) {
        alert("Invalid JSON file");
      }
    };
    reader.readAsText(file);
  };

  return (
    <div className="w-full max-w-5xl bg-white shadow-md rounded-lg p-6 flex flex-col gap-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">
          Dashboard — {currentUser?.username || 'User'}
        </h1>
        <div className="flex gap-4 items-center">
          <span className="text-sm text-gray-500">{now?.toLocaleString?.() ?? ''}</span>
          <button onClick={handleLogout} className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600">
            Logout
          </button>
        </div>
      </div>

      {/* Stats */}
      <div className="flex gap-4 text-center">
        <div className="flex-1 bg-blue-100 p-4 rounded shadow">
          <p className="font-semibold">Total Tasks</p>
          <p className="text-xl">{total}</p>
        </div>
        <div className="flex-1 bg-green-100 p-4 rounded shadow">
          <p className="font-semibold">Completed</p>
          <p className="text-xl">{completed}</p>
        </div>
        <div className="flex-1 bg-yellow-100 p-4 rounded shadow">
          <p className="font-semibold">Pending</p>
          <p className="text-xl">{pending}</p>
        </div>
      </div>

      {/* Controls */}
      {tasks.length > 0 && (
        <div className="flex flex-wrap gap-3 items-center">
          <button onClick={openNewTask} className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600">New Task</button>
          <button onClick={handleExport} className="px-4 py-2 bg-teal-500 text-white rounded hover:bg-teal-600">Export Tasks</button>
          <label className="px-4 py-2 bg-teal-500 text-white rounded hover:bg-teal-600 cursor-pointer">
            Import Tasks
            <input type="file" accept=".json" className="hidden" onChange={handleImport}/>
          </label>
          <select value={filterStatus} onChange={e => setFilterStatus(e.target.value)} className="border rounded px-2 py-1">
            <option value="all">All</option>
            <option value="completed">Completed</option>
            <option value="pending">Pending</option>
          </select>
          <select value={sortBy} onChange={e => setSortBy(e.target.value)} className="border rounded px-2 py-1">
            <option value="date">By Date</option>
            <option value="priority">By Priority</option>
            <option value="title">By Title</option>
          </select>
        </div>
      )}

      {/* Task List */}
      <div className="mt-4 grid gap-4">
        {tasks.length === 0 ? (
          <div className="text-center">
            <p className="text-gray-500 mb-4">No tasks yet. Please add a task.</p>
            <button onClick={openNewTask} className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600">
              Add Your First Task
            </button>
          </div>
        ) : (
          shownTasks.map(task => (
            <div key={task.id} className="flex justify-between items-center p-4 bg-gray-50 rounded shadow hover:bg-gray-100">
              <div>
                <h2 className={`font-semibold ${task.completed ? 'line-through text-gray-400' : ''}`}>{task.title}</h2>
                <p className="text-sm text-gray-600">{task.description}</p>
                <p className="text-xs text-gray-500">Due: {task.dueDate || 'N/A'} | Priority: {task.priority || 'medium'}</p>
              </div>
              <div className="flex gap-2 items-center">
                <button onClick={() => toggleComplete(task.id)} className={`px-2 py-1 rounded ${task.completed ? 'bg-green-400 hover:bg-green-500' : 'bg-gray-300 hover:bg-gray-400'}`}>
                  {task.completed ? 'Completed' : 'Mark Done'}
                </button>
                <button onClick={() => openEditTask(task)} className="bg-blue-400 hover:bg-blue-500 text-white px-2 py-1 rounded">Edit</button>
                <button onClick={() => setDeleteId(task.id)} className="bg-red-400 hover:bg-red-500 text-white px-2 py-1 rounded">Delete</button>
              </div>
            </div>
          ))
        )}
      </div>

      {/* Delete Confirmation */}
      {deleteId && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded shadow-md">
            <p>Are you sure you want to delete this task?</p>
            <div className="flex justify-end gap-2 mt-4">
              <button onClick={() => setDeleteId(null)} className="px-3 py-1 rounded bg-gray-300 hover:bg-gray-400">Cancel</button>
              <button onClick={handleDeleteConfirm} className="px-3 py-1 rounded bg-red-500 hover:bg-red-600 text-white">Delete</button>
            </div>
          </div>
        </div>
      )}

      {/* Modal Form */}
      {modalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white p-6 rounded shadow w-96">
            <h3 className="text-xl font-bold mb-4">{editingTask ? "Edit Task" : "Add Your First Task"}</h3>
            <form onSubmit={handleSubmit} className="flex flex-col gap-3">
              <label className="flex flex-col">
                Title
                <input value={title} onChange={e => setTitle(e.target.value)} required className="border px-2 py-1 rounded mt-1"/>
              </label>
              <label className="flex flex-col">
                Description
                <textarea value={description} onChange={e => setDescription(e.target.value)} className="border px-2 py-1 rounded mt-1"/>
              </label>
              <div className="grid grid-cols-2 gap-3">
                <label className="flex flex-col">
                  Due Date
                  <input type="date" value={dueDate} onChange={e => setDueDate(e.target.value)} min={new Date().toISOString().split("T")[0]} className="border px-2 py-1 rounded mt-1"/>
                </label>
                <label className="flex flex-col">
                  Priority
                  <select value={priority} onChange={e => setPriority(e.target.value)} className="border px-2 py-1 rounded mt-1">
                    <option value="low">Low</option>
                    <option value="medium">Medium</option>
                    <option value="high">High</option>
                  </select>
                </label>
              </div>
              <div className="flex justify-end gap-2 mt-4">
                <button type="button" onClick={() => setModalOpen(false)} className="px-3 py-1 rounded border">Cancel</button>
                <button type="submit" className="px-3 py-1 rounded bg-blue-500 text-white">{editingTask ? "Save Task" : "Add Task"}</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
