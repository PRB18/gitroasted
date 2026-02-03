# 🌶️ GitRoasted

**"Your code is bad, and you should feel bad."**

GitRoasted is a Full-Stack AI application that ruthlessly roasts your bad code and then fixes it. Powered by **Google Gemini AI**, it turns code reviews into a humbling (and educational) experience.

![Screenshot of GitRoasted](path-to-your-screenshot.png)
## 🚀 The Stack
* **Frontend:** React + Vite (Cyberpunk UI)
* **Backend:** Python + FastAPI
* **AI Engine:** Google Gemini (genai)
* **Styling:** Pure CSS (Neon/Hacker Theme)

## ✨ Features
* **AI Roast:** Sarcastic, critical feedback on code quality.
* **Auto-Fix:** Automatically generates corrected, clean code.
* **Cyberpunk UI:** Glowing borders, typewriter effects, and terminal vibes.
* **One-Click Copy:** Easily grab the fixed code.

## 🛠️ How to Run (Local Setup)

You need **two terminals** open to run this project.

### Terminal 1: The Backend (Server)
```bash
cd server

# 1. Create & Activate Virtual Environment (Windows)
python -m venv venv
venv\Scripts\activate

# 2. Install Dependencies
pip install -r requirements.txt

# 3. Setup API Key
# Create a .env file in /server and add: GEMINI_API_KEY=your_key_here

# 4. Start Server
python main.py
# Server running at http://localhost:8000

Terminal 2: The Frontend (Client)

# Go to root directory
npm install
npm run dev
# App running at http://localhost:5173

🤝 Contributing
Feel free to fork this repo and add more roasting personalities!

Built for the Hackathon by [Rishi] & [Jeev Joel].