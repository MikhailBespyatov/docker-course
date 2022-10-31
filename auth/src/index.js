const express = require("express");
const { port, host, db, apiUrl } = require("./configuration");
const { connectDB } = require("./helpers/db");
const axios = require("axios");
const app = express();

const startServer = () => {
  app.listen(port, async () => {
    console.log(`Started auth service on port ${port}`);
    console.log(`On host ${host}`);
    console.log(`Our database ${db}`);
  });
};

app.get("/auth", (req, res) => {
  res.send("Сервер авторизации работает корректно");
});

app.get("/api/currentUser", (req, res) => {
  res.json({
    id: "1234",
    email: "foo@gmail.com",
  });
});

app.get("/testwithapidata", (req, res) => {
  axios.get(apiUrl + "/testapidata").then((response) => {
    res.json({
      testapidata: response.data.testwithapi,
    });
  });
});

connectDB()
  .on("error", console.log)
  .on("disconnect", connectDB)
  .once("open", startServer);
