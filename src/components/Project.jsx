import Tasks from "./Tasks";
import Button from "./Button";
export default function Project({project, deleteProject, addTask, deleteTask}){
  
  const {id,title, deadline, description, tasks} = project;
  
  return(
    <article>
      <header className="pb-3">
         <Button
        label="Delete project"
        handleClick={deleteProject}
        id={id}
         />
        <h1 className="pt-6 pb-3">{title}</h1>
        <hr className="w-28 border-2 border-orange-300"/>   
      </header>
      <p className="max-w-[45ch] leading-7">{description}</p>
      <p  className="pt-3" >
        <span className={`h-2 w-2 rounded-full bg-orange-300 inline-block mr-2`}></span>
        <span>Deadline: {deadline}</span>
      </p>
      <Tasks 
        projectTasks={tasks} 
        addTask={addTask}
        onDeleteTask={deleteTask}
      />
    </article>
  );
}
