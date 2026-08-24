import { useTaskManager } from "../store/task-manager-context";
import Button from "./Button";

export default function SidebarProjectItem({ project, selectedProject }) {
  const { selectProject, deleteProject } = useTaskManager();
  const active =
    selectedProject && project.id == selectedProject.id ? true : false;

  return (
    <div
      key={project.id}
      onClick={() => selectProject(project.id)}
      data-cta={project.id}
      className={`sidebar__project group ${active ? "active" : ""}`}
    >
      <p>
        <span
          className={`h-2 w-2 rounded-full inline-block mr-2 ${active ? "bg-orange-300" : "bg-orange-100 group-hover:bg-orange-200"} `}
        ></span>
        <a className="inline-block py-3" data-cta={project.id} href="#">
          {project.title}
        </a>
      </p>
      {active && (
        <Button
          label="Delete"
          btnClass="btn-red btn-small max-lg:hidden"
          handleClick={(e) => {
            e.stopPropagation();
            deleteProject(project.id);
          }}
          id={undefined}
        />
      )}
    </div>
  );
}
