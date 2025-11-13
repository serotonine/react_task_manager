
import "../styles/button.css";

export default function Button({label, btnClass, handleClick, id:dataId}){
  let classes = `btn ${btnClass}`;
  return(
    <button data-id={dataId} className={classes} onClick={handleClick} >{label ? label:""}</button>
  );
}