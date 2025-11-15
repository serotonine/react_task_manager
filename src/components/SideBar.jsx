import "../styles/sidebar.css";
import { useTaskManager } from "../store/task-manager-context";
import { useState } from "react";
import Button from "./Button";

export default function SideBar({ selectedProject, createProject}) {
  const [viewProjects, setViewProjects] = useState(false);

  // useContext(TaskManagerContext).
  const {projects , selectProject} = useTaskManager();

  // Events.
  function handleViewProjects(e){
    setViewProjects(!viewProjects);
  }
    
  return (
    <aside className="sidebar">
      <header className="sidebar__header tm_flex-jb-ic tm_header-bottom tm_padding-wrap">
        <Button
        label={undefined}
        btnClass={`btn-burger display-small ${viewProjects ? "active": null}`}
        handleClick={handleViewProjects} />
        <h2>Projects</h2>
        <Button
        label="Create Project"
        btnClass="btn-green max-xs:hidden xs:ml-auto"
        handleClick={createProject}
      />
      </header>
      
     <div className={`sidebar__projects ${viewProjects ? "active": null}`}>
        {projects.items.map((project)=> {
          const active = (selectedProject && project.id == selectedProject.id) ? true : false;
          const activeClasses = active ? "bg-white text-inherit" : "text-slate-600";

          return (
          <p key={project.id} onClick={(e) => selectProject(project.id)} data-cta={project.id} className={`sidebar__project ${activeClasses}`}>
            <span className={`h-2 w-2 rounded-full bg-orange-300 inline-block mr-2 `}></span>
            <a className="inline-block py-3" data-cta={project.id} href="#" >{project.title}</a>
          </p>
        )
        })}
        
     </div>
      <footer className="tm_padding-wrap pt-6 bg-slate-50 xs:hidden">
        <Button
          label="Create Project"
          btnClass="btn-green btn-negatif"
          handleClick={createProject}
        />
      </footer>
    </aside>
  );
}
