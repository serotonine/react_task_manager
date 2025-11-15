import React from "react";
import ReactDOM from "react-dom/client";
import TaskManagerContextProvider from "./store/task-manager-context.jsx";
import App from "./App.jsx";
import "./index.css";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <TaskManagerContextProvider>
      <App />
    </TaskManagerContextProvider>
  </React.StrictMode>
);
