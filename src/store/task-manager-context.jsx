import { createContext, useEffect, useState, useContext } from "react";
import { nanoid } from "nanoid";

// Signature Context Object.
export const TaskManagerContext = createContext({
  projects: { items: [] },
  selectedProject: undefined,
  componentDisplay: undefined,
  switchComponentDisplay: () => () => {},
  addProject: () => {},
  deleteProject: () => {},
  selectProject: () => {},
  addTask: () => {},
  deleteTask: () => {},
});

export function useTaskManager() {
  return useContext(TaskManagerContext);
}

export default function TaskManagerContextProvider({ children }) {
  // Projects.
  const [projects, setProjects] = useState({
    items: [],
  });
  // Selected project.
  const [selectedProject, setSelectedProject] = useState(undefined);
  // ComponentDisplay.
  const [componentDisplay, setComponentDisplay] = useState(0);
  function switchComponentDisplay(id) {
    setComponentDisplay(id);
  }

  // Populate project if is localStorage.
  useEffect(() => {
    //console.log("useEffect to localStorage");
    if (projects.items.length === 0) {
      // Check localStorage.
      const saved = window.localStorage.getItem("projects");
      if (saved) {
        // console.log("localStorage.getItem(projects) exists");
        const data = JSON.parse(saved);
        // Fix React.strict mode side Effect.
        if (JSON.stringify(data) !== JSON.stringify(projects)) {
          // console.log("localStorage", data);
          setProjects(data);
        }
      }
    }
  }, []);
  useEffect(() => {
    // console.log("useEffect => projects", projects.items);
    if (projects.items.length === 0 || selectedProject === undefined) {
      setComponentDisplay(0);
    }
    window.localStorage.setItem("projects", JSON.stringify(projects));
  }, [projects]);

  
  // ==== Projects ==== //

  // Select Project.
  function selectProject(id) {
    const project = projects.items.find((item) => item.id === id);
    if (project) {
      setSelectedProject(project);
      setComponentDisplay(2);
    }
  }
  // Add Project.
  function addProject(data) {
    console.log("addProject");
    data.tasks = [];
    setSelectedProject(data);
    setProjects((prev) => {
      const updatedProjects = {
        ...prev,
        items: [...prev.items, data],
      };
      return updatedProjects;
    });
    setComponentDisplay(2);
  }
  // Delete project.
  function deleteProject(projectId) {
   console.log("deleteProject: selected project", selectedProject);

    setSelectedProject(undefined);
    console.log("deleteProject: selected project", selectedProject);
    switchComponentDisplay(0);
    setProjects((prev) => {
      const updatedProjects = prev.items.filter(
        (item) => item.id !== projectId
      );
      return { items: [...updatedProjects] };
    });
  }

  // ==== Tasks ==== //
  // Add Task.
  function addTask(task) {
    /* Enhanced with IA. */
    // New task id.
    const id = nanoid(5);

    /*
     * useState update is asynchronous.
     * so we have to make calculation inside the setProjects callback.
     * In order to be sure that both projects & selectedProject updates are synchrone.
     */

    setProjects((prev) => {
      // Select the selectedProject in the projects.item array.
      const updatedProjects = prev.items.map((project) => {
        if (project.id === selectedProject.id) {
          // Update tasks array of the selectedProject object of the projects.item array.
          const updatedProject = {
            ...project,
            tasks: [...(project.tasks || []), { id, task }], // Nice way to handle the empty array case.
          };
          // Then update first the selectedProject.
          setSelectedProject(updatedProject);
          // Map loop return if current project === selectedProject.
          return updatedProject;
        }
        // Else return project.
        return project;
      });
      // The final value.
      return { items: updatedProjects };
    });
  }

  // Delete Task.
  function deleteTask(taskId) {
    /* Enhanced with IA. */
    /*
     * useState update is asynchronous.
     * so we have to make calculation inside the setProjects callback.
     */
    setProjects((prev) => {
      // Loop into the current projects.
      const updatedProjects = prev.items.map((project) => {
        // Select the selected project in the projects.item array.
        if (project.id === selectedProject.id) {
          // Inside the selected project select the remaining tasks.
          const updatedTasks = project.tasks.filter((t) => t.id !== taskId);
          // Finally set the current project with new values.
          const updatedProject = { ...project, tasks: updatedTasks };
          // Then set the updated project to the selected project before updating the projects.
          setSelectedProject(updatedProject);
          // If the map loop's current project === selectProject => return updated project.
          return updatedProject;
        }
        // Else return the project.
        return project;
      });
      return { ...prev, items: updatedProjects };
    });
  }

// ==== Populate Context Object ==== //
  const taskManagerCtx = {
    projects,
    selectedProject,
    componentDisplay,
    switchComponentDisplay,
    addProject,
    deleteProject,
    selectProject,
    addTask,
    deleteTask,
  };

  return (
    <TaskManagerContext.Provider value={taskManagerCtx}>
      {children}
    </TaskManagerContext.Provider>
  );
}
