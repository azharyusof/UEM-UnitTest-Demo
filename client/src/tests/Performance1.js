import http from 'k6/http';
import { check, sleep } from 'k6';

export let options = {
  vus: 100, // Number of virtual users
  duration: '30s', // Duration of the test
};

export default function () {
  let res = http.get('https://example.com');
  check(res, { 'response time is less than 4 seconds': (r) => r.timings.duration < 4000 });
  sleep(1); // Wait for 1 second before sending the next request
}
