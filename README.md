# React Task Manager 

A project and task management app built as a hands-on exercise for core React hooks: `useState`, `useRef`, `forwardRef`, `useContext`, and `useEffect`. Styled with Tailwind CSS, powered by Vite.

---

## Repository
- https://github.com/serotonine/react_task_manager
  - 3 branches: master(main),develop, build(deployment).
- https://serotonine.github.io/react_task_manager

---

## Stack

| Tool | Version | Role |
|---|---|---|
| React | 19 | UI library |
| Vite | 4 | Dev server & bundler |
| Tailwind CSS | 3 | Utility-first styling |
| nanoid | 5 | Unique ID generation |

---

## Features

- Create, select, and delete **projects**
- Add and delete **tasks** per project via a native `<dialog>` modal
- **localStorage persistence** — data survives page refresh
- Fully **responsive** layout: sidebar collapses behind a burger menu on mobile
- Conditional view rendering (no project / add project / view project)

---

## Architecture

```
main.jsx
└── TaskManagerContextProvider   ← global state
    └── App.jsx                  ← view router (componentDisplay 0|1|2)
        ├── Header.jsx           ← static nav bar
        ├── SideBar.jsx          ← project list + burger toggle
        │   └── SidebarProjectItem.jsx
        └── <main>
            ├── NoProject.jsx    ← empty state (componentDisplay === 0)
            ├── AddProject.jsx   ← create form  (componentDisplay === 1)
            └── Project.jsx      ← project detail (componentDisplay === 2)
                └── Tasks.jsx    ← task list + dialog
                    └── Task.jsx
```

**Shared components**

| Component | Description |
|---|---|
| `Button.jsx` | Reusable button, accepts `label`, `btnClass`, `handleClick` |
| `Input.jsx` | Reusable `<input>` / `<textarea>`, built with `forwardRef` |
| `Image.jsx` | Decorative placeholder figure |
| `ErrorModal.jsx` | Placeholder for a future `createPortal` error modal |

---

## React Hooks

### `useState`

Used in two places.

**`task-manager-context.jsx`** — three slices of global state:

```jsx
const [projects, setProjects] = useState({ items: [] });
const [selectedProject, setSelectedProject] = useState(undefined);
const [componentDisplay, setComponentDisplay] = useState(0);
```

`componentDisplay` acts as a simple view router:
- `0` → `<NoProject />`
- `1` → `<AddProject />`
- `2` → `<Project />`

**`SideBar.jsx`** — local toggle for the mobile burger menu:

```jsx
const [viewProjects, setViewProjects] = useState(false);
```

---

### `useEffect`

Both effects live in `task-manager-context.jsx` and handle **localStorage sync**.

**Effect 1 — hydrate on mount** (runs once):

```jsx
useEffect(() => {
  if (projects.items.length === 0) {
    const saved = window.localStorage.getItem("projects");
    if (saved) {
      const data = JSON.parse(saved);
      if (JSON.stringify(data) !== JSON.stringify(projects)) {
        setProjects(data);
      }
    }
  }
}, []);
```

The strict equality guard avoids an infinite loop that React 18+ Strict Mode can trigger by mounting effects twice.

**Effect 2 — persist on every change** (runs when `projects` or `selectedProject` change):

```jsx
useEffect(() => {
  if (projects.items.length === 0 || selectedProject === undefined) {
    setComponentDisplay(0);
  }
  window.localStorage.setItem("projects", JSON.stringify(projects));
}, [projects, selectedProject]);
```

This also resets the view to the empty state whenever there are no projects or no selection.

---

### `useRef`

`useRef` gives direct access to DOM nodes without triggering a re-render.

**`AddProject.jsx`** — reads the whole form at once instead of tracking each field with `useState`:

```jsx
const form = useRef();

function saveProject(e) {
  e.preventDefault();
  let data = {};
  for (const element of form.current.elements) {
    if (element.tagName === "BUTTON") continue;
    data = { ...data, id: nanoid(8), [element.id]: element.value };
  }
  addProject(data);
}

function cancelProject(e) {
  form.current.reset(); // native DOM reset, no state needed
  switchComponentDisplay(0);
}

// JSX
<form ref={form}>...</form>
```

**`Tasks.jsx`** — three refs for the task dialog:

```jsx
const newTask = useRef();   // value of the task input
const dialog = useRef();    // native <dialog> element
const dialogForm = useRef(); // to reset the form after save

function openDialog()  { dialog.current.showModal(); }
function closeDialog() { dialog.current.close(); }

function saveTask(e) {
  e.preventDefault();
  addTask(newTask.current.value);
  closeDialog();
  dialogForm.current.reset();
}
```

The native `<dialog>` API (`showModal()` / `close()`) is used directly — no CSS toggle needed.

---

### `forwardRef`

`Input.jsx` uses `forwardRef` so a parent can pass a `ref` down to the underlying `<input>` or `<textarea>` DOM node.

```jsx
const Input = forwardRef(function Input(
  { id, label, isTextArea = false, type = "text" },
  ref
) {
  return (
    <div className="mt-4">
      <label htmlFor={id}>{label}</label>
      {isTextArea ? (
        <textarea ref={ref} name={id} id={id} rows="4" cols="50" required />
      ) : (
        <input ref={ref} type={type} name={id} id={id} required />
      )}
    </div>
  );
});
```

This is why `Tasks.jsx` can do `<Input ref={newTask} />` and later read `newTask.current.value`.  
Without `forwardRef`, passing `ref` to a function component would silently fail.

---

### `useContext` + custom hook

The context is created in `task-manager-context.jsx` and consumed via a custom hook:

```jsx
export const TaskManagerContext = createContext({ /* shape */ });

export function useTaskManager() {
  return useContext(TaskManagerContext);
}
```

Every component calls `useTaskManager()` instead of `useContext(TaskManagerContext)` directly. This keeps imports clean and makes the context easier to swap later.

```jsx
// Any component
const { projects, addTask, deleteProject } = useTaskManager();
```

---

## Context API — State & Actions

`TaskManagerContextProvider` owns all shared state and exposes it through `TaskManagerContext`.

| Value | Type | Description |
|---|---|---|
| `projects` | `{ items: [] }` | All projects |
| `selectedProject` | `object \| undefined` | Currently viewed project |
| `componentDisplay` | `0 \| 1 \| 2` | Which view to render |
| `switchComponentDisplay(id)` | function | Change the active view |
| `addProject(data)` | function | Add a project + select it |
| `deleteProject(projectId)` | function | Remove a project |
| `selectProject(id)` | function | Switch the active project |
| `addTask(task)` | function | Add a task to the selected project |
| `deleteTask(taskId)` | function | Remove a task from the selected project |

Both `addTask` and `deleteTask` update `projects` immutably (via `map` / `filter`) and then sync `selectedProject` so the UI stays consistent.

---

## Tailwind CSS

### Custom configuration (`tailwind.config.js`)

**Extra breakpoint:**

```js
screens: {
  xs: "576px", // between default sm (640px) and mobile
}
```

**Custom green palette** using OKLCH (perceptually uniform color space):

```js
colors: {
  green: {
    500: "oklch(74% 0.11 134.3)", // main green
    // 50 → 900 full scale
  }
}
```

### Global utilities (`index.css`)

Custom classes defined with `@apply` to avoid repeating the same combinations:

| Class | Tailwind equivalent | Use |
|---|---|---|
| `.tm_header-bottom` | `border-b border-b-slate-300 pb-6` | Section dividers |
| `.tm_padding-wrap` | `px-6 xs:px-16 lg:px-0` | Responsive horizontal padding |
| `.tm_flex-jb-ic` | `flex justify-between items-center` | Common flex row |
| `.display-small` | `lg:hidden` | Visible only on mobile |
| `.display-large` | `max-lg:hidden` | Visible only on desktop |

### Responsive layout

The app uses a **mobile-first** approach:

- On mobile: sidebar and main stack vertically; the project list hides behind a burger menu button
- On desktop (`lg:`): sidebar sits to the left of main in a fixed-width centered container (`lg:w-[900px] lg:m-auto`)

The burger toggle is handled by the `viewProjects` state in `SideBar.jsx` which adds/removes an `active` class on the project list.

---

## Data Flow Diagram

```
User clicks "New project"
        │
        ▼
  SideBar / NoProject
  calls switchComponentDisplay(1)
        │
        ▼
  App renders <AddProject />
        │
  User fills form and clicks Save
        │
        ▼
  AddProject reads form.current.elements (useRef)
  calls addProject(data)
        │
        ▼
  Context: setProjects(...) + setSelectedProject(data) + setComponentDisplay(2)
        │
        ▼
  useEffect fires → localStorage.setItem(...)
        │
        ▼
  App renders <Project /> with selectedProject data
```

---

## Getting Started

```bash
npm install
npm run dev
```

Open `http://localhost:5173`.

---

## File Structure

```
src/
├── assets/               SVGs and images
├── components/
│   ├── AddProject.jsx    Project creation form (useRef)
│   ├── Button.jsx        Reusable button
│   ├── ErrorModal.jsx    Placeholder (createPortal)
│   ├── Header.jsx        Top nav bar
│   ├── Image.jsx         Decorative placeholder
│   ├── Input.jsx         Input/textarea (forwardRef)
│   ├── NoProject.jsx     Empty state view
│   ├── Project.jsx       Project detail view
│   ├── SideBar.jsx       Project list sidebar (useState)
│   ├── SidebarProjectItem.jsx  Single project row
│   ├── Task.jsx          Single task row
│   └── Tasks.jsx         Task list + dialog (useRef)
├── store/
│   └── task-manager-context.jsx  Global state (useState, useEffect, useContext)
├── styles/               Per-component CSS files
├── App.jsx               View router
├── index.css             Tailwind base + custom utilities
└── main.jsx              Entry point, wraps app in context provider
```
