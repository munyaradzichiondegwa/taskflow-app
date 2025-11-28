import React, { useState } from 'react';

export default function Dashboard({
  currentUser, total, completed, pending, shownTasks,
  toggleComplete, openNewTask, openEditTask,
  modalOpen, closeModal, handleTaskSubmit, editingTask,
  deleteId, setDeleteId, handleDeleteConfirm,
  exportTasks, importTasksFile, filterStatus, setFilterStatus,
  sortBy, setSortBy, handleLogout, now
}) {
  const [importFile, setImportFile] = useState(null);

  return (
    <div className="w-full max-w-5xl bg-white shadow-md rounded-lg p-6 flex flex-col gap-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Dashboard — {currentUser.username}</h1>
        <div className="flex items-center gap-4">
          <span className="text-sm text-gray-500">{now.toLocaleString()}</span>
          <button
            onClick={handleLogout}
            className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded"
          >Logout</button>
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
      <div className="flex flex-wrap gap-3 items-center">
        <button
          onClick={openNewTask}
          className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded"
        >New Task</button>
        <button
          onClick={exportTasks}
          className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded"
        >Export Tasks</button>

        <label className="bg-gray-200 hover:bg-gray-300 px-4 py-2 rounded cursor-pointer">
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
        {shownTasks.length === 0 ? (
          <p className="text-gray-500 text-center">No tasks found.</p>
        ) : (
          shownTasks.map(task => (
            <div key={task.id} className="flex justify-between items-center p-4 bg-gray-50 rounded shadow hover:bg-gray-100">
              <div>
                <h2 className={`font-semibold ${task.completed ? 'line-through text-gray-400' : ''}`}>{task.title}</h2>
                <p className="text-sm text-gray-600">{task.description}</p>
                <p className="text-xs text-gray-500">Due: {task.dueDate || 'N/A'} | Priority: {task.priority}</p>
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
                >Edit</button>
                <button
                  onClick={() => setDeleteId(task.id)}
                  className="bg-red-400 hover:bg-red-500 text-white px-2 py-1 rounded"
                >Delete</button>
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

      {/* Task Modal */}
      {modalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded shadow-md w-full max-w-md">
            <h2 className="text-xl font-bold mb-4">{editingTask ? 'Edit Task' : 'New Task'}</h2>
            <form onSubmit={handleTaskSubmit} className="flex flex-col gap-2">
              <input type="hidden" name="taskId" value={editingTask?.id || ''} />
              <input
                name="title"
                defaultValue={editingTask?.title || ''}
                placeholder="Title"
                className="border rounded px-2 py-1 w-full"
              />
              <textarea
                name="description"
                defaultValue={editingTask?.description || ''}
                placeholder="Description"
                className="border rounded px-2 py-1 w-full"
              />
              <input
                type="date"
                name="dueDate"
                defaultValue={editingTask?.dueDate || ''}
                className="border rounded px-2 py-1 w-full"
              />
              <select
                name="priority"
                defaultValue={editingTask?.priority || 'medium'}
                className="border rounded px-2 py-1 w-full"
              >
                <option value="high">High</option>
                <option value="medium">Medium</option>
                <option value="low">Low</option>
              </select>
              <div className="flex justify-end gap-2 mt-2">
                <button type="button" onClick={closeModal} className="px-3 py-1 rounded bg-gray-300 hover:bg-gray-400">Cancel</button>
                <button type="submit" className="px-3 py-1 rounded bg-blue-500 hover:bg-blue-600 text-white">Save</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
