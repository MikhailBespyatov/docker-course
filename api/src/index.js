const express = require("express");
const mongoose = require("mongoose");
const axios = require("axios");
const { port, host, db, authApiUrl } = require("./configuration");
const { connectDB } = require("./helpers/db");
const { response } = require("express");
const app = express();

const postSchema = new mongoose.Schema({
  name: String,
});

const Post = mongoose.model("Post", postSchema);

const startServer = () => {
  app.listen(port, async () => {
    console.log(`Started api service on port ${port}`);
    console.log(`On host ${host}`);
    console.log(`Our database ${db}`);

    const silence = new Post({ name: "Silence" });
    await silence.save();
    const posts = await Post.find();
    console.log(posts, "with volumes");
  });
};

app.get("/test", (req, res) => {
  res.send("Сервер работает корректно");
});

app.get("/testwithcurrentuser", (req, res) => {
  axios.get(authApiUrl + "/currentUser").then((response) => {
    res.json({
      testwithcurrentuser: true,
      currentUserFromAuth: response.data,
    });
  });
});

app.get("/api/testapidata", (req, res) => {
  res.json({
    testwithapi: true,
  });
});

connectDB()
  .on("error", console.log)
  .on("disconnect", connectDB)
  .once("open", startServer);
