import numpy as np
from sklearn.linear_model import LogisticRegression

_model = LogisticRegression()

def train_initial_model():
    X = np.array([
        [0, 1, 1],
        [1, 0, 2],
        [2, 0, 3],
        [3, 0, 5],
        [4, 0, 7],
    ])
    y = np.array([0, 0, 1, 1, 1])
    _model.fit(X, y)

def predict_risk(features):
    # prob of class 1 (high risk)
    probability = _model.predict_proba([features])[0][1]
    return probability
