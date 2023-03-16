
import http from "k6/http";
import { check } from "k6";

// Set up environment variables
const BASE_URL = __ENV.BASE_URL || "http://localhost:5000";

// Define the test data
const testData = {
  movie_id: 1,
  votes: "1",
};

// Define the threshold values
// const THRESHOLDS = {
//   vus: 1, // 1 user looping for 1 minute
//   duration: '1m',
//   "http_req_duration": ["p(95)<150"], // 95% of requests should complete within 150ms
//   "http_req_failed": ["rate<0.1"], // Less than 10% of requests should fail
// };

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