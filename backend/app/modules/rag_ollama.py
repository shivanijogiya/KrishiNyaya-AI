from langchain_community.vectorstores import FAISS
from langchain_community.embeddings import HuggingFaceEmbeddings
import ollama
from deep_translator import GoogleTranslator


def ask_legal_question(query):

    # -----------------------------------
    # 1️⃣ Detect user language
    # -----------------------------------
    try:
        detected_lang = GoogleTranslator(
            source='auto',
            target='en'
        ).detect(query)
    except:
        detected_lang = "en"

    # -----------------------------------
    # 2️⃣ Translate → English
    # -----------------------------------
    translated_query = GoogleTranslator(
        source='auto',
        target='en'
    ).translate(query)

    # -----------------------------------
    # 3️⃣ Load Vector DB
    # -----------------------------------
    embeddings = HuggingFaceEmbeddings(
        model_name="sentence-transformers/all-MiniLM-L6-v2"
    )

    db = FAISS.load_local(
        "faiss_index",
        embeddings,
        allow_dangerous_deserialization=True
    )

    # -----------------------------------
    # 4️⃣ Safety Layer
    # -----------------------------------
    docs_with_score = db.similarity_search_with_score(
        translated_query,
        k=3
    )

    if docs_with_score[0][1] > 1.2:
        warning_msg = "⚠ I cannot find enough official scheme information."
        return GoogleTranslator(
            source='en',
            target=detected_lang
        ).translate(warning_msg)

    docs = [doc for doc, score in docs_with_score]

    # -----------------------------------
    # 5️⃣ Build context + citations
    # -----------------------------------
    context_parts = []
    citations = []

    for doc in docs:

        context_parts.append(doc.page_content)

        source = doc.metadata.get("source", "Unknown Source")
        page = doc.metadata.get("page", "N/A")

        citations.append(f"{source} (Page {page})")

    context = "\n\n".join(context_parts)

    unique_citations = list(set(citations))

    # -----------------------------------
    # 6️⃣ Prompt
    # -----------------------------------
    prompt = f"""
You are KrishiNyaya RAG.

Answer ONLY using provided context.

Return answer in this format:

1️⃣ Eligibility
2️⃣ Required Documents
3️⃣ Application Steps
4️⃣ Government Authority
5️⃣ Escalation if Rejected

If info missing, say "Not found in official documents".

Context:
{context}

Question:
{translated_query}
"""

    # -----------------------------------
    # 7️⃣ LLM Call
    # -----------------------------------
    response = ollama.chat(
        model="tinyllama",
        messages=[{"role": "user", "content": prompt}]
    )

    english_answer = response["message"]["content"]

    # -----------------------------------
    # 8️⃣ Append citations
    # -----------------------------------
    citation_text = "\n\n📚 Sources:\n"

    for c in unique_citations:
        citation_text += f"• {c}\n"

    final_english_output = english_answer + citation_text

    # -----------------------------------
    # 9️⃣ Translate back to user language
    # -----------------------------------
    final_answer = GoogleTranslator(
        source='en',
        target=detected_lang
    ).translate(final_english_output)

    return final_answer


# -----------------------------------
# USER INPUT MODE
# -----------------------------------
if __name__ == "__main__":

    while True:

        user_question = input("\nAsk your question (type 'exit'): ")

        if user_question.lower() == "exit":
            print("Exiting KrishiNyaya...")
            break

        result = ask_legal_question(user_question)

        print("\n🧠 KrishiNyaya Answer:\n")
        print(result)