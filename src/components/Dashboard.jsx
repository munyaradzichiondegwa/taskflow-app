import React, { useState } from 'react';

export default function Dashboard({
  currentUser,
  total,
  completed,
  pending,
  shownTasks,
  toggleComplete,
  openNewTask,
  openEditTask,
  deleteId,
  setDeleteId,
  handleDeleteConfirm,
  exportTasks,
  importTasksFile,
  filterStatus,
  setFilterStatus,
  sortBy,
  setSortBy,
  handleLogout,
  now
}) {
  const [importFile, setImportFile] = useState(null);

  return (
    <div className="w-full max-w-5xl bg-white shadow-md rounded-lg p-6 flex flex-col gap-6">

      {/* Header */}
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">
          Dashboard — {currentUser?.username || 'User'}
        </h1>
        <span className="text-sm text-gray-500">{now?.toLocaleString?.() ?? ''}</span>
      </div>

      {/* Stats */}
      <div className="flex gap-4 text-center">
        <div className="flex-1 bg-blue-100 p-4 rounded shadow">
          <p className="font-semibold">Total Tasks</p>
          <p className="text-xl">{total ?? 0}</p>
        </div>
        <div className="flex-1 bg-green-100 p-4 rounded shadow">
          <p className="font-semibold">Completed</p>
          <p className="text-xl">{completed ?? 0}</p>
        </div>
        <div className="flex-1 bg-yellow-100 p-4 rounded shadow">
          <p className="font-semibold">Pending</p>
          <p className="text-xl">{pending ?? 0}</p>
        </div>
      </div>

      {/* Controls */}
      <div className="flex flex-wrap gap-3 items-center">
        <button onClick={openNewTask} className="button button-blue">
          New Task
        </button>

        <button onClick={exportTasks} className="button button-teal">
          Export Tasks
        </button>

        <label className="button button-teal cursor-pointer">
          Import Tasks
          <input
            type="file"
            accept=".json"
            className="hidden"
            onChange={e => {
              setImportFile(e.target.files[0]);
              importTasksFile(e.target.files[0]);
            }}
          />
        </label>

        <button onClick={handleLogout} className="button button-red">
          Logout
        </button>

        <select
          value={filterStatus}
          onChange={e => setFilterStatus(e.target.value)}
          className="border rounded px-2 py-1"
        >
          <option value="all">All</option>
          <option value="completed">Completed</option>
          <option value="pending">Pending</option>
        </select>

        <select
          value={sortBy}
          onChange={e => setSortBy(e.target.value)}
          className="border rounded px-2 py-1"
        >
          <option value="date">By Date</option>
          <option value="priority">By Priority</option>
          <option value="title">By Title</option>
        </select>
      </div>

      {/* Task List */}
      <div className="mt-4 grid gap-4">
        {(!shownTasks || shownTasks.length === 0) ? (
          <p className="text-gray-500 text-center">No tasks found.</p>
        ) : (
          shownTasks.map(task => (
            <div
              key={task.id}
              className="flex justify-between items-center p-4 bg-gray-50 rounded shadow hover:bg-gray-100"
            >
              <div>
                <h2 className={`font-semibold ${task.completed ? 'line-through text-gray-400' : ''}`}>
                  {task.title || 'Untitled'}
                </h2>
                <p className="text-sm text-gray-600">{task.description || ''}</p>
                <p className="text-xs text-gray-500">
                  Due: {task.dueDate || 'N/A'} | Priority: {task.priority || 'medium'}
                </p>
              </div>

              <div className="flex gap-2 items-center">
                <button
                  onClick={() => toggleComplete(task.id)}
                  className={`px-2 py-1 rounded ${task.completed ? 'bg-green-400 hover:bg-green-500' : 'bg-gray-300 hover:bg-gray-400'}`}
                >
                  {task.completed ? 'Completed' : 'Mark Done'}
                </button>

                <button
                  onClick={() => openEditTask(task)}
                  className="bg-blue-400 hover:bg-blue-500 text-white px-2 py-1 rounded"
                >
                  Edit
                </button>

                <button
                  onClick={() => setDeleteId(task.id)}
                  className="bg-red-400 hover:bg-red-500 text-white px-2 py-1 rounded"
                >
                  Delete
                </button>
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
              <button
                onClick={() => setDeleteId(null)}
                className="px-3 py-1 rounded bg-gray-300 hover:bg-gray-400"
              >
                Cancel
              </button>
              <button
                onClick={handleDeleteConfirm}
                className="px-3 py-1 rounded bg-red-500 hover:bg-red-600 text-white"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
