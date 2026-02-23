from langchain_community.vectorstores import FAISS
from langchain_community.embeddings import HuggingFaceEmbeddings

from document_loader import load_documents


def create_vector_store():
    print("Loading documents...")
    chunks = load_documents()

    print("Loading embedding model...")
    embeddings = HuggingFaceEmbeddings(
        model_name="sentence-transformers/all-MiniLM-L6-v2"
    )

    print("Creating FAISS vector store...")
    vectorstore = FAISS.from_documents(chunks, embeddings)

    vectorstore.save_local("faiss_index")

    print("FAISS index saved successfully!")


if __name__ == "__main__":
    create_vector_store()