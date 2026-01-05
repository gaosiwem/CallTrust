import { requestMLScore } from "../modules/scoring/ml.client";
import axios from "axios";

jest.mock("axios");

const mockedAxios = axios as jest.Mocked<typeof axios>;

it("returns ML score and risk level", async () => {
  mockedAxios.post.mockResolvedValueOnce({
    data: { score: 85, risk_level: "HIGH" },
  });

  const result = await requestMLScore({
    spamReports: 2,
    hasConsent: false,
    callAttempts24h: 4,
  });

  expect(result.score).toBeDefined();
  expect(result.risk_level).toMatch(/LOW|MEDIUM|HIGH/);
});
