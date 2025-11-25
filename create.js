import http from 'k6/http';
import { check } from 'k6';

// export const options = {
//   scenarios: {
//     request: {
//       executor: 'per-vu-iterations',
//       vus: 30,
//       iterations: 2,
      
//       maxDuration: '2s',
      
      
      
//     },
//   },
  export let options = {
  stages: [
    { duration: '10s', target: 1 },     // warm up   // sudden spike
    { duration: '10s', target: 50 },   // hold peak
    { duration: '5s', target: 1 },      // drop back
  ],

  thresholds: {
    http_req_duration: ['p(95)<1500'], // system still must respond fast
       // less than 5% failures allowed
  },
};


const body ={
    "name": "morpheus",
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