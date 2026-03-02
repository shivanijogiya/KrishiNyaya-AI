import os
import pandas as pd

from langchain_community.document_loaders import PyPDFLoader, TextLoader
from langchain_text_splitters import RecursiveCharacterTextSplitter


# 🔥 ROOT DATA PATH (new structure)
DATA_PATH = "data/scheme_docs"


def load_documents():

    all_docs = []

    print("📂 Scanning data folders...\n")

    # Walk through ALL subfolders automatically
    for root, dirs, files in os.walk(DATA_PATH):

        for file in files:

            file_path = os.path.join(root, file)

            try:
                # -------------------------
                # PDF LOADER
                # -------------------------
                if file.lower().endswith(".pdf"):
                    print(f"📄 Loading PDF: {file}")
                    loader = PyPDFLoader(file_path)
                    docs = loader.load()
                    all_docs.extend(docs)

                # -------------------------
                # TEXT LOADER (websites etc)
                # -------------------------
                elif file.lower().endswith(".txt"):
                    print(f"🌐 Loading TXT: {file}")
                    loader = TextLoader(file_path, encoding="utf-8")
                    docs = loader.load()
                    all_docs.extend(docs)

                # -------------------------
                # CSV LOADER (VERY IMPORTANT)
                # -------------------------
                elif file.lower().endswith(".csv"):
                    print(f"📊 Loading CSV: {file}")

                    df = pd.read_csv(file_path)
                    text = df.to_string(index=False)

                    all_docs.append({
                        "page_content": text,
                        "metadata": {"source": file_path}
                    })

            except Exception as e:
                print(f"❌ Error loading {file}: {e}")

    print(f"\n✅ Loaded {len(all_docs)} raw documents")

    # -------------------------
    # TEXT SPLITTING
    # -------------------------
    splitter = RecursiveCharacterTextSplitter(
        chunk_size=800,
        chunk_overlap=150
    )

    chunks = splitter.split_documents(all_docs)

    print(f"✅ Created {len(chunks)} chunks\n")

    return chunks