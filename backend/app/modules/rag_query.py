from langchain_community.vectorstores import FAISS
from langchain_community.embeddings import HuggingFaceEmbeddings


def ask_question(query):

    embeddings = HuggingFaceEmbeddings(
        model_name="sentence-transformers/all-MiniLM-L6-v2"
    )

    db = FAISS.load_local("faiss_index", embeddings, allow_dangerous_deserialization=True)

    docs = db.similarity_search(query, k=3)

    print("\nTop matching legal chunks:\n")

    for i, doc in enumerate(docs):
        print(f"\n--- Result {i+1} ---")
        print(doc.page_content)


if __name__ == "__main__":
    ask_question("What is Aadhaar data privacy law in India?")