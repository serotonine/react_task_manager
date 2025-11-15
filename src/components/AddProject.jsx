import {TaskManagerContext} from "../store/task-manager-context.jsx";
import Input from "./Input";
import Button from "./Button";
import { useRef, useContext } from "react";
import { nanoid } from "nanoid";
export default function AddProject() {
  const form = useRef();
  const { addProject, switchComponentDisplay } = useContext(TaskManagerContext);

  // Events.
  function saveProject(e) {
    e.preventDefault();
    let data = {};
    for (const element of form.current.elements) {
      if (element.tagName === "BUTTON") {
        continue;
      }
      if (!element.value) {
        throw new Error(`All inputs are required`);
      }
      data = {
        ...data,
        id: nanoid(8),
        [element.id]: element.value,
      };
    }
    addProject(data);
  }
  
  function cancelProject(e) {
    e.preventDefault();
    form.current.reset();
    switchComponentDisplay(0);
 }

  return (
    <section>
      <h1 className="tm_header-bottom mb-6">New Project</h1>
      <form ref={form} className="lg:max-w-fit">
        <div className="pb-4">
          <Input label="Name" id="title" />
          <Input type="date" label="Deadline" id="deadline" ref={undefined} />
          <Input
            isTextArea={true}
            label="Description"
            id="description"
            ref={undefined}
          />
        </div>
        <div className="flex justify-end gap-4">
          <Button btnClass="btn-green" label="Save" handleClick={saveProject}/>
          <Button btnClass="btn-neutral" label="Cancel" handleClick={cancelProject}/>
        </div>
      </form>
    </section>
  );
}
