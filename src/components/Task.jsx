import Button from "./Button";
export default function Task({label, id, onDeleteTask}){

  return(
    <li className="flex items-center w-full bg-slate-50 ">
      <p>{label}</p> <Button label="delete" handleClick={onDeleteTask} id={id} />
    </li>
  );
}