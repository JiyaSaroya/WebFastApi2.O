from fastapi import FastAPI, UploadFile, File, Form, HTTPException
from fastapi.staticfiles import StaticFiles
from fastapi.middleware.cors import CORSMiddleware
from app.models import ProjectCreate, ClientCreate
from app.database import get_db
from app.utils import process_image
from PIL import Image
from io import BytesIO
import os
from dotenv import load_dotenv

load_dotenv()

app = FastAPI(title="Placement App API")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.mount("/static", StaticFiles(directory="../static"), name="static")

db = get_db()
projects = db.projects
clients = db.clients
contacts = db.contacts
newsletters = db.newsletters

@app.post("/api/projects")
async def add_project(name: str = Form(), desc: str = Form(), image: UploadFile = File(...)):
    contents = await image.read()
    filename = f"{name.replace(' ', '_')}_{image.filename}"
    path = process_image(contents, "projects", filename)
    projects.insert_one({"name": name, "desc": desc, "image": path})
    return {"status": "success"}

@app.get("/api/projects")
async def get_projects():
    return list(projects.find({}, {"_id": 0}))

@app.post("/api/clients")
async def add_client(name: str = Form(), desc: str = Form(), designation: str = Form(), image: UploadFile = File(...)):
    contents = await image.read()
    filename = f"{name.replace(' ', '_')}_{image.filename}"
    path = process_image(contents, "clients", filename)
    clients.insert_one({"name": name, "desc": desc, "designation": designation, "image": path})
    return {"status": "success"}

@app.get("/api/clients")
async def get_clients():
    return list(clients.find({}, {"_id": 0}))

@app.post("/api/contact")
async def submit_contact(name: str = Form(), email: str = Form(), mobile: str = Form(), city: str = Form()):
    contacts.insert_one({"name": name, "email": email, "mobile": mobile, "city": city})
    return {"status": "success"}

@app.get("/api/contacts")
async def get_contacts():
    return list(contacts.find({}, {"_id": 0}).sort("_id", -1))

@app.post("/api/newsletter")
async def subscribe_newsletter(email: str = Form()):
    newsletters.insert_one({"email": email})
    return {"status": "success"}

@app.get("/api/newsletters")
async def get_newsletters():
    return list(newsletters.find({}, {"_id": 0}).sort("_id", -1))

@app.get("/")
async def root():
    return {"message": "Placement App API Running"}

