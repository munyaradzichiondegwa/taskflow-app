import React, { useState, useEffect } from "react";

export default function TaskModal({ modalOpen, closeModal, handleTaskSubmit, editingTask }) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [dueDate, setDueDate] = useState("");
  const [priority, setPriority] = useState("medium");

  // Populate fields when editing, or clear for new
  useEffect(() => {
    if (editingTask) {
      setTitle(editingTask.title || "");
      setDescription(editingTask.description || "");
      setDueDate(editingTask.dueDate || "");
      setPriority(editingTask.priority || "medium");
    } else {
      setTitle("");
      setDescription("");
      setDueDate("");
      setPriority("medium");
    }
  }, [editingTask, modalOpen]);

  if (!modalOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!title.trim()) return;

    const taskData = {
      id: editingTask?.id || Date.now(), // generate id if new task
      title: title.trim(),
      description,
      dueDate,
      priority,
      completed: editingTask?.completed || false,
    };

    handleTaskSubmit(taskData);
    closeModal();
  };

  return (
    <div
      className="modal fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center"
      onClick={(e) => e.target.classList.contains("modal") && closeModal()}
    >
      <div className="modal-card bg-white p-6 rounded shadow w-96">
        <h3 className="text-xl font-bold mb-4">{editingTask ? "Edit Task" : "Add Your First Task"}</h3>
        <form onSubmit={handleSubmit} className="flex flex-col gap-3">
          <label className="flex flex-col">
            Title
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
              className="border px-2 py-1 rounded mt-1"
            />
          </label>

          <label className="flex flex-col">
            Description
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="border px-2 py-1 rounded mt-1"
            />
          </label>

          <div className="grid grid-cols-2 gap-3">
            <label className="flex flex-col">
              Due Date
              <input
                type="date"
                value={dueDate}
                onChange={(e) => setDueDate(e.target.value)}
                min={new Date().toISOString().split("T")[0]}
                className="border px-2 py-1 rounded mt-1"
              />
            </label>

            <label className="flex flex-col">
              Priority
              <select
                value={priority}
                onChange={(e) => setPriority(e.target.value)}
                className="border px-2 py-1 rounded mt-1"
              >
                <option value="low">Low</option>
                <option value="medium">Medium</option>
                <option value="high">High</option>
              </select>
            </label>
          </div>

          <div className="flex justify-end gap-2 mt-4">
            <button
              type="button"
              onClick={closeModal}
              className="px-3 py-1 rounded border"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-3 py-1 rounded bg-blue-500 text-white"
            >
              {editingTask ? "Save Task" : "Add Task"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
