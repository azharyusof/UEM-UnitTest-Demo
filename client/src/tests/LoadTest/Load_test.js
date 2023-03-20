/*
Load Testing is primarily concerned with assessing the current performance of your system
in terms of concurrent users or requests per second.

When you want to understand if your system is meeting the performance goals, this is the type of test you'll run.

Run a load test to:
- Assess the current performance of your system under typical and peak load
- Make sure you are continuously meeting the performance standards as you make changes to your system

Can be used to simulate a normal day in your business
*/

import http from 'k6/http';
import { check } from 'k6';

// Define the test data
const testData = {
  "id": 1,
  "votes": 1,
};

const BASE_URL = __ENV.BASE_URL || "http://localhost:5000";
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
  
}