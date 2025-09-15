from fastapi import FastAPI, HTTPException
from pydantic import BaseModel
import os
from groq import Groq

from dotenv import load_dotenv
load_dotenv()  # Load environment variables from .env file

app = FastAPI()


GROQ_API_KEY = os.getenv("GROQ_API_KEY")

# Initialize Groq client
client = Groq(api_key=GROQ_API_KEY)

class GenerateRequest(BaseModel):
    messages: list[dict[str, str]]  # List of {"role": "system/user/assistant", "content": "text"}
    model: str = "llama3.1-8b-instant"  # Default model
    temperature: float = 0.7
    max_tokens: int = 512

class GenerateResponse(BaseModel):
    content: str

@app.post("/generate", response_model=GenerateResponse)
async def generate(request: GenerateRequest):
    if not GROQ_API_KEY:
        raise HTTPException(status_code=500, detail="Groq API key not configured")
    
    try:
        completion = client.chat.completions.create(
            messages=request.messages,
            model=request.model,
            temperature=request.temperature,
            max_tokens=request.max_tokens
        )
        return GenerateResponse(content=completion.choices[0].message.content)
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

# Check endpoint status
@app.get("/health")
async def health():
    return {"status": "healthy"}

