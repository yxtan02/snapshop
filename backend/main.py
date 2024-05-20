from fastapi import FastAPI, UploadFile
from fastapi.middleware.cors import CORSMiddleware
from ultralytics import YOLO
import asyncio
import httpx
import cv2
import numpy

app = FastAPI()
model = YOLO("yolov8x.pt")

# Configure CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"],
)

async def getProducts(product):
  products = {
    "amazon": {},
    "lazada": {},
    "ebay": {}
  }

  async def getAmazonProducts():
    try:
      async with httpx.AsyncClient() as client:
        url = f"https://real-time-amazon-data.p.rapidapi.com/search?query={product}&country=SG"
        headers = {
          'X-RapidAPI-Key': 'ce3cc063f9msh6682049258d52bep1e8021jsn14b60338415f',
          'X-RapidAPI-Host': 'real-time-amazon-data.p.rapidapi.com'
        }
        res = await client.get(url, headers=headers)
        res.raise_for_status()
        products["amazon"] = res.json()["data"]["products"]
    except httpx.HTTPError as exc:
      print(f"HTTP Exception for {exc.request.url} - {exc}")

  async def getLazadaProducts():
    try:
      async with httpx.AsyncClient() as client:
        url = f"https://lazada-api.p.rapidapi.com/lazada/search/items?keywords={product}&site=sg&page=1"
        headers = {
          'X-RapidAPI-Key': 'ce3cc063f9msh6682049258d52bep1e8021jsn14b60338415f',
          'X-RapidAPI-Host': 'lazada-api.p.rapidapi.com'
        }
        res = await client.get(url, headers=headers)
        res.raise_for_status()
        products["lazada"] = res.json()["data"]["items"]
    except httpx.HTTPError as exc:
      print(f"HTTP Exception for {exc.request.url} - {exc}")

  async def getEbayProducts():
    try:
      async with httpx.AsyncClient() as client:
        url = f"https://ebay-search-result.p.rapidapi.com/search/{product}"
        headers = {
          'X-RapidAPI-Key': 'ce3cc063f9msh6682049258d52bep1e8021jsn14b60338415f',
          'X-RapidAPI-Host': 'ebay-search-result.p.rapidapi.com'
        }
        res = await client.get(url, headers=headers)
        res.raise_for_status()
        products["ebay"] = res.json()["results"]
    except httpx.HTTPError as exc:
      print(f"HTTP Exception for {exc.request.url} - {exc}")

  await asyncio.gather(
  #  getAmazonProducts(),
  #  getLazadaProducts(),
    getEbayProducts()
  )
  return products

@app.post("/search")
async def search(file: UploadFile):
  # Process the uploaded image
  image_bytes = await file.read()
  image = numpy.frombuffer(image_bytes, dtype=numpy.uint8)
  image = cv2.imdecode(image, cv2.IMREAD_COLOR)
 
  # Perform object detection
  result = model.predict(image)[0]
  predictions = []
  for box in result.boxes:
    item = result.names[box.cls[0].item()]
    prob = box.conf[0].item()
    predictions.append([item, prob])
  predictions.sort(reverse=True, key=lambda x: x[1])
  product = predictions[0][0]

  # Search for products on e-commerce platforms
  products = await getProducts(product)
  return [product, products]