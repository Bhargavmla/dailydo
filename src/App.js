import React, { useState } from "react";
import "./App.css";

function uid() {
  return Date.now().toString(36) + Math.random().toString(36).slice(2, 7);
}

function App() {
  const [tasks, setTasks] = useState([]);
  const [title, setTitle] = useState("");
  const [due, setDue] = useState("");
  const [priority, setPriority] = useState("Medium");
  const [filter, setFilter] = useState("all");
  const [search, setSearch] = useState("");
  const [editingId, setEditingId] = useState(null);



  const toggleDone = (id) => {
    setTasks((prev) => prev.map((t) => (t.id === id ? { ...t, done: !t.done } : t)));
  };

  // add task
  const handleAddTask = () => {
    const t = title.trim();
    if (!t) return;
    const newTask = {
      id: uid(),
      title: t,
      due: due || null,
      priority,
      done: false,
      createdAt: new Date().toISOString(),
    };
    setTasks((prev) => [newTask, ...prev]);
    setTitle("");
    setDue("");
    setPriority("Medium");
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      handleAddTask();
    }
  };

  const formatDue = (d) => {
    if (!d) return "No due";
    try {
      const dt = new Date(d);
      return dt.toLocaleDateString();
    } catch {
      return d;
    }
  };

  // ---- moved filteredTasks here (outside of formatDue) ----
  const filteredTasks = tasks.filter((t) => {
  if (filter === "active" && t.done) return false;
  if (filter === "done" && !t.done) return false;
  if (search && !t.title.toLowerCase().includes(search.toLowerCase())) return false;
  return true;
});
const deleteTask = (id) => {
  const confirmed = window.confirm("Delete this task?");
  if (!confirmed) return;

  setTasks((prev) => prev.filter((t) => t.id !== id));
};
const startEdit = (task) => {
  setEditingId(task.id);
  setTitle(task.title);
  setDue(task.due || "");
  setPriority(task.priority);
};
const exportTasks = () => {
  const data = JSON.stringify(tasks, null, 2);
  const blob = new Blob([data], { type: "application/json" });
  const url = URL.createObjectURL(blob);

  const a = document.createElement("a");
  a.href = url;
  a.download = "dailydo_tasks.json"; // the file name
  a.click();

  URL.revokeObjectURL(url);
};
const clearAll = () => {
  const ok = window.confirm("Clear ALL tasks?");
  if (!ok) return;

  setTasks([]); // remove everything
};




  return (
    <div className="app">
      {/* Header */}
      <header className="header">
        <h1 className="title">DailyDo</h1>
        <p className="tag">Small Steps. Big Progress.</p>
      </header>

      {/* Add task panel */}
      <section className="add-panel">
        <input
          className="task-input"
          type="text"
          placeholder="Add a task..."
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          onKeyDown={handleKeyDown}
        />
        <input
          className="due-input"
          type="date"
          value={due}
          onChange={(e) => setDue(e.target.value)}
        />
        <select
          className="priority-select"
          value={priority}
          onChange={(e) => setPriority(e.target.value)}
        >
          <option>Low</option>
          <option>Medium</option>
          <option>High</option>
        </select>
        <button
  className="add-btn"
  onClick={() => {
    if (editingId) {
      // update existing task
      setTasks((prev) =>
        prev.map((t) =>
          t.id === editingId
            ? { ...t, title, due: due || null, priority }
            : t
        )
      );

      setEditingId(null);
      setTitle("");
      setDue("");
      setPriority("Medium");
    } else {
      handleAddTask();
    }
  }}
>
  {editingId ? "Update" : "Add"}
</button>
      </section>

      {/* Controls: search + filters + actions */}
      <div className="controls">
        <input
  className="search"
  type="search"
  placeholder="Search tasks..."
  value={search}
  onChange={(e) => setSearch(e.target.value)}
/>


        <div className="filters">
          <button
            className={`filter-btn ${filter === "all" ? "active" : ""}`}
            onClick={() => setFilter("all")}
          >
            All
          </button>

          <button
            className={`filter-btn ${filter === "active" ? "active" : ""}`}
            onClick={() => setFilter("active")}
          >
            Active
          </button>

          <button
            className={`filter-btn ${filter === "done" ? "active" : ""}`}
            onClick={() => setFilter("done")}
          >
            Done
          </button>
        </div>

        <div className="actions">
          <button className="export-btn" onClick={exportTasks}>
               Export
             </button>

          <button className="clear-btn" onClick={clearAll}>
  Clear All
</button>

        </div>
      </div>

      {/* Task list */}
      <section className="task-list">
        {filteredTasks.length === 0 ? (
          <div className="empty-list">No tasks yet — add one above.</div>
        ) : (
          <ul className="task-cards">
            {filteredTasks.map((task) => (
              <li key={task.id} className={`task-card ${task.done ? "done" : ""}`}>
                <div className="task-left">
                  {/* clickable checkbox */}
                  <div
                    className={`checkbox ${task.done ? "checked" : ""}`}
                    onClick={() => toggleDone(task.id)}
                  />

                  {/* task details */}
                  <div>
                    <div className="task-title">{task.title}</div>
                    <div className="task-sub">
                      <span className="task-due">{formatDue(task.due)}</span>
                      <span className="task-priority"> • {task.priority}</span>
                    </div>
                  </div>
                   </div>
                  <div className="task-actions">
    <button onClick={() => deleteTask(task.id)}>Delete</button>
    <button onClick={() => startEdit(task)}>Edit</button>

  </div>


              </li>
            ))}
          </ul>
        )}
      </section>

      {/* Footer */}
      <footer className="footer">
        <p>Local demo — tasks are saved in your browser.</p>
      </footer>
    </div>
  );
}

export default App;
