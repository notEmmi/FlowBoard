# Projects router: CRUD endpoints for projects, scoped to the authenticated user.
from datetime import datetime, timezone
from zoneinfo import ZoneInfo, ZoneInfoNotFoundError

from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session

from database import get_db
from models import Project, User
from schemas import ProjectCreate, ProjectRead, ProjectUpdate
from services.security import get_token_subject


router = APIRouter(prefix="/api/projects", tags=["projects"])


@router.post("", response_model=ProjectRead, status_code=201)
@router.post("/", response_model=ProjectRead, status_code=201, include_in_schema=False)
def create_project(
	payload: ProjectCreate,
	db: Session = Depends(get_db),
	current_user_id: int = Depends(get_token_subject),
):
	now_utc = datetime.now(timezone.utc)
	try:
		now_local = now_utc.astimezone(ZoneInfo(payload.timezone))
	except ZoneInfoNotFoundError:
		now_local = now_utc

	project = Project(
		name=payload.name,
		owner_id=current_user_id,
		created_at=now_local.replace(tzinfo=None),
		updated_at=now_local.replace(tzinfo=None),
	)
	
	db.add(project)
	db.commit()
	db.refresh(project)
	return project

@router.get("", response_model=list[ProjectRead])
@router.get("/", response_model=list[ProjectRead], include_in_schema=False)
def list_projects(
	db: Session = Depends(get_db),
	current_user_id: int = Depends(get_token_subject),
):
	return (
		db.query(Project)
		.filter(Project.owner_id == current_user_id)
		.order_by(Project.created_at.desc())
		.all()
	)

@router.get("/{project_id}", response_model=ProjectRead)
def get_project(
	project_id: int,
	db: Session = Depends(get_db),
	current_user_id: int = Depends(get_token_subject),
):
	project = (
		db.query(Project)
		.filter(Project.id == project_id, Project.owner_id == current_user_id)
		.first()
	)
	if not project:
		raise HTTPException(status_code=404, detail="Project not found")
	return project

@router.put("/{project_id}", response_model=ProjectRead)
def update_project(
	project_id: int,
	payload: ProjectUpdate,
	db: Session = Depends(get_db),
	current_user_id: int = Depends(get_token_subject),
):
	project = (
		db.query(Project)
		.filter(Project.id == project_id, Project.owner_id == current_user_id)
		.first()
	)

	if not project:
		raise HTTPException(status_code=404, detail="Project not found")
	if payload.name is not None:
		project.name = payload.name
	if payload.description is not None:
		project.description = payload.description
		
	db.commit()
	db.refresh(project)
	return project

@router.delete("/{project_id}", status_code=204)
def delete_project(
	project_id: int,
	db: Session = Depends(get_db),
	current_user_id: int = Depends(get_token_subject),
):
	project = (
		db.query(Project)
		.filter(Project.id == project_id, Project.owner_id == current_user_id)
		.first()
	)
	if not project:
		raise HTTPException(status_code=404, detail="Project not found")
	db.delete(project)
	db.commit()

