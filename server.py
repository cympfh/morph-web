import json
import logging
import subprocess

from fastapi import FastAPI
from fastapi.staticfiles import StaticFiles

logger = logging.getLogger("uvicorn")
app = FastAPI(title="Morph", description="a web app for morph", version="2.0.0")


def morph(command: str) -> str:
    """Run morph command

    EXAMPLE
    -------
    >>> morph('ls anime --json')
    """
    fullcmd = ["morph"] + command.split(" ")
    logger.info("Executing: %s", " ".join(fullcmd))
    proc = subprocess.run(fullcmd, capture_output=True)
    return proc.stdout


@app.get("/morph/api/items")
async def items():
    """List up all Items"""
    data = morph("ls anime --json")
    return json.loads(data)


@app.post("/morph/api/inc/{id}")
async def inc(id: int):
    """Increment a Level"""
    return morph(f"inc anime/@{id}")


@app.post("/morph/api/mv/{id}/{state}")
async def mv(id: int, state: str):
    """Transit the State"""
    return morph(f"mv anime/@{id} {state}")


@app.post("/morph/api/new/{name}")
async def new(name: str):
    """New Item"""
    morph(f"new anime/{name}")


@app.put("/morph/api/undo")
async def undo():
    """Undo"""
    morph("undo anime")


app.mount("/morph", StaticFiles(directory="web/public", html=True), name="static")
