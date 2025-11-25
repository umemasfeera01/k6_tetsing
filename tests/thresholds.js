import http from 'k6/http'
import { sleep } from 'k6'

export let options = {
  vus: 5,
  duration: "10s",
  thresholds: {
    http_req_duration: ['p(95)<300', 'p(99)<300'],
  },
}

export default function () {
  const BASE_URL = 'https://test-api.k6.io'

  http.get(`${BASE_URL}/public/crocodiles`)
  http.get(`${BASE_URL}/public/crocodiles/1`)
  http.get(`${BASE_URL}/public/crocodiles/2`)
  sleep(0.3)
}