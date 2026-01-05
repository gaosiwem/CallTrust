from app.scoring import calculate_score

def test_high_risk():
    score, risk = calculate_score(5, False, 10)
    assert risk == "HIGH"

def test_low_risk():
    score, risk = calculate_score(0, True, 1)
    assert risk == "LOW"
