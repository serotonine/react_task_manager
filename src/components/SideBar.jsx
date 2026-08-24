import "../styles/sidebar.css";
import { useTaskManager } from "../store/task-manager-context";
import SidebarProjectItem from "./SidebarProjectItem";
import { useState } from "react";
import Button from "./Button";

export default function SideBar({createProject }) {
  const [viewProjects, setViewProjects] = useState(false);

  // useContext(TaskManagerContext).
  const { projects, selectProject, selectedProject} = useTaskManager();

  // Events.
  function handleViewProjects(e) {
    setViewProjects(!viewProjects);
  }
  console.log("projects.items.length", projects.items.length);

  return (
    <aside className="sidebar">
      <header className="sidebar__header tm_flex-jb-ic tm_header-bottom tm_padding-wrap">
       { projects.items.length > 0 && (<div className="display-small flex items-center">
          <Button
            label={undefined}
            btnClass={`btn-burger ${viewProjects ? "active" : null}`}
            handleClick={handleViewProjects}
          />
          <h3 className="ml-2">Projects</h3>
        </div>)}
        <h2 className="display-large">Projects</h2>
         { (projects.items.length === 0 || !selectedProject) && (
          <Button
            label="New project"
            btnClass="btn-green lg:hidden"
            handleClick={createProject}
          />
        )}
        { selectedProject && (
          <Button
            label="New project"
            btnClass="btn-green  xs:ml-auto"
            handleClick={createProject}
          />
        )}
      </header>

      <div className={`sidebar__projects ${viewProjects ? "active" : null}`}>
        {projects.items.map((project) => (
          <SidebarProjectItem
            key={project.id}
            project={project}
            selectedProject={selectedProject}
          />
        ))}
      </div>
    </aside>
  );
}
