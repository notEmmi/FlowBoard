import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { getProjects } from '../api';
import './Home.css';

function Home() {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const data = await getProjects();
        setProjects(data);
      } catch (err) {
        setError('Failed to load projects. Is the backend running?');
      } finally {
        setLoading(false);
      }
    };
    fetchProjects();
  }, []);

  return (
    <div className="home">
      <section className="hero">
        <h1>Welcome to FlowBoard</h1>
        <p>A project planner for developers to stay organized and focused while tracking progress.</p>
        <Link to="/board" className="cta-button">
          Go to Project Board
        </Link>
      </section>

      <section className="projects-section">
        <h2>Your Projects</h2>
        {loading && <p>Loading projects...</p>}
        {error && <p className="error">{error}</p>}
        {!loading && !error && projects.length === 0 && (
          <p>No projects yet. Create one from the Project Board!</p>
        )}
        {!loading && !error && projects.length > 0 && (
          <ul className="projects-list">
            {projects.map((project) => (
              <li key={project.id} className="project-item">
                <h3>{project.name}</h3>
                <p>{project.description || 'No description'}</p>
              </li>
            ))}
          </ul>
        )}
      </section>
    </div>
  );
}

export default Home;
