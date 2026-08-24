import Button from "./Button";
import Image from "./Image";
import { useTaskManager } from "../store/task-manager-context";

export default function NoProject({ createProject }) {
  const {projects, selectedProject} = useTaskManager();
  const header = projects.items.length === 0 ? "No project": "No project selected";
  const body = projects.items.length === 0 ? "Please create a new project.": "Please select a project.";
  return (
    <section className="flex flex-col h-full">
<header className="tm_flex-jb-ic tm_header-bottom pb-6">
        <h1>{header}</h1>
        <Button
          label="New project"
          btnClass="btn-green display-large"
          handleClick={createProject}
        />
</header>
      <div className="py-6">
        <p>{body}</p>
      </div>
      <Image />
    </section>
  );
}
