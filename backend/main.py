# main.py
from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from typing import List, Optional
import os

from dotenv import load_dotenv
import uuid

from langchain_groq import ChatGroq
from langchain.text_splitter import RecursiveCharacterTextSplitter
from langchain_community.document_loaders import DirectoryLoader, TextLoader
from langchain_community.vectorstores import Chroma
from langchain_huggingface import HuggingFaceEmbeddings
from langchain.chains import ConversationalRetrievalChain
from langchain.memory import ConversationBufferMemory
from langchain.prompts import PromptTemplate

load_dotenv()

app = FastAPI(title="Portfolio AI Assistant")

# CORS - Update with your actual frontend URL
app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:3000",
        "http://localhost:5173",
        "https://excellenttorch.com"  # Portfolio URL
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Global variables
vector_store = None
qa_chain = None
sessions = {}

# Pydantic models
class ChatRequest(BaseModel):
    message: str
    session_id: Optional[str] = None

class ChatResponse(BaseModel):
    response: str
    session_id: str
    sources: Optional[List[str]] = None

# Initialize RAG components
def initialize_rag():
    global vector_store, qa_chain
    
    # 1. Load documents from data/documents folder
    loader = DirectoryLoader(
        './data/documents',
        glob="**/*.txt",  # Adjust for your file types: .md, .pdf, etc.
        loader_cls=TextLoader
    )
    documents = loader.load()
    
    # 2. Split documents into chunks
    text_splitter = RecursiveCharacterTextSplitter(
        chunk_size=1000,
        chunk_overlap=200,
        length_function=len
    )
    chunks = text_splitter.split_documents(documents)
    
    # 3. Create embeddings
    embeddings = HuggingFaceEmbeddings(
        model_name="sentence-transformers/all-MiniLM-L6-v2",
        model_kwargs={'device': 'cpu'}
    )
    
    # 4. Create vector store
    vector_store = Chroma.from_documents(
        documents=chunks,
        embedding=embeddings,
        persist_directory="./chroma_db"
    )
    
    # 5. Initialize Groq LLM
    llm = ChatGroq(
        groq_api_key=os.getenv("GROQ_API_KEY"),
        model_name="llama-3.1-8b-instant",  # Adjust for your model
        temperature=0.3,
        max_tokens=1024
    )
    
    # 6. Create custom prompt
    prompt_template = """You are a knowledgeable AI assistant for a professional portfolio website. 
You have access to information about the portfolio owner's projects, skills, experience, and resume.

Use the following context to answer questions accurately and professionally. 
If you're not sure about something, say so rather than making up information.

Context: {context}

Chat History: {chat_history}

Question: {question}

Provide a helpful, professional response that showcases the portfolio owner's qualifications and work:"""

    PROMPT = PromptTemplate(
        template=prompt_template,
        input_variables=["context", "chat_history", "question"]
    )
    
    # 7. Create conversational retrieval chain
    qa_chain = ConversationalRetrievalChain.from_llm(
        llm=llm,
        retriever=vector_store.as_retriever(search_kwargs={"k": 3}),
        return_source_documents=True,
        combine_docs_chain_kwargs={"prompt": PROMPT}
    )
    
    print("RAG system initialized successfully!")

# Initialize on startup
@app.on_event("startup")
async def startup_event():
    try:
        initialize_rag()
    except Exception as e:
        print(f"Error initializing RAG: {str(e)}")
        print("Make sure you have:")
        print("1. Created ./data/documents folder with your content")
        print("2. Set GROQ_API_KEY in .env file")

@app.get("/")
async def root():
    return {"status": "ok", "message": "Portfolio AI Assistant API"}

@app.get("/api/health")
async def health_check():
    return {
        "status": "healthy",
        "rag_initialized": vector_store is not None,
        "active_sessions": len(sessions)
    }

@app.post("/api/chat", response_model=ChatResponse)
async def chat(request: ChatRequest):
    global qa_chain, sessions
    
    if qa_chain is None:
        raise HTTPException(status_code=503, detail="RAG system not initialized")
    
    # Generate or use existing session ID
    session_id = request.session_id or str(uuid.uuid4())
    
    # Get or create memory for this session
    if session_id not in sessions:
        sessions[session_id] = ConversationBufferMemory(
            memory_key="chat_history",
            return_messages=True,
            output_key="answer"
        )
    
    try:
        # Get response from RAG chain
        result = qa_chain.invoke({
            "question": request.message,
            "chat_history": sessions[session_id].load_memory_variables({})["chat_history"]
        })
        
        # Update memory
        sessions[session_id].save_context(
            {"question": request.message},
            {"answer": result["answer"]}
        )
        
        # Extract source information
        sources = []
        if "source_documents" in result:
            sources = [doc.metadata.get("source", "Unknown") for doc in result["source_documents"]]
            sources = list(set(sources))  # Remove duplicates
        
        return ChatResponse(
            response=result["answer"],
            session_id=session_id,
            sources=sources
        )
        
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error processing chat: {str(e)}")

@app.post("/api/chat/new-session")
async def new_session():
    """Create a new chat session"""
    session_id = str(uuid.uuid4())
    return {"session_id": session_id}

@app.delete("/api/chat/session/{session_id}")
async def delete_session(session_id: str):
    """Delete a chat session"""
    if session_id in sessions:
        del sessions[session_id]
        return {"message": "Session deleted"}
    raise HTTPException(status_code=404, detail="Session not found")

@app.post("/api/documents/refresh")
async def refresh_documents():
    """Rebuild the vector store with updated documents"""
    try:
        initialize_rag()
        return {"message": "Documents refreshed successfully"}
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error refreshing documents: {str(e)}")

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8080)