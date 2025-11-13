import Button from "./Button";
import { useState } from "react";
import "../styles/sidebar.css"
export default function SideBar({projects, selectedProject, createProject, selectProject}) {
  const { items } = projects;
  const [viewProjects, setViewProjects] = useState(false);
  function handleViewProjects(e){
    setViewProjects(!viewProjects);
  }
  return (
    <aside className="sidebar bg-transparent max-lg:mb-6 max-lg:bg-slate-100 max-lg:pt-6 lg:pr-6 lg:border-r border-r-slate-300 lg:min-w-72">
      <header className="max-lg:justify-start max-lg:gap-3 tm_flex-jb-ic tm_header-bottom tm_padding-wrap lg:pl-3">
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
        {items.map((project)=> {
          const active = (selectedProject && project.id == selectedProject.id) ? true : false;
          const activeClasses = active ? "bg-white text-inherit" : "text-slate-600";
          return (
          <p key={project.id} onClick={selectProject} data-cta={project.id} className={`tm_padding-wrap lg:pl-2 border-b transition-colors hover:bg-white hover:text-inherit cursor-pointer ${activeClasses}`}>
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
