import React, { useState, useEffect } from 'react';
import { getTasks, createTask, getProjects, createProject } from '../api';
import './ProjectBoard.css';

function ProjectBoard() {
  const [tasks, setTasks] = useState([]);
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [newProjectName, setNewProjectName] = useState('');
  const [newTaskTitle, setNewTaskTitle] = useState('');
  const [selectedProjectId, setSelectedProjectId] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [projectsData, tasksData] = await Promise.all([
          getProjects(),
          getTasks(),
        ]);
        setProjects(projectsData);
        setTasks(tasksData);
        if (projectsData.length > 0) {
          setSelectedProjectId(projectsData[0].id);
        }
      } catch (err) {
        setError('Failed to load data. Is the backend running?');
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const handleCreateProject = async (e) => {
    e.preventDefault();
    if (!newProjectName.trim()) return;
    try {
      const project = await createProject({ name: newProjectName });
      setProjects([...projects, project]);
      setNewProjectName('');
      if (!selectedProjectId) {
        setSelectedProjectId(project.id);
      }
    } catch (err) {
      setError('Failed to create project');
    }
  };

  const handleCreateTask = async (e) => {
    e.preventDefault();
    if (!newTaskTitle.trim() || !selectedProjectId) return;
    try {
      const task = await createTask({
        title: newTaskTitle,
        project_id: Number(selectedProjectId),
        status: 'todo',
      });
      setTasks([...tasks, task]);
      setNewTaskTitle('');
    } catch (err) {
      setError('Failed to create task');
    }
  };

  const todoTasks = tasks.filter((t) => t.status === 'todo');
  const inProgressTasks = tasks.filter((t) => t.status === 'in_progress');
  const doneTasks = tasks.filter((t) => t.status === 'done');

  if (loading) {
    return <div className="board-container">Loading...</div>;
  }

  if (error) {
    return <div className="board-container error">{error}</div>;
  }

  return (
    <div className="board-container">
      <h1>Project Board</h1>
      
      <div className="forms-section">
        <form onSubmit={handleCreateProject} className="create-form">
          <h3>Create Project</h3>
          <input
            type="text"
            placeholder="Project name"
            value={newProjectName}
            onChange={(e) => setNewProjectName(e.target.value)}
          />
          <button type="submit">Create Project</button>
        </form>

        <form onSubmit={handleCreateTask} className="create-form">
          <h3>Create Task</h3>
          <select
            value={selectedProjectId}
            onChange={(e) => setSelectedProjectId(e.target.value)}
          >
            {projects.length === 0 && <option value="">No projects</option>}
            {projects.map((p) => (
              <option key={p.id} value={p.id}>
                {p.name}
              </option>
            ))}
          </select>
          <input
            type="text"
            placeholder="Task title"
            value={newTaskTitle}
            onChange={(e) => setNewTaskTitle(e.target.value)}
          />
          <button type="submit" disabled={!selectedProjectId}>
            Create Task
          </button>
        </form>
      </div>

      <div className="board">
        <div className="board-column">
          <h2>To Do</h2>
          <div className="task-list">
            {todoTasks.map((task) => (
              <div key={task.id} className="task-card">
                <h4>{task.title}</h4>
                <p>{task.description || 'No description'}</p>
              </div>
            ))}
            {todoTasks.length === 0 && (
              <p className="empty-column">No tasks</p>
            )}
          </div>
        </div>

        <div className="board-column">
          <h2>In Progress</h2>
          <div className="task-list">
            {inProgressTasks.map((task) => (
              <div key={task.id} className="task-card">
                <h4>{task.title}</h4>
                <p>{task.description || 'No description'}</p>
              </div>
            ))}
            {inProgressTasks.length === 0 && (
              <p className="empty-column">No tasks</p>
            )}
          </div>
        </div>

        <div className="board-column">
          <h2>Done</h2>
          <div className="task-list">
            {doneTasks.map((task) => (
              <div key={task.id} className="task-card">
                <h4>{task.title}</h4>
                <p>{task.description || 'No description'}</p>
              </div>
            ))}
            {doneTasks.length === 0 && (
              <p className="empty-column">No tasks</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProjectBoard;
