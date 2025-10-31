import Button from "./Button";
import NoImage from "./NoImage";

export default function NoProject({ createProject }) {
  return (
    <section>
<header className="flex justify-between items-center py-6 border-b border-b-slate-300">
        <h1 className="">No Project</h1>
        <Button
          label="New Project"
          btnClass="btn-green"
          handleClick={createProject}
        />
  
</header>
      <div className="py-6">
        <p>Please select a project or create a new one.</p>
        
      </div>
      <NoImage />
    </section>
  );
}
