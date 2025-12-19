from PIL import Image
from io import BytesIO
import os

def process_image(image_bytes: bytes, folder: str, filename: str) -> str:
    
    img = Image.open(BytesIO(image_bytes))
    img = img.resize((450, 350))
    
    os.makedirs(f"static/{folder}", exist_ok=True)
    path = f"static/{folder}/{filename}"
    img.save(path)
    return path
