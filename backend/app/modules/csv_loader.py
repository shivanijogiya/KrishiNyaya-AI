import pandas as pd
import os

CSV_FOLDER = "data/scheme_docs/eligibility_tables"
OUTPUT_FOLDER = "data/scheme_docs/eligibility_tables"

def convert_csv(csv_file):
    df = pd.read_csv(csv_file)

    text = df.to_string(index=False)

    txt_file = csv_file.replace(".csv", ".txt")

    with open(txt_file, "w", encoding="utf-8") as f:
        f.write(text)

if __name__ == "__main__":
    for file in os.listdir(CSV_FOLDER):
        if file.endswith(".csv"):
            convert_csv(os.path.join(CSV_FOLDER,file))
            print(file, "converted")