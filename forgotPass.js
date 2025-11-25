import http from "k6/http";
import { check, sleep } from "k6";

export const options = {
  vus: 5,          // 5 virtual users
  duration: "30s", // run for 30 seconds
};

export default function () {
  const url = "https://urbangents2.yeetonline.com/forget-password"; // replace with your endpoint

  const payload = JSON.stringify({
    email: `user_${__VU}@test.com`, // test email (can be fake if backend allows)
  });

  const params = {
    headers: {
      "Content-Type": "application/json",
    },
  };

  const res = http.post(url, payload, params);

  check(res, {
    "status is 200 or 202": (r) => r.status === 200 || r.status === 202,
    "response time < 500ms": (r) => r.timings.duration < 500,
  });

  sleep(1);
}
