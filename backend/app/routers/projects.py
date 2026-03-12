from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session

from database import get_db
from models import Project
from schemas import ProjectCreate, ProjectRead, ProjectUpdate


router = APIRouter(prefix="/api/projects", tags=["projects"])

@router.post("/", response_model=ProjectRead, status_code=201)
def create_project(payload: ProjectCreate, db: Session = Depends(get_db)):
	project = Project(name=payload.name)
	db.add(project)
	db.commit()
	db.refresh(project)
	return project

@router.get("/", response_model=list[ProjectRead])
def list_projects(db: Session = Depends(get_db)):
	return db.query(Project).order_by(Project.created_at.desc()).all()

@router.get("/{project_id}", response_model=ProjectRead)
def get_project(project_id: int, db: Session = Depends(get_db)):
	project = db.get(Project, project_id)
	if not project:
		raise HTTPException(status_code=404, detail="Project not found")
	return project

@router.put("/{project_id}", response_model=ProjectRead)
def update_project(project_id: int, payload: ProjectUpdate, db: Session = Depends(get_db)):
	project = db.get(Project, project_id)
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
def delete_project(project_id: int, db: Session = Depends(get_db)):
	project = db.get(Project, project_id)
	if not project:
		raise HTTPException(status_code=404, detail="Project not found")
	db.delete(project)
	db.commit()

