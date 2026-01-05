from pydantic import BaseModel

class ScoreRequest(BaseModel):
    spam_reports: int
    has_consent: bool
    call_attempts_24h: int

class ScoreResponse(BaseModel):
    score: int
    risk_level: str
