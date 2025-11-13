import { forwardRef } from "react";
import "../styles/input.css";
const Input = forwardRef(function Input(
  { id, label, isTextArea=false, type = "text" },
  ref
) {
  return (
    <div className="mt-4">
      <label htmlFor={id}>
        {label}
      </label>
      {isTextArea ? (
        <textarea className="tm_textarea" name={id} id={id} ref={ref} rows="4" cols="50" required  ></textarea>
      ) : (
        <input className="tm_input" type={type} name={id} id={id} ref={ref} required autoComplete="on"/>
      )}
    </div>
  );
});

export default Input;
