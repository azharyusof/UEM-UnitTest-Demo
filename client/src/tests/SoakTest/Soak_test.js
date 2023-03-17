/*
Soak testing is used to validate reliability of the system over a long time

Run soak test to:
- Verify that your system doesn't suffer from bugs or memory leaks, which result in a crash or restart after
- Verify that expected application restarts don't lose requests
- Find bugs related to race-conditions that appear sporadically
- Make sure your database doesn't exhaust the allotted storage space and stops
- Make sure your logs don't exhaust the allotted disk storage
- Make sure the external services you depend on don't stop working after a certain amount of requests are executed

How to run a soak test:
- Determine the maximum amount of users your system can handle
- Get the 75-80% of that value
- Set VUS to that value
- Run the test in 3 stages. Ramp up to the VUS, stay there for 4-12 hours, rump down to 0
*/

import http from 'k6/http';
import { check, sleep } from 'k6';

// export let options = {
//     insecureSkipTLSVerify: true,
//     noConnectReuse: false,
//     stages: [
//         { duration: '2m', target: 400}, // ramp up to 400 users
//         { duration: '3h56m', target: 400}, // stay at 400 users for ~4 hours
//         { duration: '10m', target: 0}, // scale down. Recovery stage.
//     ]
// }

const BASE_URL = __ENV.BASE_URL || "http://localhost:5000";

// Define the test data
const testData = {
  "id": 1,
  "votes": 1,
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