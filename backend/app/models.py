from pydantic import BaseModel
from typing import Optional

class ProjectBase(BaseModel):
    name: str
    desc: str

class ProjectCreate(ProjectBase):
    pass

class Project(ProjectBase):
    image: str
    
    class Config:
        from_attributes = True

class ClientBase(BaseModel):
    name: str
    desc: str
    designation: str

class ClientCreate(ClientBase):
    pass

class Client(ClientBase):
    image: str
    
    class Config:
        from_attributes = True

class ContactBase(BaseModel):
    name: str
    email: str
    mobile: str
    city: str

class ContactCreate(ContactBase):
    pass

class Contact(ContactBase):
    pass
    
    class Config:
        from_attributes = True

class NewsletterBase(BaseModel):
    email: str

class NewsletterCreate(NewsletterBase):
    pass

class Newsletter(NewsletterBase):
    pass
    
    class Config:
        from_attributes = True
