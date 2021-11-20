// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

export default function handler(req, res) {
  console.log("API Response: " + req.query.searchParam);

  var axios = require("axios").default;

  var options = {
    method: "GET",
    url: "https://utelly-tv-shows-and-movies-availability-v1.p.rapidapi.com/lookup",
    params: { term: req.query.searchParam, country: "us" },
    headers: {
      "x-rapidapi-host":
        "utelly-tv-shows-and-movies-availability-v1.p.rapidapi.com",
      "x-rapidapi-key": "892d545d52msh69feeb8fb42fceep1163d1jsn4b62c6e5ed33",
    },
  };

  axios
    .request(options)
    .then(function (response) {
      console.log(response.data);
      console.log(response.data.results[0].picture);
      res.status(200).json({
        url: response.data.results[0].picture,
      });
    })
    .catch(function (error) {
      console.error(error);
      res.status(500).json({
        url: "NOT FOUND",
      });
    });
}