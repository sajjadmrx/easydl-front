const express = require("express");
const path = require("path");
const app = express();
require("dotenv").config();
const port = process.env.PORT || 3000;

app.use(express.static(path.join(__dirname, "build")));

app.get("/*", function (req, res) {
  res.sendFile(path.join(__dirname, "build", "index.html"));
});

app.listen(port);
console.log("Server started on port" + port);
