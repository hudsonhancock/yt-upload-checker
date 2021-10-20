
  const dotenv = require("dotenv").config();
  const { google } = require("googleapis");
  // const axios = require("axios");

  const bbcBtn = document.querySelector("#btnOne");
  // const stacheBtn = document.querySelector("#btnTwo");
  // const nmgBtn = document.querySelector("#btnThree");
  // const hitBtn = document.querySelector("#btnFour");
  // const hitMusicBtn = document.querySelector("#btnFive");
  // const wendyBtn = document.querySelector("#btnSix");
  
  document.addEventListener('DOMContentLoaded', function() {
    var elems = document.querySelectorAll('.sidenav');
    var instances = M.Sidenav.init(elems, options);
  });


  $(document).ready(function(){
    $('.sidenav').sidenav();
  });


const apiKey = process.env.API_KEY;
const baseApiUrl = "https://www.googleapis.com/youtube/v3";
const youtube = google.youtube({
  version: "v3",
  auth: apiKey,
});

alert("hello");
console.log("hello");

bbcBtn.addEventListener('click', async (req, res, next) => {
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

