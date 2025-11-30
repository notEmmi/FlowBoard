"""FlowBoard API - A project planner backend."""
from datetime import datetime
from typing import List

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from server.app.models import (
    Project,
    ProjectCreate,
    Task,
    TaskCreate,
    TimelineEvent,
    TimelineEventCreate,
)

app = FastAPI(
    title="FlowBoard API",
    description="A project planner API for developers to stay organized.",
    version="1.0.0",
)

# CORS configuration - Allow React frontend to connect
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000", "http://127.0.0.1:3000"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# In-memory storage for demonstration
projects_db: List[Project] = []
tasks_db: List[Task] = []
timeline_db: List[TimelineEvent] = []

# ID counters for reliable unique ID generation
project_id_counter = 0
task_id_counter = 0
timeline_id_counter = 0


@app.get("/")
def read_root():
    """Root endpoint."""
    return {"message": "Welcome to FlowBoard API"}


@app.get("/projects", response_model=List[Project])
def get_projects():
    """Get all projects."""
    return projects_db


@app.post("/projects", response_model=Project)
def create_project(project: ProjectCreate):
    """Create a new project."""
    global project_id_counter
    project_id_counter += 1
    new_project = Project(id=project_id_counter, **project.model_dump())
    projects_db.append(new_project)
    return new_project


@app.get("/tasks", response_model=List[Task])
def get_tasks():
    """Get all tasks."""
    return tasks_db


@app.post("/tasks", response_model=Task)
def create_task(task: TaskCreate):
    """Create a new task."""
    global task_id_counter
    task_id_counter += 1
    new_task = Task(id=task_id_counter, **task.model_dump())
    tasks_db.append(new_task)
    return new_task


@app.get("/timeline", response_model=List[TimelineEvent])
def get_timeline():
    """Get all timeline events."""
    return timeline_db


@app.post("/timeline", response_model=TimelineEvent)
def create_timeline_event(event: TimelineEventCreate):
    """Create a new timeline event."""
    global timeline_id_counter
    timeline_id_counter += 1
    new_event = TimelineEvent(
        id=timeline_id_counter, timestamp=datetime.now(), **event.model_dump()
    )
    timeline_db.append(new_event)
    return new_event


if __name__ == "__main__":
    import uvicorn

    uvicorn.run(app, host="0.0.0.0", port=8000)
