import json
import subprocess

from fastapi import FastAPI
from fastapi.responses import HTMLResponse

app = FastAPI()


@app.get("/morph/api/items")
async def items():
    p = subprocess.run(["morph", "ls", "anime", "--json"], capture_output=True)
    return json.loads(p.stdout)


@app.post("/morph/api/inc/{id}")
async def inc(id: int):
    subprocess.run(["morph", "inc", f"anime/@{id}"], capture_output=True)


@app.post("/morph/api/mv/{id}/{state}")
async def mv(id: int, state: str):
    subprocess.run(["morph", "mv", f"anime/@{id}", state], capture_output=True)


@app.post("/morph/api/new/{name}")
async def new(name: str):
    subprocess.run(["morph", "new", f"anime/{name}"], capture_output=True)


@app.put("/morph/api/undo")
async def undo():
    subprocess.run(["morph", "undo", "anime"], capture_output=True)


@app.get("/morph", response_class=HTMLResponse)
@app.get("/", response_class=HTMLResponse)
async def index():
    return open("index.html").read()
