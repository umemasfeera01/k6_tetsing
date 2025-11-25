import http from 'k6/http';
import { check } from 'k6';

export const options = {
  scenarios: {
    request: {
      executor: 'per-vu-iterations',
      vus: 10,
      iterations: 2,
      
      maxDuration: '2s',
      
      
      
    },
  },
};

const body ={
    "name": "morpheus",
    "job": "zion resident"
}

const params = {
    headers: {
      "x-api-key": "reqres-free-v1"
    },
  };

export default function () {
  const response = http.patch('https://reqres.in/api/users/2', body, params);

  check(response, {
    'is status 200': (r) => r.status === 200,
    "Response Validation" : (response)=> response.body.includes("updatedAt")
  });
}