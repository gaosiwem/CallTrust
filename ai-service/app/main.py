from fastapi import FastAPI
from app.schemas import ScoreRequest, ScoreResponse
from app.scoring import calculate_score
from app.model import train_initial_model

app = FastAPI()

train_initial_model()

@app.post("/score", response_model=ScoreResponse)
def score(req: ScoreRequest):
    score, risk = calculate_score(
        req.spam_reports,
        req.has_consent,
        req.call_attempts_24h
    )

    return {
        "score": score,
        "risk_level": risk
    }
