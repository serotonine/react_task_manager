import Tasks from "./Tasks";
import Button from "./Button";
export default function Project({project, deleteProject, addTask, deleteTask}){
  
  const {id,title, deadline, description, tasks} = project;
  
  return(
    <article>
      <header>
        <h1>{title}</h1>
        <Button
        label="Delete project"
        handleClick={deleteProject}
        id={id}
         />
      </header>
      <h4>{deadline}</h4>
      <p>{description}</p>
      <Tasks 
        projectTasks={tasks} 
        addTask={addTask}
        onDeleteTask={deleteTask}
      />
    </article>
  );
}
