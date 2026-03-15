
import os

"""

This module sets up the database connection and session management for the FlowBoard backend application.
It uses SQLAlchemy to define the database engine, session factory, and declarative base for ORM models.
The module provides utility functions to create database tables and to yield a database session for use in
dependency injection (e.g., with FastAPI routes).

"""

from sqlalchemy import create_engine
from sqlalchemy.orm import declarative_base, sessionmaker


DATABASE_URL = os.getenv("DATABASE_URL", "sqlite:///./flowboard.db")

connect_args = {"check_same_thread": False} if DATABASE_URL.startswith("sqlite") else {}

engine = create_engine(DATABASE_URL, connect_args=connect_args)
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)
Base = declarative_base()


# imports models so SQLAlchemy registers them before create_all runs
def create_db_and_tables() -> None:
    import models  # noqa: F401

    Base.metadata.create_all(bind=engine)


# Dependency function to provide a database session for use in FastAPI routes. It ensures that the session is properly closed after use, preventing potential resource leaks.
def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()
