from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from typing import Dict, Any, List
import storage

app = FastAPI(
    title="LearnPilot Student AI Engine — SIH Student Innovation",
    description="Adaptive Diagnostic & Mastery Tracking API",
    version="1.0.0"
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.on_event("startup")
def on_startup():
    storage.init_db()


class SubmitTestRequest(BaseModel):
    answers: Dict[str, str]


@app.get("/health")
def health_check():
    return {"status": "online", "service": "LearnPilot Student AI"}


@app.get("/api/dashboard")
def get_dashboard():
    return storage.get_student_dashboard()


@app.get("/api/questions")
def get_questions():
    return {"questions": storage.get_all_questions()}


@app.post("/api/submit-test")
def submit_test(payload: SubmitTestRequest):
    return storage.evaluate_test(payload.answers)
