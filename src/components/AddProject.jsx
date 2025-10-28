import Input from "./Input";
import Button from "./Button";
import { useRef } from "react";
import { nanoid } from "nanoid";
export default function AddProject({ handleSaveProject }) {
  const form = useRef();

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
    handleSaveProject(data);
  }
  function cancelProject() {
    console.log("Cancel Project");
  }

  return (
    <section>
      <h1>New Project</h1>
      <form ref={form}>
        <Input label="Title" id="title" />
        <Input type="date" label="Deadline" id="deadline" ref={undefined} />
        <Input
          isTextArea={true}
          label="Description"
          id="description"
          ref={undefined}
        />
        <Button label="Save" handleClick={saveProject}/>
        <Button label="Cancel" handleClick={cancelProject}/>
      </form>
    </section>
  );
}
