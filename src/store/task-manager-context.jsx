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
    if (projects.items.length === 0) {
      // Check localStorage.
      const saved = window.localStorage.getItem("projects");
      if (saved) {
        const data = JSON.parse(saved);
        // Fix React.strict mode side Effect.
        if (JSON.stringify(data) !== JSON.stringify(projects)) {
          setProjects(data);
        }
      }
    }
  }, []);
  useEffect(() => {
    if (projects.items.length === 0 || selectedProject === undefined) {
      setComponentDisplay(0);
    }
    window.localStorage.setItem("projects", JSON.stringify(projects));
  }, [projects, selectedProject]);

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
    setSelectedProject(undefined);
    switchComponentDisplay(0);
    setProjects((prev) => {
      const updatedProjects = prev.items.filter(
        (item) => item.id !== projectId,
      );
      return { items: [...updatedProjects] };
    });
  }

  // ==== Tasks ==== //
  // Add Task.
  function addTask(task) {
    const id = nanoid(5);
    // Return the projects[] with the current project updated.
    const updatedProjects = projects.items.map((project) => {
      if (project.id === selectedProject.id) {
        return { ...project, tasks: [...project.tasks, { id, task }] };
      }
      return project;
    });
    const updatedSelected = updatedProjects.find(
      (p) => p.id === selectedProject.id,
    );
    // Update the projects[].
    setProjects({ items: updatedProjects });
    // Update the current project.
    setSelectedProject(updatedSelected);
  }

  // Delete Task.
  function deleteTask(taskId) {
    // Return the projects[] with the current project updated.
    const updatedProjects = projects.items.map((project) => {
      if (project.id === selectedProject.id) {
        return {
          ...project,
          tasks: project.tasks.filter((t) => t.id !== taskId),
        };
      }
      return project;
    });
    const updatedSelected = updatedProjects.find(
      (p) => p.id === selectedProject.id,
    );
    setProjects({ items: updatedProjects });
    setSelectedProject(updatedSelected);
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
