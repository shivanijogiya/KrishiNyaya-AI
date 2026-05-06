#  KrishiNyaya AI — Multilingual RAG Assistant for Indian Farmers

##  Overview

**KrishiNyaya AI** is a Retrieval-Augmented Generation (RAG) based AI assistant designed to help **Indian farmers** understand government schemes, subsidies, eligibility criteria, and agricultural policies in a **simple, trustworthy, and multilingual way**.


The system solves a major real-world problem:


Government scheme information is scattered across PDFs, portals, circulars, legal documents, and FAQs written in complex language and difficult for farmers to navigate.

KrishiNyaya AI converts fragmented official data into a **conversation-based assistant** that provides:

-  Citation-backed responses
-  Multilingual support
-  Audio input capability
-  PDF + Website + CSV based knowledge
-  Fast retrieval using vector databases
-  Local LLM generation using Ollama

---

## Purpose & Goals

### Problem Statement

Small and marginal farmers struggle because:

- Information is spread across multiple government portals
- Legal and scheme language is complex
- Scheme eligibility is unclear
- Updates are frequent and hard to track

Existing agri-chatbots focus on farming tips — not **policy interpretation**.

---

### Project Goals

KrishiNyaya AI aims to:

1. Provide **accurate scheme guidance** grounded in official documents.
2. Generate **workflow-based answers**:
   - Eligibility
   - Required documents
   - Application steps
   - Authority contacts
   - Escalation paths
3. Reduce hallucinations using strict RAG grounding.
4. Support multiple Indian languages.
5. Enable voice-based interactions for accessibility.

---

##  What Makes This Project Different

Unlike normal chatbots:

✔ Uses **Multimodal RAG** (PDF + Web + CSV + Text)  
✔ Uses **FAISS Vector Search** for fast retrieval  
✔ Uses **Ollama local LLM** (offline capable)  
✔ Includes **Hallucination Safety Layer**  
✔ Supports multilingual translation pipeline  
✔ Designed specifically for Indian governance & agriculture

---

## High-Level Architecture

```
User Question / Voice
↓
Language Detection + Translation
↓
FAISS Vector Search (RAG)
↓
Relevant Official Context
↓
Ollama LLM (TinyLlama / Phi / Mistral)
↓
Structured Workflow Answer
↓
Translate back to User Language
↓
Frontend Chat UI
```

---

## 🗂️ Project Structure

```
KrishiNyaya
│
├── backend
│ ├── app
│ │ └── modules
│ │ ├── document_loader.py # PDF + text loading
│ │ ├── web_loader.py # Website ingestion
│ │ ├── vector_store.py # FAISS index creation
│ │ ├── rag_query.py # Retrieval testing
│ │ ├── rag_ollama.py # Main RAG pipeline
│ │ └── audio_input.py # Voice recognition
│ │
│ ├── data
│ │ └── scheme_docs
│ │ ├── central_schemes
│ │ ├── state_schemes
│ │ ├── faq
│ │ ├── eligibility_tables
│ │ ├── workflows
│ │ └── website_text
│ │
│ ├── faiss_index # Vector database
│ └── app/main.py # FastAPI backend
│
├── frontend
│ ├── src/components
│ │ ├── LandingPage.tsx
│ │ └── ChatInterface.tsx
│ │
│ └── public
│ └── images / UI assets
│
└── README.md
```

---

##  Backend — What It Actually Does

The backend is the **core intelligence** of this project.

### Step 1 — Data Ingestion

Sources include:

- Government PDFs
- Scheme guidelines
- FAQ documents
- CSV eligibility tables
- Official websites

Loaded using:

- `PyPDFLoader`
- `BeautifulSoup`
- CSV → text converters

---

### Step 2 — Text Chunking

Documents are split into semantic chunks using:

```python
RecursiveCharacterTextSplitter

Purpose:

Improve retrieval accuracy

Reduce hallucination

Faster embedding search
```
Step 3 — Embeddings

Each chunk is converted into embeddings using:
```
sentence-transformers/all-MiniLM-L6-v2
```
Step 4 — Vector Database (FAISS)

Embeddings stored in:
```
FAISS Vector Store

Allows:

Semantic similarity search

Fast retrieval from large datasets
```
Step 5 — RAG Pipeline

When user asks a question:
```
Translate → English

Retrieve top relevant chunks

Apply safety confidence check

Construct structured prompt

Send context to Ollama model
```
Step 6 — LLM Generation (Ollama)

Local LLM generates response:

Examples:
```
TinyLlama

Phi-3

Mistral
```
### Output format:
```
1️⃣ Eligibility
2️⃣ Required Documents
3️⃣ Application Steps
4️⃣ Government Authority
5️⃣ Escalation if Rejected
```
Step 7 — Translation Layer

Answer translated back to user language:
```
Hindi

Gujarati

Tamil

Telugu

Kannada

Bengali

etc.
```
### Audio & Multilingual Support
```
Voice pipeline:

Speech → Text
        ↓
Translate → English
        ↓
RAG Search
        ↓
Generate Answer
        ↓
Translate Back
```
Libraries:
```
SpeechRecognition

Deep Translator
```
## Frontend Overview

```
Landing Page

Language tags

Project introduction

Animated visuals

Navigate to chat

Chat Interface

```
### Features:
```
 Chat bubbles

 Voice input

 Language-aware responses

 Copy responses

 Live backend answers

 Tech Stack
```
### Backend
```
Python

FastAPI

LangChain

FAISS

Sentence Transformers

Ollama

BeautifulSoup

Deep Translator

### Frontend

React + TypeScript

Vite

CSS animations

Lucide Icons
```
### Core Innovations
Multilingual RAG Pipeline
Workflow-Based AI Responses
Hallucination Prevention Layer
Voice + AI + Translation Integration
Government Scheme Intelligence System

### Real-World Impact
Helps farmers understand schemes easily
Reduces dependency on agents/middlemen
Prevents misinformation
Improves scheme adoption
Enables digital inclusion

####  Future Scope
Image-based query (crop/land docs)
Offline mobile app
Integration with govt APIs
Personalized scheme recommendation

### 👤 Author

Shivani Jogiya
KrishiNyaya AI Project
