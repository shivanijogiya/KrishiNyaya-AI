import requests
from bs4 import BeautifulSoup
import os

# folder where text files saved
SAVE_FOLDER = "data/scheme_docs/website_texts"

# list of government websites
WEBSITES = [
    "https://pmkisan.gov.in",
    "https://pmfby.gov.in",
    "https://enam.gov.in/web/",
    "https://agricoop.nic.in",
    "https://www.india.gov.in/topics/agriculture"
]


def clean_text(text):
    return " ".join(text.split())


def scrape_website(url):
    print(f"Scraping {url}...")
    html = requests.get(url, timeout=10).text
    soup = BeautifulSoup(html, "html.parser")
    text = soup.get_text()
    return clean_text(text)


def save_text(url, text):
    name = url.replace("https://", "").replace("/", "_")
    filename = os.path.join(SAVE_FOLDER, f"{name}.txt")

    with open(filename, "w", encoding="utf-8") as f:
        f.write(text)


if __name__ == "__main__":

    os.makedirs(SAVE_FOLDER, exist_ok=True)

    for url in WEBSITES:
        try:
            text = scrape_website(url)
            save_text(url, text)
            print("Saved.")
        except Exception as e:
            print("Error:", e)