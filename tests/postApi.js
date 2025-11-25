import http from "k6/http";
import { check, sleep } from "k6";

// export const options = {
//   stages: [
//     { duration: "20s", target: 700 },   // ramp up to 5 users
//     { duration: "40s", target: 10 },  // increase to 10 users
//     { duration: "20s", target: 0 },   // ramp down
//   ],
// };

export const options = {
  discardResponseBodies: true,
  scenarios: {
    contacts: {
      executor: 'per-vu-iterations',
      vus: 10,
      iterations: 20,
      maxDuration: '30s',
    },
  },
};

export default function () {
  const url = "https://urbangents2.yeetonline.com/login"; // replace with your real signup API endpoint

  const payload = JSON.stringify({
    email: `user_${__VU}_${Date.now()}@test.com`, // unique email
    password: "Pass@1234",
  });

  const params = {
    headers: {
      "Content-Type": "application/json",
    },
  };

  const res = http.post(url, payload, params);

  check(res, { 
    "status is 200 or 201": (r) => r.status === 200 || r.status === 201,
    "response time < 500ms": (r) => r.timings.duration < 500,
  });

  sleep(1);
}
