// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

export default function handler(req, res) {
  console.log("API Response: " + req.query.searchParam);

  var axios = require("axios").default;

  let input = req.query.searchParam;
  let modifiedInput = input.replace(/\s/g, "%20");

  var options = {
    method: "GET",
    url: "https://steam2.p.rapidapi.com/search/" + modifiedInput + "/page/1",
    headers: {
      "x-rapidapi-host": "steam2.p.rapidapi.com",
      "x-rapidapi-key": "892d545d52msh69feeb8fb42fceep1163d1jsn4b62c6e5ed33",
    },
  };

  axios
    .request(options)
    .then(function (response) {
      console.log(response.data[0].imgUrl);

      let fetchedUrl = response.data[0].imgUrl;
      let correctedUrl = fetchedUrl.replace("capsule_sm_120.jpg", "header.jpg");

      res.status(200).json({
        url: correctedUrl,
      });
    })
    .catch(function (error) {
      console.error(error);
      res.status(500).json({
        url: "NOT FOUND",
      });
    });
}
