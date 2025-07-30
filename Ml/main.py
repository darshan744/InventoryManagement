from fastapi import FastAPI

app = FastAPI()

@app.get("/")
async def hello():
    return {"message": "Hello, World!"}

@app.get("/{item_id}")
def read_item(id):
    return {"item_id": id}
