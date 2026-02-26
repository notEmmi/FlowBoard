# FlowBoard
A project planner for developers to stay organized and focused while tracking progress.

## Run with Docker (Backend + Frontend + SQLite)

From the project root:

```bash
docker compose up --build
```

Services:
- Frontend: http://localhost:5173
- Backend: http://localhost:8000
- API docs: http://localhost:8000/docs
- SQLite: `localhost:5432` (`flowboard` / `flowboard` / DB: `flowboard`)

## Database setup added

The backend now uses SQLAlchemy with:
- `DATABASE_URL` env var (set in `docker-compose.yml`)
- Auto table creation on backend startup
- Example `items` table and API routes

## Example API usage

Create an item:

```bash
curl -X POST http://localhost:8000/api/items/ \
	-H "Content-Type: application/json" \
	-d '{"name":"Setup database","description":"First test row"}'
```

List all items:

```bash
curl http://localhost:8000/api/items/
```

Get one item:

```bash
curl http://localhost:8000/api/items/1
```
