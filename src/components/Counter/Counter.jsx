import { useState } from "react";
import Button from "../Button/Button";

export default function Counter () {
  const [count, setCount] = useState(2);

  const handleIncrement = () => {
    if (count < 4) {
      setCount(count + 1);
    }
  };

  const handleDecrement = () => {
    if (count > 1) {
      setCount(count - 1);
    }
  };

  return (
    <>
      <Button text="-" onClick={handleDecrement}/>
      <span>{count}</span>
      <Button text="+" onClick={handleIncrement}/>
    </>
  );
}