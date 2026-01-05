from app.model import predict_risk

def calculate_score(spam_reports: int, has_consent: bool, call_attempts: int):
    features = [
        spam_reports,
        0 if has_consent else 1,
        call_attempts
    ]

    probability = predict_risk(features)
    score = int(probability * 100)

    if score >= 70:
        risk = "HIGH"
    elif score >= 40:
        risk = "MEDIUM"
    else:
        risk = "LOW"

    return score, risk
