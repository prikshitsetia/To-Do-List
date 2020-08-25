const express = require("express");
const body = require("body-parser");
const app = express();
let items = ["Buy Food", "Cook Food", "Eat Food"];
app.set("view engine", "ejs");
let workitems = [];
app.use(body.urlencoded({ extended: true }));
app.use(express.static("public"));
app.get("/", function (req, res) {
  let today = new Date();
  let curDay = today.getDay();

  let options = {
    weekday: "long",
    day: "numeric",
    month: "long",
  };

  let day = today.toLocaleDateString("en-US", options);

  res.render("list", { listTitle: day, items: items });
});

app.post("/", function (req, res) {
  item = req.body.newItem;

  if (req.body.list === "Work") {
    workitems.push(item);
    res.redirect("/work");
  } else {
    items.push(item);
  }
  res.redirect("/");
});

app.get("/work", function (req, res) {
  res.render("list", { listTitle: "Work List", items: workitems });
});

app.listen(3000, function () {
  console.log("Server is listening on port 3000");
});

app.post("/work", function (req, res) {
  let item = req.body.newItem;
  workitems.push(item);
});

app.get("/about", function (req, res) {
  res.render("about");
});
