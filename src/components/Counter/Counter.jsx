import Button from "../Button/Button";
import "./Counter.css";
export default function Counter({ value, onChange }) {

    const handleDecrement = () => {
      if (value > 1) {
        onChange(value - 1);
      }
    };

    const handleIncrement = () => {
      if (value < 4) {
        onChange(value + 1);
      }
    };

    return (
      <section className="servingSize">
        <Button className="button-rounded" text="-" onClick={handleDecrement} />
        <span>{value} servings</span>
        <Button className="button-rounded" text="+" onClick={handleIncrement} />
      </section>
    );

}
