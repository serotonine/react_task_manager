import Input from "./Input";
import Button from "./Button";
import Task from "./Task";
import { useRef, useState } from "react";

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
    <ul>
       { projectTasks.map((item) => (<Task key={item?.id} label={item.task} onDeleteTask={onDeleteTask} id={item?.id} />))}
    </ul>
   
  );
}

  return (
    <>
      <section>
        <h2>Tasks</h2>
        <Button label="New task" handleClick={openDialog} />
      { projectTasks && projectTasks.length > 0 ?  getTasks() : <p>No tasks.</p> }
      </section>
      <dialog ref={dialog}>
        <form ref={dialogForm}>
          <Button class="invisible" label="X" handleClick={closeDialog}/>
          <Input label="Create new task" ref={newTask}/>
          <Button label="Save" handleClick={saveTask}/>
        </form>
      </dialog>
    </>
  );
}
