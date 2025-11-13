import SideBar from "./components/SideBar";
import NoProject from "./components/NoProject";
import AddProject from "./components/AddProject";
import Project from "./components/Project";
import { useState, useEffect } from "react";
import { nanoid } from "nanoid";

function App() {
  const [componentDisplay, setComponentDisplay] = useState(undefined);
  const [projects, setProjects] = useState({
   items: [],
  });
  const [selectedProject, setSelectedProject] = useState(undefined);
  // Populate project if is localStorage.
  useEffect(() => {
    //console.log("useEffect to localStorage");
    if (projects.items.length === 0) {
      // Check localStorage.
      const saved = window.localStorage.getItem("projects");
      if (saved) {
        // console.log("localStorage.getItem(projects) exists");
        const data = JSON.parse(saved);
        // Fix React.strict mode side Effect.
        if (JSON.stringify(data) !== JSON.stringify(projects)) {
          setProjects(data);
        }
      }
    }
  }, []);

  useEffect(() => {
    // console.log("useEffect => projects", projects.items);
    if (projects.items.length === 0 || selectedProject=== undefined) {
      setComponentDisplay(0);
    } 
      window.localStorage.setItem("projects", JSON.stringify(projects));
    
  }, [projects]);

  // ========== DISPLAY MARKUP ========== //
  function switchComponentDisplay(id) {
    setComponentDisplay(id);
  }
  // ========== CRUD ========== //
  // Projects.
  /* Add Project. */
  function onAddProject(data) {
    data.tasks = [];
    setSelectedProject(data);
    setProjects((prev) => {
     const updatedProjects ={
      ...prev,
      items: [...prev.items, data]
    } 
    return updatedProjects;
    });
    switchComponentDisplay(2);
  }
  /* Cancel project */
  function onCancelProject(){
    switchComponentDisplay(0);
  }
  /* Delete project */
  function onDeleteProject(e){
    const projectId = e.target.dataset.id;
    setSelectedProject(undefined);
    switchComponentDisplay(0);
    setProjects((prev) => {
      const updatedProjects = prev.items.filter((item) => item.id !== projectId);
      return {...prev, items:[...updatedProjects]}
    })
  }

  /* Select Project. */
  function getSelectedProject(id) {
    const data = projects.items.find((item) => item.id === id);
    
    if(data){
      setSelectedProject(data);
      switchComponentDisplay(2);
    }
   
  }

  function onSelectProject(e) {
    e.preventDefault();
    getSelectedProject(e.target.dataset.cta);
  }
 // Tasks.
 /* Add Task. */
 function onAddTask(task) {
  /* Enhanced with IA. */
  // New task id.
  const id = nanoid(5);

  /* 
   * useState update is asynchronous.
   * so we have to make calculation inside the setProjects callback.
   * In oredr to be sure that both projects & selectedProject updates are synchrone.
  */

  setProjects((prev) => {
    // Select the selectedProject in the projects.item array.
    const updatedProjects = prev.items.map((project) => {
      if (project.id === selectedProject.id) {
        // Update tasks array of the selectedProject object of the projects.item array.
        const updatedProject = {
          ...project,
          tasks: [...(project.tasks || []), { id, task }], // Nice way to handle the empty array case.
        };
        // Then update first the selectedProject.
        setSelectedProject(updatedProject);
        // Map loop return if current project === selectedProject.
        return updatedProject;
      }
      // Else return project.
      return project;
    });
    // The final value. setProjects({ ...prev, items: updatedProjects });
    return { ...prev, items: updatedProjects };
  });
}

  /* Delete Task. */
  function onDeleteTask(e) {
     /* Enhanced with IA. */
  // Selected Task id.
  const taskId = e.target.dataset.id;
  /* 
   * useState update is asynchronous.
   * so we have to make calculation inside the setProjects callback.
  */
  setProjects((prev) => {
    // Loop into the current projects.
    const updatedProjects = prev.items.map((project) => {
      // Select the selected project in the projects.item array.
      if (project.id === selectedProject.id) {
        // Inside the selected project select the remaining tasks.
        const updatedTasks = project.tasks.filter((t) => t.id !== taskId);
        // Finally set the current project with new values.
        const updatedProject = { ...project, tasks: updatedTasks };
        // Then set the updated project to the selected project before updating the projects.
        setSelectedProject(updatedProject);
        // If the map loop's current project === selectProject => return updated project.
        return updatedProject;
      }
      // Else return the project.
      return project;
    });

    return { ...prev, items: updatedProjects };
  });
}

  return (
    <>
    <div className="main-content lg:h-lvh flex flex-col">
      <header className="main-header tm_header-bottom">
      <nav className="main-header__wrapper flex justify-between items-center px-[5%] pt-6">
        <div className="logo tm_flex-jb-ic gap-2">
          <figure className="h-8 w-8 bg-transparent">
            <img className="object-cover object-center" src="src/assets/logo.svg" alt="profile" />
          </figure>
          <h3>Task Manager</h3>
          </div>
         <div className="profile tm_flex-jb-ic gap-2">
          <p className="display-large"><small>Serotonine</small></p>
           <figure className=" h-8 w-8 bg-yellow-500 border border-white rounded-full overflow-hidden">
            <img className="object-cover object-center" src="src/assets/profile_ondine.svg" alt="profile" />
          </figure>
          </div>
       </nav>
    </header>
      <div className="main-content__wrapper flex flex-col lg:flex-row max-lg:pb-6 lg:py-12 flex-1 lg:w-[900px] lg:m-auto"  >
        <SideBar
          projects={projects}
          createProject={() => switchComponentDisplay(1)}
          selectProject={onSelectProject}
          selectedProject={selectedProject}
        />
        <main className="px-6 xs:px-16 max-lg:mt-6 lg:pr-0 lg:pl-6 flex-1">
          {componentDisplay == 0 && (
            <NoProject createProject={() => switchComponentDisplay(1)} />
          )}
          {componentDisplay == 1 && <AddProject 
          handleSaveProject={onAddProject}
          handleCancelProject={onCancelProject}
          />}
          {componentDisplay == 2 && (
            <Project
              project={selectedProject}
              deleteProject={onDeleteProject}
              addTask={onAddTask}
              deleteTask={onDeleteTask}
            />
          )}
      
      </main>
      </div>
    </div>
    </>
  );
}

export default App;
