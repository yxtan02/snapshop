from fastapi import FastAPI, UploadFile
from fastapi.middleware.cors import CORSMiddleware
from ultralytics import YOLO
import asyncio
import httpx
import cv2
import numpy
import json

app = FastAPI()
model = YOLO("yolov8x.pt")

#Configure CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.post("/detectImage")
async def detectImage(file: UploadFile):
  #Process the uploaded image
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
  if not predictions:
    return "No Detections"
  return predictions[0][0]

@app.get("/search/{product}")
async def search(product):
  # Search for products on e-commerce platforms
  products = {
    "amazon": [],
    "lazada": [],
    "ebay": []
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
        products["amazon"] = res.json()["data"]["products"][:5]
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
        products["lazada"] = res.json()["data"]["items"][:5]
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
        products["ebay"] = res.json()["results"][:5]
    except httpx.HTTPError as exc:
      print(f"HTTP Exception for {exc.request.url} - {exc}")

  await asyncio.gather(
    getAmazonProducts(),
    getLazadaProducts(),
    getEbayProducts()
  )
  return products

@app.get("/search")
async def main():
  res = {
    "amazon":
      [{
          "asin":"B0876DMR24",
          "product_title":"Colgate Extra Clean Toothbrush Valuepack 4s (Medium), (Pack of 4)",
          "product_price":"S$6.65",
          "unit_price":"S$1.66",
          "unit_count":4,
          "product_original_price":None,
          "currency":"SGD",
          "product_star_rating":"5",
          "product_num_ratings":4,
          "product_url":"https://www.amazon.sg/dp/B0876DMR24",
          "product_photo":"https://m.media-amazon.com/images/I/61hC-lBbwQL._AC_SX444_SY639_FMwebp_QL65_.jpg",
          "product_num_offers":1,
          "product_minimum_offer_price":"S$6.65",
          "is_best_seller":False,
          "is_amazon_choice":False,
          "is_prime":False,
          "climate_pledge_friendly":False,
          "sales_volume":"50+ bought in past month",
          "delivery":"Enjoy lower delivery fees for orders above S$100"
        },
        {
          "asin":"B071Y7P57G","product_title":"Oral-B CrossAction Pro-Health 7 Benefits Toothbrush, Soft, 3ct",
          "product_price":"S$14.02",
          "unit_price":"S$4.67",
          "unit_count":3,
          "product_original_price":None,
          "currency":"SGD",
          "product_star_rating":"4.8",
          "product_num_ratings":7,
          "product_url":"https://www.amazon.sg/dp/B071Y7P57G",
          "product_photo":"https://m.media-amazon.com/images/I/81Ylhk-X6TL._AC_SX444_SY639_FMwebp_QL65_.jpg",
          "product_num_offers":1,
          "product_minimum_offer_price":"S$14.02",
          "is_best_seller":False,
          "is_amazon_choice":False,
          "is_prime":False,
          "climate_pledge_friendly":False,
          "sales_volume":"50+ bought in past month",
          "delivery":"Enjoy lower delivery fees for orders above S$100"
        },
        {
          "asin":"B071XNYPDP",
          "product_title":"Oral-B 3D White Toothbrush, Soft, 3ct",
          "product_price":"S$12.28",
          "unit_price":"S$4.09",
          "unit_count":3,
          "product_original_price":None,
          "currency":"SGD",
          "product_star_rating":"5",
          "product_num_ratings":3,
          "product_url":"https://www.amazon.sg/dp/B071XNYPDP",
          "product_photo":"https://m.media-amazon.com/images/I/81orPht-tGL._AC_SX444_SY639_FMwebp_QL65_.jpg",
          "product_num_offers":1,
          "product_minimum_offer_price":"S$12.28",
          "is_best_seller":False,
          "is_amazon_choice":False,
          "is_prime":False,
          "climate_pledge_friendly":False,
          "sales_volume":None,
          "delivery":"Enjoy lower delivery fees for orders above S$100"
        }],
    "lazada": 
      [{
          "item_id":"2758452821",
          "product_url":"https://www.lazada.sg/products/-i2758452821.html",
          "title":"🚀[SG] 20k Nano Soft Bristles Toothbrush/ Adult Ultra Fine Super Soft Tooth Brush/ Dentist Recommended/ Wave Bristles",
          "img":"https://sg-live-01.slatic.net/p/611f962364916ac0e63cf6e57b056b29.jpg",
          "category_path":[1438,1682,1709,1715],
          "brand":"No Brand",
          "brand_id":"39704",
          "currency":"SGD",
          "price":"0.67",
          "price_info":{"sale_price":"0.67","origin_price":"1.39"},
          "discount":"52% Off",
          "review_info":{"average_score":"4.892638036809816","review_count":"326"},
          "comment_count":"326",
          "shop_info":{"shop_id":"1281680","shop_name":"BundleDeal.com","shop_url":"https://www.lazada.sg/shop/bundledeal.com/","seller_id":"1145301028","seller_name":"BundleDeal.com"},
          "sold_count":"4.5K","delivery_info":{"area_from":"Singapore"},
          "is_in_stock":True,
          "is_ad":False
        },
        {
          "item_id":"1396826887",
          "product_url":"https://www.lazada.sg/products/-i1396826887.html",
          "title":"ORAL B [BUNDLE OF 6PCS] TOOTHBRUSH Oral-B All Rounder 123 Clean Bacteria Fighter|Soft|Medium|Oral Care|",
          "img":"https://sg-live-01.slatic.net/p/f2fc64436539d0994cc6ed7881b98d90.jpg",
          "category_path":[1438,1682,1709,1715],
          "brand":"Oral-B",
          "brand_id":"27533",
          "currency":"SGD",
          "price":"5.9",
          "price_info":{"sale_price":"5.9","origin_price":"15.9"},
          "discount":"63% Off",
          "review_info":{"average_score":"4.838487972508591","review_count":"291"},
          "comment_count":"291",
          "shop_info":{"shop_id":"456492","shop_name":"Essential Elements","shop_url":"https://www.lazada.sg/shop/essential-elements/","seller_id":"1133454811","seller_name":"Essential Elements"},
          "sold_count":"1.8K",
          "delivery_info":{"area_from":"Singapore"},
          "is_in_stock":True,
          "is_ad":False
        },
        {
          "item_id":"1908451833",
          "product_url":"https://www.lazada.sg/products/-i1908451833.html",
          "title":"SENSODYNE Toothbrush Daily Care, Microfine Silky Bristles, Effective and Gentle Cleaning, Soft, 3s",
          "img":"https://sg-test-11.slatic.net/p/649e9ca7f20680d730d8f3d1a7cac5b8.jpg",
          "category_path":[1438,1682,1709,1715],
          "brand":"Sensodyne",
          "brand_id":"26797",
          "currency":"SGD",
          "price":"3.12",
          "price_info":{"sale_price":"3.12","origin_price":"3.85"},
          "discount":"19% Off",
          "review_info":{"average_score":"4.948586118251928","review_count":"783"},
          "comment_count":"783",
          "shop_info":{"shop_id":"1271605","shop_name":"Haleon","shop_url":"https://www.lazada.sg/shop/haleon/","seller_id":"1144356081","seller_name":"Haleon"},
          "sold_count":"5.3K",
          "delivery_info":{"area_from":"Singapore"},
          "is_in_stock":True,
          "is_ad":False
        }],
    "ebay": 
      [{
          "title":"SEJOY Electric Toothbrush Sonic Movement Clean Teeth Portable Rechargeable",
          "price":"$18.90",
          "shipping":"Free shipping",
          "location":"",
          "rating":"",
          "image":"https://i.ebayimg.com/thumbs/images/g/hScAAOSwk0Blm6yh/s-l500.jpg",
          "url":"https://www.ebay.com/itm/126272235841?hash=item1d66696941:g:hScAAOSwk0Blm6yh&itmprp=enc%3AAQAJAAAAwIGtNSQwXDrToiiJo5PX2IzE1%2B%2BQR41BF8CENJFB65hYJ0mAukjOwgM8kxpe65%2FccCXOj2NNVAD54s4wmiHzZS%2Fbc0gF6Zz3tQwQS9Xz3mUIMygKblKxJCZAvxfeeF6pAvnzDjdkKc6FirZ%2FoReOO3OOyUEt57506MSFvXSSw0joGggB%2BX%2F0W5H5MeI7BEUaTZk9qXmgVxugBsu73%2FRdvsKD1B8Xtj03ZreWB%2BKd9Able9l6It%2BxpTHjUBRTIx9pfA%3D%3D%7Ctkp%3ABlBMUNTuzIzzYw",
          "id":"c4c0d5a0-7d5d-4fd6-8d49-22a1b37dcf66"
        },
        {
          "title":"Sonic Electric Toothbrush 8 Dupont Brush Heads 5 Modes Fast Charge Smart Timer",
          "price":"$16.90",
          "shipping":"Free shipping",
          "location":"",
          "rating":"",
          "image":"https://i.ebayimg.com/thumbs/images/g/RMsAAOSw9wBk3JHV/s-l500.jpg",
          "url":"https://www.ebay.com/itm/404872492538?hash=item5e4447f5fa:g:RMsAAOSw9wBk3JHV&itmprp=enc%3AAQAJAAAAwJM%2FKXa9FRVQuPHCdgi0m6Bgu2FuCMRlU%2FNVlwc7159f4Q50ETVsU6wXtmY5oCsAaAutwbJs3%2Bwz%2BoIsbxWsJc0M0zIuPg9nAjso%2F4PQTo0VnXcwcSUH3lSxlCE8oO1obQ%2Bt%2Blnldt8zzA8rCd4iWyfBYl4ofNEnjWs9Cd3xc4R4Wxqxg%2BH3%2FH6muzWrmMlcSRHAa5iWRjmJT9t2tBv%2BcXBwplgrCegzGey4ytIS784y5qm%2B%2BXJ%2BvLxBxIExBESQOg%3D%3D%7Ctkp%3ABlBMUNTuzIzzYw",
          "id":"8bc4266d-b461-492b-a15a-a7a59db17058"
        },
        {
          "title":"SEJOY Electric Toothbrush Sonic Toothbrush USB Rechargeable 7 Heads 3 Modes",
          "price":"$18.90",
          "shipping":"Free shipping",
          "location":"",
          "rating":"",
          "image":"https://i.ebayimg.com/thumbs/images/g/3JUAAOSw3HRk3Ebc/s-l140.jpg",
          "url":"https://www.ebay.com/itm/364422868922?hash=item54d94bafba:g:3JUAAOSw3HRk3Ebc&itmprp=enc%3AAQAJAAAAsFBZqgb0cBBc%2BL8GeJWnm74soxGEmHy3GJGp1WQSi%2BPuydOTF2QTs9yw%2F7ORP32fO799JSWVPabWFn%2Fwz12Phy4zKxgyDaDCnSDPt0Z6DFfwah844SubM7GZ1XqUcSlLZDQOhZ12mTkP3yttx2sdSa71EoRdeIoBEj3k8WqH6vw4bXyFmfyFEw7Hkh6QY5ZUoA3UuIaiDx4x1%2Fg3X1Phje3euNJhY9vNFeljfrJ3lIap%7Ctkp%3ABlBMUNTuzIzzYw",
          "id":"cbee0912-b321-42db-b33f-77f8ec6e0228"
        }]}
  return json.loads(json.dumps(res))
