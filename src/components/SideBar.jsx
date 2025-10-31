import Button from "./Button";
export default function SideBar({projects, selectedProject, createProject, selectProject}) {
  const { items } = projects;
  
  return (
    <aside className="bg-transparent pr-6 border-r border-r-slate-300 lg:min-w-72">
      <header className="flex justify-between pl-3 pb-6 items-center border-b border-b-slate-300">
        <h2>Projects</h2>
        <Button
        label="New Project"
        btnClass="btn-green"
        handleClick={createProject}
      />
      </header>
      
      {items.map((project)=> {
        const active = (selectedProject && project.id == selectedProject.id) ? true : false;
        const activeClasses = active ? "bg-white text-inherit" : "text-slate-600";
        return (
        <p key={project.id} onClick={selectProject} data-cta={project.id} className={`pl-3 border-b border-b-slate-300  transition-colors hover:bg-white hover:text-inherit cursor-pointer ${activeClasses}`}>
          <span className={`h-2 w-2 rounded-full bg-orange-300 inline-block mr-2`}></span>
          <a className="inline-block py-3" data-cta={project.id} href="#" >{project.title}</a>
        </p>
      )
      })}
     
    
    </aside>
  );
}
