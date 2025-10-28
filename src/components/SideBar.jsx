import Button from "./Button";
export default function SideBar({projects, createProject, selectProject}) {
  const { items } = projects;
  //console.log("SideBar", items)

  return (
    <aside className="bg-slate-800 text-slate-100 p-6 h-lvh">
      <h1 className="text-3xl">Your projects</h1>
      {items.map((project)=> (
        <p key={project.id} onClick={selectProject}>
          <a href="#" data-cta={project.id}>{project.title}</a>
        </p>
      ))}
      <Button
        label="Create Project"
        btnClass="btn-negatif"
        handleClick={createProject}
      />
    
    </aside>
  );
}
