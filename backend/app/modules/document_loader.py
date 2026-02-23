from langchain_community.document_loaders import PyPDFLoader
from langchain_text_splitters import RecursiveCharacterTextSplitter
import os
DATA_PATH = "data/legal_docs"

def load_documents():
    docs = []

    for file in os.listdir(DATA_PATH):
        if file.endswith(".pdf"):
            path = os.path.join(DATA_PATH, file)
            loader = PyPDFLoader(path)
            docs.extend(loader.load())

    print(f"Loaded {len(docs)} pages")

    splitter = RecursiveCharacterTextSplitter(
        chunk_size=500,
        chunk_overlap=50
    )

    chunks = splitter.split_documents(docs)

    print(f"Created {len(chunks)} chunks")

    return chunks


if __name__ == "__main__":
    load_documents()