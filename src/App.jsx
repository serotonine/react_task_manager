import { useTaskManager } from "./store/task-manager-context";
import Header from "./components/Header.jsx";
import SideBar from "./components/SideBar";
import NoProject from "./components/NoProject";
import AddProject from "./components/AddProject";
import Project from "./components/Project";

function App() {
  // useContext(TaskManagerContext).
  const tmCtx = useTaskManager();
  
  return (
      <div className="main-content lg:h-lvh flex flex-col">
        <Header />
        <div className="main-content__wrapper flex flex-col lg:flex-row max-lg:pb-6 lg:py-12 flex-1 lg:w-[900px] lg:m-auto">
          <SideBar
            createProject={() => tmCtx.switchComponentDisplay(1)}
            selectedProject={tmCtx.selectedProject}
          />
          <main className="px-6 xs:px-16 max-lg:mt-6 lg:pr-0 lg:pl-6 flex-1">
            {tmCtx.componentDisplay == 0 && (
              <NoProject createProject={() => tmCtx.switchComponentDisplay(1)} />
            )}
            {tmCtx.componentDisplay == 1 && (
              <AddProject/>
            )}
            {tmCtx.componentDisplay == 2 && (
              <Project/>
            )}
          </main>
        </div>
      </div>
  );
}

export default App;
