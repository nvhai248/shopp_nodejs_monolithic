const redis = require("redis");
const { REDIS_URL } = require("../configs");
const client = redis.createClient({
  url: REDIS_URL,
});
client.connect();

client.on("connect", () => {
  console.log("Redis client connected!");
});

client.on("error", (err) => {
  console.log("Redis client error", err);
});

module.exports = client;
