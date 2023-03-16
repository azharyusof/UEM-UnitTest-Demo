import http from 'k6/http';
import { check, sleep } from 'k6';

export const options = {
  insecureSkipTLSVerify: true,  //since running locally so skip TLS verify
  noConnectReuse: false,
  stages: [
    { duration: '1m', target: 50 }, // simulate ramp-up of traffic from 1 to 100 users over 5 minutes.
    { duration: '1m', target: 50 }, // stay at 100 users for 10 minutes.
    { duration: '1m', target: 0 }, // ramp-down to 0 users
  ], 
  threshold: {
    http_req_duration: ['p(99)<150'], // 99% of requests must complete below 150ms
  }
};

export default function () {
  const res = http.get('https://example.com/');
  check(res, { 'status was 200': (r) => r.status == 200 });
  sleep(1);
}