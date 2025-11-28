export default function DeleteModal({ deleteId, setDeleteId, handleDeleteConfirm }) {
    if (!deleteId) return null;
    return (
      <div className="modal" onClick={e => { if (e.target.classList.contains('modal')) setDeleteId(null); }}>
        <div className="modal-card small">
          <h3>Delete Task?</h3>
          <p>This action cannot be undone.</p>
          <div className="row">
            <button onClick={handleDeleteConfirm} className="danger">Delete</button>
            <button onClick={() => setDeleteId(null)} className="ghost">Cancel</button>
          </div>
        </div>
      </div>
    );
  }
  