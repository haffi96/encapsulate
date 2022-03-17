from fastapi import FastAPI
from fastapi.encoders import jsonable_encoder
from fastapi.responses import JSONResponse

app = FastAPI()


@app.get("/profile")
async def profile():
    json_data = jsonable_encoder({"user": "Haff"})
    return JSONResponse(json_data, status_code=200)
