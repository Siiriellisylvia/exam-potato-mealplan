import "./Counter.css";
export default function Counter({ value, onChange }) {

    const handleDecrement = () => {
      if (value > 1) {
        onChange(value - 1);
      }
    };

    const handleIncrement = () => {
      if (value < 6) {
        onChange(value + 1);
      }
    };

    return (
      <section className="servingSize">
        <button type="button" className="button-rounded material-symbols-rounded" onClick={handleDecrement}>Remove</button>
        <span>{value} servings</span>
        <button type="button" className="button-rounded material-symbols-rounded" onClick={handleIncrement}>Add</button>
      </section>
    );

}
