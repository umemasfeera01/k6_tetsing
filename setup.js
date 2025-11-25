import http from "k6/http";
import { sleep } from "k6";

export let options = {
  vus: 5,
  duration: "10s",
};

// ➤ Runs once before the test
export function setup() {
  console.log("SETUP: Creating authentication token...");

  // Example: login API
  const loginRes = http.post("https://reqres.in/api/login", {
    username: "johnalyy@gmail.com",
    password: "123456",
  });

  const token = loginRes.json("token");

  return {
    authToken: token,
  };
}

// ➤ Main test function (runs for each VU)
export default function (data) {
  // data.authToken is coming from setup() return
  const headers = {
    Authorization: `Bearer ${data.authToken}`,
  };

  // Actual test request
  const res = http.get("https://urbangents2.yeetonline.com/", {
    headers: headers,
  });

  sleep(1);
}

// ➤ Runs once after the test ends
export function teardown(data) {
  console.log("TEARDOWN: Cleaning up test data...");

  const headers = {
    Authorization: `Bearer ${data.authToken}`,
  };

  // Example cleanup API
  http.del("https://urbangents2.yeetonline.com/collections", null, {
    headers: headers,
  });
}
