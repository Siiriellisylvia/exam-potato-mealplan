import Button from "../Button/Button";
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
        <Button className="button-rounded material-symbols-rounded" text="Remove" onClick={handleDecrement} />
        <span>{value} servings</span>
        <Button className="button-rounded material-symbols-rounded" text="Add" onClick={handleIncrement} />
      </section>
    );

}
