import "./DeleteConfirmationModal.css";


export default function MealplanModal({
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
        <p>Starting a new mealplan will delete this one. Are you sure?</p>
        <div className="modal-buttons">
          <button className="button-primary" onClick={onConfirm}>Yes</button>
          <button className="button-primary button-outline-teal"onClick={onClose}>Cancel</button>
        </div>
      </div>
    </div>
  );
}
