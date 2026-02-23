from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from app.modules.rag_ollama import ask_legal_question

app = FastAPI()

# allow frontend access
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

class Query(BaseModel):
    question: str


@app.get("/")
def home():
    return {"message": "NyayaAI Backend Running"}


@app.post("/ask")
def ask(query: Query):
    answer = ask_legal_question(query.question)
    return {"answer": answer}