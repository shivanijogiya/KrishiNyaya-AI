from langchain_community.vectorstores import FAISS
from langchain_community.embeddings import HuggingFaceEmbeddings
import ollama


def ask_legal_question(query):

    embeddings = HuggingFaceEmbeddings(
        model_name="sentence-transformers/all-MiniLM-L6-v2"
    )

    db = FAISS.load_local(
        "faiss_index",
        embeddings,
        allow_dangerous_deserialization=True
    )

    docs = db.similarity_search(query, k=3)

    context = "\n\n".join([doc.page_content for doc in docs])

    prompt = f"""
You are NyayaAI, an Indian legal assistant.

Use ONLY the legal context below to answer.

Context:
{context}

Question:
{query}

Answer clearly in simple language.
"""

    response = ollama.chat(
        model="tinyllama",
        messages=[{"role": "user", "content": prompt}]
    )

    print("\n🧠 NyayaAI Answer:\n")
    return response["message"]["content"]

# USER INPUT MODE
if __name__ == "__main__":
    while True:
        user_question = input("\nAsk your legal question (type 'exit' to quit): ")

        if user_question.lower() == "exit":
            print("Exiting NyayaAI...")
            break

        ask_legal_question(user_question)