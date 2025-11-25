import http from 'k6/http';
import { check } from 'k6';
import {randomString} from "https://jslib.k6.io/k6-utils/1.2.0/index.js";
export const options = {
  scenarios: {
    request: {
      executor: 'per-vu-iterations',
      vus: 5,
      iterations: 2,
      
      maxDuration: '2s',
    },
  },
  
};
const payload ={
  // generate random strings with each request
    "name": randomString(5),    
    "job": "leader"
}
const params = {
    headers: {
      "x-api-key": "reqres-free-v1"
    },
  };

export default function () {
  
  const res = http.post('https://reqres.in/api/users', payload, params);
  console.log("***Payloas***", payload);
  console.log("***Payloas***", res.body);
  check(res, {
    'is status 201': (r) => r.status === 201,
  });
}