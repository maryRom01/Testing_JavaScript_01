const data = require('./data/mock.json')

const express = require("express");
const app = express();

app.get("/test", (_req, res) =>  {
  res.status(200).json(data);
})
module.exports = app;