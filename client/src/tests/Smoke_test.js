
import http from "k6/http";
import { check } from "k6";

// Set up environment variables
const BASE_URL = __ENV.BASE_URL || "http://localhost:5000";

// Define the test data
const testData = {
  "id": 1,
  "votes": 1,
};


export const options = {
  vus: 1, // 1 user looping for 1 minute
  duration: '1m',
  thresholds: {
    http_req_duration: ['p(99)<150'], // 99% of requests must complete below 1.5s
  },
};

// Define the test function
export default function () {
  const url = `${BASE_URL}/movies`;
  const params = {
    headers: {
      "Content-Type": "application/json",
    },
  };
  const res = http.post(url, JSON.stringify(testData), params);
  check(res, { "status is 200": (r) => r.status === 200 });
  check(res, { "response time is less than 500ms": (r) => r.timings.duration < 500 });
}