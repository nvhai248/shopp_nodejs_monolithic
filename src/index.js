const express = require("express");
const { PORT } = require("./configs/index");
const { dbConnection } = require("./database");
const expressApp = require("./express-app");

const StartServer = async () => {
  const app = express();
  await dbConnection();
  await expressApp(app);

  app
    .listen(PORT, () => {
      console.log(`listening to port ${PORT}`);
    })
    .on("error", (err) => {
      console.log(err);
      process.exit();
    });
};

StartServer();
