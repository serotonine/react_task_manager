import "../styles/dialog-tasks.css";
import { useTaskManager } from "../store/task-manager-context";
import Input from "./Input";
import Button from "./Button";
import Task from "./Task";
import { useRef } from "react";
import Image from "./Image";

export default function Tasks({projectTasks, }){
const newTask = useRef();
const dialog = useRef();
const dialogForm = useRef();
// useContext(TaskManagerContext).
  const {addTask, deleteTask } = useTaskManager();
// Event.
function closeDialog(){
  dialog.current.close();
}
function openDialog(){
  dialog.current.showModal();
}
function saveTask(e){
  e.preventDefault();
  addTask(newTask.current.value);
  closeDialog();
  dialogForm.current.reset();
}
// Markup.
function getTasks(){
  return (
    <ul className="space-y-6">
       { projectTasks.map((item) => (<Task key={item?.id} label={item.task} onDeleteTask={deleteTask} id={item?.id} />))}
    </ul>
   
  );
}

  return (
    <>
      <section className="flex flex-col h-full pt-6 flex-1">
       <header className="pb-3 mb-6 flex justify-between items-end border-b border-b-slate-300">
          { projectTasks && projectTasks.length > 0 ? <h2>Tasks</h2>: <h2>No Tasks</h2> }
          <Button btnClass="btn-green" label="Create task" handleClick={openDialog} />
       </header>
      { projectTasks && projectTasks.length > 0 ?  getTasks() : <Image/> }
      </section>
      <dialog className="tasks__dialog" ref={dialog}>
        <Button btnClass="btn-close" label="X" handleClick={closeDialog}/>
        <h2>Create Task</h2>
        <form ref={dialogForm} className="flex flex-col gap-4 items-end">
          <Input label="Description" ref={newTask}/>
          <Button btnClass="btn-green"label="Save" handleClick={saveTask}/>
        </form>
      </dialog>
    </>
  );
}
