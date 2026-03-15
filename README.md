# FlowBoard
A developer-focused project planning web app for tracking work from idea to completion.

## Project Status
🚧 **In Progress:** FlowBoard is currently under active development. Core features are being built and iterated on. Feedback and contributions are welcome!

## Why I Built It
I built FlowBoard to solve a common workflow problem: planning software work in one place while still keeping progress visible across stages. Most lightweight tools are either too simple (just notes) or too heavy (full enterprise PM suites), so this project aims to provide a focused middle ground for developer projects.

## Application Description
FlowBoard is a full-stack web application where users can manage projects, and track project progress through structured boards and related project views. It is designed to be simple enough for solo or small-team use while still supporting clear status tracking via kanban-style. Each project contains customizable columns (e.g., "Planned", "In Progress", "Review", "Done") and cards representing tasks or features. Users can create, edit, and move cards between columns to reflect real-time progress. The interface is optimized for clarity and speed, making it easy to visualize work at a glance.

## Features
* **Kanban Workflow:** Drag-and-drop task management from "Backlog" to "Done."
* **Secure Auth:** JWT-based authentication for private project management.
* **RESTful API:** Robust FastAPI backend with Pydantic data validation.
* **Responsive UI:** Fast, reactive frontend built with React and Vite.
* **Containerized:** Simplified deployment and development via Docker Compose.

## Tech Stack
* **Frontend:** React + Vite
* **Backend:** FastAPI (Python)
* **Database:** PostgreSQL 16
* **ORM:** SQLAlchemy
* **Auth:** JWT (Bearer token)
* **Containerization:** Docker Compose

## Services
* **frontend** - Vite dev server on `5173`
* **backend** - FastAPI app on `8000`
* **db** - PostgreSQL 16 on `5432`