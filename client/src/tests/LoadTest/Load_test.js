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
import { check, sleep } from 'k6';

// export const options = {
//   insecureSkipTLSVerify: true,  //since running locally so skip TLS verify
//   noConnectReuse: false,
//   stages: [
//     { duration: '1m', target: 50 }, // simulate ramp-up of traffic from 1 to 100 users over 5 minutes.
//     { duration: '1m', target: 100 }, // stay at 100 users for 10 minutes.
//     { duration: '1m', target: 0 }, // ramp-down to 0 users
//   ], 
//   threshold: {
//     http_req_duration: ['p(99)<150'], // 99% of requests must complete below 150ms
//   }
// };


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
  
  check(res, { "response time is less than 500ms": (r) => r.timings.duration < 500 });
}