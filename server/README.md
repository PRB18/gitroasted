# GitRoasted API Server

This is the backend server for GitRoasted, powered by **FastAPI** and **Google Gemini intelligence**. It provides an endpoint to roast code snippets or appreciate them if they are perfect.

## 🚀 Getting Started

### Prerequisites
- Python 3.10+
- A Google Gemini API Key

### Installation

1. Navigate to the server directory:
   ```bash
   cd server
   ```

2. Create a virtual environment and install dependencies:
   ```bash
   python3 -m venv venv
   source venv/bin/activate  # On Windows: venv\Scripts\activate
   pip install -r requirements.txt
   ```

3. Setup environment variables:
   Create a `.env` file in the `/server` directory:
   ```env
   GEMINI_API_KEY=your_actual_api_key_here
   ```

### Running the Server
```bash
python main.py
```
The server will start on `http://localhost:8000`.

---

## 🛠 API Endpoints

### 1. Roast Code
**Endpoint:** `POST /roast`

Analyze a code snippet for bugs, bad practices, or perfection.

**Request Body:**
```json
{
  "code": "print('Hello World')\nimport os\nos.system('rm -rf /')"
}
```

**Response Body (JSON):**
```json
{
  "roast": "Nice try, script kiddie. Attempting a 'rm -rf /' is the coding equivalent of trying to breathe underwater with a straw. Try something that doesn't involve nuclear-level destruction next time.",
  "fixed_code": "print('Hello World')\n# Deleted the part where you try to destroy the world."
}
```

**Status Codes:**
- `200 OK`: Success.
- `400 Bad Request`: Empty code snippet.
- `500 Internal Server Error`: API Key missing or Gemini service error.

---

## 🔧 Frontend Integration Example

```javascript
const response = await fetch('http://localhost:8000/roast', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
  },
  body: JSON.stringify({
    code: userCodeSnippet
  }),
});

const data = await response.json();
console.log(data.roast);      // The sarcastic roast or appreciation
console.log(data.fixed_code); // The corrected version of the code
```

## 🤖 Technology Stack
- **FastAPI**: Modern, high-performance web framework.
- **Google GenAI (Gemini)**: Specifically using `gemini-2.0-flash` (or newer) for lightning-fast and extremely witty roasts.
- **Pydantic**: For strict data validation and schema documentation.
