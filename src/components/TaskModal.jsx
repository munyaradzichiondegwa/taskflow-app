export default function TaskModal({ modalOpen, closeModal, handleTaskSubmit, editingTask }) {
    if (!modalOpen) return null;
    return (
      <div className="modal" onClick={e => { if (e.target.classList.contains('modal')) closeModal(); }}>
        <div className="modal-card">
          <h3>{editingTask ? 'Edit Task' : 'New Task'}</h3>
          <form onSubmit={handleTaskSubmit}>
            <input type="hidden" name="taskId" defaultValue={editingTask?.id || ''}/>
            <label>Title<input name="title" defaultValue={editingTask?.title || ''} required /></label>
            <label>Description<textarea name="description" defaultValue={editingTask?.description || ''}></textarea></label>
            <div className="grid">
              <label>Due Date<input name="dueDate" type="date" defaultValue={editingTask?.dueDate || ''} min={new Date().toISOString().split('T')[0]} /></label>
              <label>Priority<select name="priority" defaultValue={editingTask?.priority || 'medium'}>
                <option value="low">Low</option>
                <option value="medium">Medium</option>
                <option value="high">High</option>
              </select></label>
            </div>
            <div className="row">
              <button type="submit">Save Task</button>
              <button type="button" onClick={closeModal} className="ghost">Cancel</button>
            </div>
          </form>
        </div>
      </div>
    );
  }
  