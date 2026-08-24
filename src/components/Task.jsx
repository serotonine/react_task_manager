import "../styles/task.css";
import { useTaskManager } from "../store/task-manager-context";
import Button from "./Button";

export default function Task({ label, id }) {
  // TaskManagerContext.
  const { deleteTask } = useTaskManager();
  return (
    <li className="task">
      <p>{label}</p>{" "}
      <Button
        btnClass="btn-red btn-small"
        label="Delete"
        handleClick={() => deleteTask(id)}
      />
    </li>
  );
}
