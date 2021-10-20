const express = require("express");
const dotenv = require("dotenv").config();
const { google } = require("googleapis");
const axios = require("axios");
const exphps = require("express-handlebars");
const path = require('path');


const app = express();
const port = 3000;

app.use(express.static('public'))
app.use('/', express.static(__dirname));

const apiKey = process.env.API_KEY;
const baseApiUrl = "https://www.googleapis.com/youtube/v3";
const youtube = google.youtube({
  version: "v3",
  auth: apiKey,
});

app.get("/", (req, res) => {
  res.sendFile("index.html");
});

app.get("/search", async (req, res, next) => {
  try {
    const searchQuery = req.query.search_query;
    const url = `${baseApiUrl}/search?key=${apiKey}&type=playlist&part=snippet&q=${searchQuery}`;
    const response = await axios.get(url);
    const titles = response.data.items.map((item) => item.snippet.title);
    res.send(titles);
  } catch (err) {
    next(err);
  }
});

app.get("/search-with-googleapis", async (req, res, next) => {
  try {
    const searchQuery = req.query.search_query;
    //   const url = `${baseApiUrl}/search?key=${apiKey}&type=video&part=snippet&q=${searchQuery}`;
    //   const response = await axios.get(url);
    const response = await youtube.video.list({
      channelId: "UCKuqgP4hJjZOOkFxf6jf21w",
      part: "snippet",
      q: searchQuery,
      type: "playlist",
      maxResults: 25,
    });
    // UCKuqgP4hJjZOOkFxf6jf21w
    // const titles = response.data.items.map((item) => item.snippet.title);
    res.send(response.data);
  } catch (err) {
    next(err);
  }
});

app.listen(port, () => {
  console.log(`App listening at http://localhost:${port}`);
});
