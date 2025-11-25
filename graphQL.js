import http from 'k6/http';
import { check, sleep } from 'k6';

export const options = {
  vus: 5,
  duration: '15s',

  thresholds: {
    http_req_duration: ['p(95)<800'], // 95% requests under 800ms
  },
};

export default function () {
  const url = 'https://urbangents2.yeetonline.com/collections/necklace/elegant-camel-overcoat';

  const query = `
    query productDetails($handle: String!) {
      productByHandle(handle: $handle) {
        id
        title
        descriptionHtml
        handle

        images(first: 10) {
          edges {
            node {
              url
              altText
            }
          }
        }

        options {
          name
          values
        }

        variants(first: 10) {
          edges {
            node {
              id
              title
              sku
              availableForSale
              quantityAvailable
              price {
                amount
                currencyCode
              }
              compareAtPrice {
                amount
                currencyCode
              }
              selectedOptions {
                name
                value
              }
            }
          }
        }
      }
    }
  `;

  // CHANGE THIS — use your product handle
  const variables = {
    handle: "example-product-handle",
  };

  const payload = JSON.stringify({
    query,
    variables,
  });

  const params = {
    headers: {
      "Content-Type": "application/json",
      "X-Shopify-Storefront-Access-Token": "YOUR_STORE_FRONT_API_TOKEN" // <-- change required
    },
  };

  const res = http.post(url, payload, params);

  check(res, {
    "status is 200": (r) => r.status === 200,
    "no GraphQL errors": (r) => !JSON.parse(r.body).errors,
    "product exists": (r) =>
      JSON.parse(r.body).data?.productByHandle?.id !== undefined,
  });

  sleep(1);
}
