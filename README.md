#  NyayaAI — AI Powered Indian Legal Assistant

NyayaAI is a **Retrieval-Augmented Generation (RAG)** based legal assistant designed to simplify access to Indian laws and governance information.

It uses real legal documents (Aadhaar Act, IT Act, Constitution, government FAQs) to retrieve relevant legal context and generate human-friendly answers using a **local LLM (Ollama)**.

---

##  Features

- Legal PDF ingestion (Indian Acts & governance docs)
- Semantic search using FAISS vector database
- RAG pipeline for accurate legal retrieval
- Local LLM inference using Ollama (no API billing)
- FastAPI backend ready for chatbot integration
- Focus on e-Governance & legal accessibility

---

## Architecture
User Question
↓
FAISS Vector Search (RAG)
↓
Relevant Legal Context
↓
Ollama LLM (Phi3 / Mistral)
↓
Human-friendly Legal Answer


---

## Project Structure

```
NyayaAI
│
├── backend
│ ├── app
│ │ └── modules
│ │ ├── document_loader.py
│ │ ├── vector_store.py
│ │ ├── rag_query.py
│ │ └── rag_ollama.py
│ │
│ ├── data
│ │ └── legal_docs
│ │ ├── aadhaar_act.pdf
│ │ ├── it_act_2000.pdf
│ │ └── constitution_india.pdf
│ │
│ └── faiss_index
│
└── frontend (planned)

```
---

##   Setup Instructions
```bash
 1️⃣ Clone Repository

git clone https://github.com/yourusername/nyayaai.git
cd nyayaai/backend

2️⃣ Create Virtual Environment
py -3.11 -m venv venv
venv\Scripts\activate

3️⃣ Install Dependencies
pip install fastapi uvicorn
pip install langchain langchain-community langchain-text-splitters
pip install sentence-transformers faiss-cpu pypdf
pip install ollama

4️⃣ Add Legal PDFs
```
Place all legal documents inside:

```bash
backend/data/legal_docs/
```
Example:

Aadhaar Act

IT Act 2000

Constitution of India

UIDAI FAQs

5️⃣ Create Vector Database
```bash

python app/modules/vector_store.py
```


This will generate:
```bash

faiss_index/
```
6️⃣ Run RAG Query (Without LLM)
```bash

python app/modules/rag_query.py
```

7️⃣ Run Full RAG + LLM

Install Ollama:
```bash

https://ollama.com/download
```
Download lightweight model:
```bash

ollama run phi3:mini
```
Run:
```bash

python app/modules/rag_ollama.py
```
## Tech Stack:

Python

FastAPI

LangChain

FAISS Vector Database

Sentence Transformers

Ollama (Local LLM)

RAG Architecture

## Future Improvements

Voice input (local language support)

Translation (Hindi / Tamil / Gujarati)

Lawyer escalation system

Web Chat UI

Mobile interface

## Project Goal

NyayaAI aims to bridge regulatory & governance gaps by making Indian legal information more accessible, understandable, and trustworthy using AI.

