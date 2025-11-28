import React, { useEffect, useState, useRef } from 'react';
import './index.css';
import { hashPassword } from './utils/hash';
import { STORAGE, load, save } from './utils/storage';

import Landing from './components/Landing';
import Login from './components/Login';
import Register from './components/Register';
import Dashboard from './components/Dashboard';

export default function App() {
  const [users, setUsers] = useState(() => load(STORAGE.USERS) || []);
  const [currentUser, setCurrentUser] = useState(() => {
    const sess = load(STORAGE.SESSION);
    if (sess && sess.username && sess.remember) {
      const u = (load(STORAGE.USERS) || []).find(x => x.username === sess.username);
      return u || null;
    }
    return null;
  });
  const [rememberMe, setRememberMe] = useState(false);
  const [tasks, setTasks] = useState(() => load(STORAGE.TASKS) || []);
  const [filterStatus, setFilterStatus] = useState('all');
  const [sortBy, setSortBy] = useState('date');
  const [page, setPage] = useState(currentUser ? 'dashboard' : 'landing');
  const [modalOpen, setModalOpen] = useState(false);
  const [deleteId, setDeleteId] = useState(null);
  const [editingTask, setEditingTask] = useState(null);
  const loginUserRef = useRef();
  const loginPassRef = useRef();
  const [now, setNow] = useState(new Date());

  // --- Effects ---
  useEffect(() => { const t = setInterval(() => setNow(new Date()), 1000); return () => clearInterval(t); }, []);
  useEffect(() => save(STORAGE.USERS, users), [users]);
  useEffect(() => save(STORAGE.TASKS, tasks), [tasks]);
  useEffect(() => {
    if (currentUser) {
      if (rememberMe) save(STORAGE.SESSION, { username: currentUser.username, remember: true });
    } else {
      localStorage.removeItem(STORAGE.SESSION);
    }
  }, [currentUser, rememberMe]);

  // --- Derived ---
  const userTasks = tasks.filter(t => currentUser ? t.userId === currentUser.username : false);
  const total = userTasks.length;
  const completed = userTasks.filter(t => t.completed).length;
  const pending = total - completed;

  let shownTasks = [...userTasks];
  if (filterStatus === 'completed') shownTasks = shownTasks.filter(t => t.completed);
  if (filterStatus === 'pending') shownTasks = shownTasks.filter(t => !t.completed);
  if (sortBy === 'date') shownTasks.sort((a, b) => new Date(a.dueDate) - new Date(b.dueDate));
  if (sortBy === 'priority') {
    const order = { high: 0, medium: 1, low: 2 };
    shownTasks.sort((a, b) => (order[a.priority] || 3) - (order[b.priority] || 3));
  }
  if (sortBy === 'title') shownTasks.sort((a, b) => a.title.localeCompare(b.title));

  // --- Auth Handlers ---
  async function handleRegister(e) {
    e.preventDefault();
    const form = e.target;
    const username = form.username.value.trim();
    const email = form.email.value.trim();
    const password = form.password.value;
    if (!username || username.length < 3) return alert('Username at least 3 chars');
    if (!email.includes('@')) return alert('Valid email required');
    if (password.length < 6) return alert('Password at least 6 chars');
    if (users.some(u => u.username.toLowerCase() === username.toLowerCase())) return alert('Username exists');

    const hash = await hashPassword(password);
    const newUser = { username, email, passwordHash: hash, createdAt: Date.now() };
    const next = [...users, newUser];
    setUsers(next);
    setCurrentUser(newUser);
    setRememberMe(true);
    save(STORAGE.SESSION, { username, remember: true });
    setPage('dashboard');
  }

  async function handleLogin(e) {
    e.preventDefault();
    const username = loginUserRef.current.value.trim();
    const password = loginPassRef.current.value;
    if (!username || !password) return alert('Enter credentials');
    const user = users.find(u => u.username === username);
    if (!user) return alert('Invalid username or password');
    const hash = await hashPassword(password);
    if (hash !== user.passwordHash) return alert('Invalid username or password');

    setCurrentUser(user);
    if (rememberMe) save(STORAGE.SESSION, { username: user.username, remember: true });
    setPage('dashboard');
    loginUserRef.current.value = ''; loginPassRef.current.value = '';
  }

  function handleLogout() {
    setCurrentUser(null);
    setPage('landing');
    localStorage.removeItem(STORAGE.SESSION);
  }

  // --- Task Handlers ---
  function openNewTask() { setEditingTask(null); setModalOpen(true); }
  function openEditTask(t) { setEditingTask(t); setModalOpen(true); }
  function closeModal() { setModalOpen(false); setEditingTask(null); }

  function handleTaskSubmit(e) {
    e.preventDefault();
    if (!currentUser) return alert('Login required');
    const form = e.target;
    const id = form.taskId.value;
    const title = form.title.value.trim();
    const description = form.description.value.trim();
    const dueDate = form.dueDate.value;
    const priority = form.priority.value;
    if (!title) return alert('Title required');

    if (id) {
      const next = tasks.map(t => t.id === id ? { ...t, title, description, dueDate, priority } : t);
      setTasks(next);
    } else {
      const newTask = { id: Date.now().toString(36), userId: currentUser.username, title, description, dueDate, priority, completed: false, createdAt: Date.now() };
      setTasks(prev => [...prev, newTask]);
    }
    closeModal();
  }

  function toggleComplete(id) { setTasks(prev => prev.map(t => t.id === id ? { ...t, completed: !t.completed } : t)); }
  function handleDeleteConfirm() { if (!deleteId) return; setTasks(prev => prev.filter(t => t.id !== deleteId)); setDeleteId(null); }

  function exportTasks() {
    if (!currentUser) return alert('Login required');
    const data = tasks.filter(t => t.userId === currentUser.username);
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a'); a.href = url; a.download = `${currentUser.username}-tasks.json`; a.click(); URL.revokeObjectURL(url);
  }

  function importTasksFile(file) {
    if (!file) return;
    const reader = new FileReader();
    reader.onload = ev => {
      try {
        const parsed = JSON.parse(ev.target.result);
        if (!Array.isArray(parsed)) throw new Error('Invalid file');
        const cleaned = parsed.map(t => ({
          id: t.id || Date.now().toString(36),
          userId: currentUser.username,
          title: t.title || 'Untitled',
          description: t.description || '',
          dueDate: t.dueDate || '',
          priority: t.priority || 'medium',
          completed: !!t.completed,
          createdAt: t.createdAt || Date.now()
        }));
        const others = tasks.filter(t => t.userId !== currentUser.username);
        setTasks(others.concat(cleaned));
        alert('Import successful');
      } catch (err) { alert('Import failed: ' + err.message); }
    };
    reader.readAsText(file);
  }

  // --- Render ---
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 text-gray-800 p-4">
      {page === 'landing' && <Landing setPage={setPage} />}
      {page === 'login' && <Login handleLogin={handleLogin} loginUserRef={loginUserRef} loginPassRef={loginPassRef} rememberMe={rememberMe} setRememberMe={setRememberMe} setPage={setPage} />}
      {page === 'register' && <Register handleRegister={handleRegister} setPage={setPage} />}
      {page === 'dashboard' && currentUser && (
        <Dashboard
          currentUser={currentUser} total={total} completed={completed} pending={pending} shownTasks={shownTasks}
          toggleComplete={toggleComplete} openNewTask={openNewTask} openEditTask={openEditTask}
          modalOpen={modalOpen} closeModal={closeModal} handleTaskSubmit={handleTaskSubmit} editingTask={editingTask}
          deleteId={deleteId} setDeleteId={setDeleteId} handleDeleteConfirm={handleDeleteConfirm}
          exportTasks={exportTasks} importTasksFile={importTasksFile} filterStatus={filterStatus} setFilterStatus={setFilterStatus}
          sortBy={sortBy} setSortBy={setSortBy} handleLogout={handleLogout} now={now}
        />
      )}
    </div>
  );
}
