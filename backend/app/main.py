# FastAPI application entry point: configures middleware, lifespan, global error handling, and mounts routers.
import logging
from fastapi import FastAPI
from fastapi import Request
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import JSONResponse
from contextlib import asynccontextmanager

from database import create_db_and_tables
from routers.auth import router as auth_router
from routers.projects import router as projects_router

logger = logging.getLogger(__name__)


# creates tables on startup; runs once before the app begins serving requests
@asynccontextmanager
async def lifespan(_: FastAPI):
    create_db_and_tables()
    yield


app = FastAPI(lifespan=lifespan)

# allow all origins in dev; tighten allow_origins before deploying to production
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.exception_handler(Exception)
async def unhandled_exception_handler(request: Request, exc: Exception):
    logger.exception(
        "Unhandled server error on %s %s",
        request.method,
        request.url.path,
        exc_info=exc,
    )
    return JSONResponse(status_code=500, content={"detail": "Internal server error"})

@app.get("/ping")
def read_root():
    return {"message": "FastAPI running via Docker 🎉"}


app.include_router(auth_router)
app.include_router(projects_router)