import Button from "./Button";
import Image from "./Image";

export default function NoProject({ createProject }) {
  return (
    <section className="flex flex-col h-full">
<header className="tm_flex-jb-ic tm_header-bottom pb-6">
        <h1 className="">No Project</h1>
        <Button
          label="Create Project"
          btnClass="btn-green display-large"
          handleClick={createProject}
        />
</header>
      <div className="py-6">
        <p>Please select a project or create a new one.</p>
      </div>
      <Image />
    </section>
  );
}
