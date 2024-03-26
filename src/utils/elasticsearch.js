const { Client } = require("@elastic/elasticsearch");
const fs = require("fs");
const { ELASTIC_CONFIG } = require("../configs");

/* THIS IS FOR CLOUD */

/* const client = new Client({
  node: "https://test-96b22b.es.asia-southeast1.gcp.elastic-cloud.com",
  auth: {
    username: "elastic",
    password: "ZGSeJRHGaaRq4nCuSBMhQ80P",
  },
  tls: {
    ca: fs.readFileSync("http-cert.crt"),
    rejectUnauthorized: false,
  },
}); */

const client = new Client(ELASTIC_CONFIG);

module.exports = client;
