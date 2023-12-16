import "./DeleteConfirmationModal.css";


export default function DeleteConfirmationModal({
  isOpen,
  onClose,
  onConfirm,
}) {
  if (!isOpen) return null;

  return (
    <div className="modal-backdrop">
      <div className="modal">
        <button className="material-symbols-rounded" onClick={onClose}>
          close
        </button>
        <h3>Are you sure you want to delete this recipe?</h3>
        <div className="modal-buttons">
          <button className="button-primary" onClick={onConfirm}>Yes</button>
          <button className="button-primary button-outline-teal"onClick={onClose}>Cancel</button>
        </div>
      </div>
    </div>
  );
}
