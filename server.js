const express = require("express");
const app = express();
const ejs = require("ejs");
const layouts = require("express-ejs-layouts");
const path = require("path");

const PORT = process.env.PORT || 3300;

app.get("/", (req, res) => {
  res.render("home");
});

// Set template engine
app.use(layouts);
app.set("views", path.join(__dirname, "/resources/views"));
app.set("view engine", ejs);

app.listen(3000, () => {
  console.log(`Listening on port ${PORT}`);
});
