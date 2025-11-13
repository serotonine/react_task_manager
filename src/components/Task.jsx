import Button from "./Button";
import "../styles/task.css";
export default function Task({label, id, onDeleteTask}){

  return(
    <li className="task">
      <p>{label}</p> <Button btnClass="btn-red" label="Delete" handleClick={onDeleteTask} id={id} />
    </li>
  );
}