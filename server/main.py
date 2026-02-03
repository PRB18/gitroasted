import os
import json
from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from google import genai
from dotenv import load_dotenv

# Load environment variables
load_dotenv()

app = FastAPI()

# Add CORS middleware to allow requests from the client
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Allow all origins for development
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Initialize Google GenAI client lazily or if key available
# In the new SDK, we create a Client instance.
client = None
if os.getenv("GEMINI_API_KEY"):
    client = genai.Client(api_key=os.getenv("GEMINI_API_KEY"))

class CodeSnippet(BaseModel):
    code: str

class RoastResponse(BaseModel):
    roast: str
    fixed_code: str

@app.post("/roast", response_model=RoastResponse)
async def roast_code(snippet: CodeSnippet):
    """
    Endpoint that receives a code snippet.
    Returns a roast (or appreciation) and the fixed code.
    """
    if not snippet.code.strip():
        raise HTTPException(status_code=400, detail="Code snippet cannot be empty.")
    
    current_key = os.getenv("GEMINI_API_KEY")
    if not current_key:
         raise HTTPException(status_code=500, detail="Gemini API Key not found. Please set GEMINI_API_KEY environment variable.")
    
    # Initialize client if not already done (or if key changed, though simple check here)
    global client
    if not client:
        client = genai.Client(api_key=current_key)

    system_prompt = (
        "You are a sarcastic coding assistant. "
        "Receive a code snippet and do the following:\n"
        "1. Analyze the code.\n"
        "2. If the code has errors, bugs, or bad practices, roast it sarcastically.\n"
        "3. If the code is correct and follows best practices, appreciate the user instead of roasting.\n"
        "4. Provide a corrected version of the code without errors.\n\n"
        "Return the output in JSON format with exactly these keys:\n"
        "- \"roast\": The text of the roast or appreciation.\n"
        "- \"fixed_code\": The corrected code snippet.\n"
    )

    try:
        # Use simple generate_content with config for JSON
        # Note: newer SDK handles structured output well with config
        response = client.models.generate_content(
            model="gemini-2.5-flash",
            contents=f"{system_prompt}\n\nHere is the code snippet:\n{snippet.code}",
            config={
                "response_mime_type": "application/json"
            }
        )
        
        content = response.text
        if not content:
             raise ValueError("Empty response from Gemini")
             
        data = json.loads(content)
        
        return RoastResponse(
            roast=data.get("roast", "No roast generated."),
            fixed_code=data.get("fixed_code", snippet.code) # Fallback to original code if fix missing
        )

    except Exception as e:
        print(f"Error processing request: {e}")
        raise HTTPException(status_code=500, detail=str(e))

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)

