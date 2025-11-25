 import http from 'k6/http';
import { check } from 'k6';
import { randomString } from "https://jslib.k6.io/k6-utils/1.2.0/index.js";
export let options = {

// // stress test:Find the system’s breaking point by gradually increasing load.
//   stages: [
//     { duration: '1m', target: 10 },
//     { duration: '1m', target: 50 },
//     { duration: '1m', target: 70 },
//     { duration: '1m', target: 100 },
//     { duration: '1m', target: 0 },
//   ],


//spike test: Check how the system reacts to a sudden, massive increase in load.
stages: [
    { duration: '10s', target: 10 },  // sudden spike
    { duration: '10s', target:70 },
    { duration: '5s', target: 0 }, 
  ],


//   thresholds: {
//     http_req_duration: ['p(95)<1500'], // system still must respond fast
//        // less than 5% failures allowed
//   },
};


const body ={
    "name": "ab"+randomString(5),
    "job": "leader"
}

const params = {
    headers: {
      "x-api-key": "reqres-free-v1"
    },
  };

export default function () {
  const response = http.post('https://reqres.in/api/users', body, params);

  check(response, {
    'is status 201': (r) => r.status === 201,
  });
}