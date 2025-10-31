import { forwardRef } from "react";
import "../styles/input.css";
const Input = forwardRef(function Input(
  { id, label, isTextArea=false, type = "text" },
  ref
) {
  return (
    <div className="mt-4">
      <label htmlFor={id} className="block">
        {label}
      </label>
      {isTextArea ? (
        <textarea name={id} id={id} ref={ref} required ></textarea>
      ) : (
        <input type={type} name={id} id={id} ref={ref} required autoComplete="on"/>
      )}
    </div>
  );
});

export default Input;
