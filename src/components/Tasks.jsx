import "../styles/tasks.css"
import Input from "./Input";
import Button from "./Button";
import Task from "./Task";
import noImage from "./NoImage";
import { useRef, useState } from "react";
import NoImage from "./NoImage";

export default function Tasks({projectTasks, addTask, onDeleteTask }){
const newTask = useRef();
const dialog = useRef();
const dialogForm = useRef();
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
       { projectTasks.map((item) => (<Task key={item?.id} label={item.task} onDeleteTask={onDeleteTask} id={item?.id} />))}
    </ul>
   
  );
}

  return (
    <>
      <section className="pt-6">
       <header className="pb-3 mb-6 flex justify-between items-end border-b border-b-slate-300">
          { projectTasks && projectTasks.length > 0 ? <h2>Tasks</h2>: <h2>No Tasks</h2> }
          <Button label="New task" handleClick={openDialog} />
       </header>
      { projectTasks && projectTasks.length > 0 ?  getTasks() : <NoImage /> }
      </section>
      <dialog className="tasks__dialog" ref={dialog}>
        <form ref={dialogForm}>
          <Button class="invisible" label="X" handleClick={closeDialog}/>
          <Input label="Create new task" ref={newTask}/>
          <Button btnClass="croce" label="Save" handleClick={saveTask}/>
        </form>
      </dialog>
    </>
  );
}
