from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session

from database import get_db
from models import Item
from schemas import ItemCreate, ItemRead

router = APIRouter(prefix="/api/items", tags=["items"])


@router.post("/", response_model=ItemRead, status_code=201)
def create_item(payload: ItemCreate, db: Session = Depends(get_db)):
    item = Item(name=payload.name, description=payload.description)
    db.add(item)
    db.commit()
    db.refresh(item)
    return item


@router.get("/", response_model=list[ItemRead])
def list_items(db: Session = Depends(get_db)):
    return db.query(Item).order_by(Item.id.desc()).all()


@router.get("/{item_id}", response_model=ItemRead)
def get_item(item_id: int, db: Session = Depends(get_db)):
    item = db.get(Item, item_id)
    if not item:
        raise HTTPException(status_code=404, detail="Item not found")
    return item
