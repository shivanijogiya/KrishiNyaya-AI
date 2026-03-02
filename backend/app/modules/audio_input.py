import speech_recognition as sr
from rag_ollama import ask_legal_question


def listen_from_mic():

    r = sr.Recognizer()

    with sr.Microphone() as source:

        print("🎤 Speak now...")

        r.adjust_for_ambient_noise(source)
        audio = r.listen(source)

        print("⏳ Processing speech...")

        try:
            # Google Speech API (auto language detection)
            text = r.recognize_google(audio)

            print("\n🗣 You said:", text)

            return text

        except Exception as e:
            print("❌ Could not understand audio:", e)
            return None


if __name__ == "__main__":

    while True:

        print("\nPress ENTER to speak or type exit")
        cmd = input()

        if cmd.lower() == "exit":
            break

        user_text = listen_from_mic()

        if user_text:
            answer = ask_legal_question(user_text)

            print("\n KrishiNyaya Answer:\n")
            print(answer)