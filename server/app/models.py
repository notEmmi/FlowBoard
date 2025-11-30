"""Pydantic models for the FlowBoard API."""
from datetime import datetime
from typing import Optional

from pydantic import BaseModel


class ProjectBase(BaseModel):
    """Base model for Project."""

    name: str
    description: Optional[str] = None


class ProjectCreate(ProjectBase):
    """Model for creating a Project."""

    pass


class Project(ProjectBase):
    """Full Project model with ID."""

    id: int


class TaskBase(BaseModel):
    """Base model for Task."""

    title: str
    description: Optional[str] = None
    status: str = "todo"
    project_id: int


class TaskCreate(TaskBase):
    """Model for creating a Task."""

    pass


class Task(TaskBase):
    """Full Task model with ID."""

    id: int


class TimelineEventBase(BaseModel):
    """Base model for TimelineEvent."""

    event_type: str
    description: str
    project_id: Optional[int] = None
    task_id: Optional[int] = None


class TimelineEventCreate(TimelineEventBase):
    """Model for creating a TimelineEvent."""

    pass


class TimelineEvent(TimelineEventBase):
    """Full TimelineEvent model with ID and timestamp."""

    id: int
    timestamp: datetime
