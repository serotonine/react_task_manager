import logo from "../assets/no-projects.png";
import Button from "./Button";
export default function NoProject({createProject}){
 
  return(
    <section>
      <h2 className="text-2xl">No Project</h2>
      {/* <img src={logo} alt="No project" /> */}
      <Button 
      label="Create a project" 
      btnClass="btn-positif"
      handleClick={createProject}/>
    </section>
  );
}