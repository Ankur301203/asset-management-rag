from fastapi import FastAPI, Request
from pydantic import BaseModel
from backend.langchain_agent import handle_query

app = FastAPI()

class QueryRequest(BaseModel):
    query: str

@app.post("/ask")
async def ask_question(req: QueryRequest):
    response = handle_query(req.query)
    return {"response": response}
