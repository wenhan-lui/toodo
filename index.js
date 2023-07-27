import express from "express";
import bodyParser from "body-parser";

var app = express();
var port = process.env.PORT || 3030;
var locallyAddedItems = [];
var locallyAddedItemsStatus = [];

app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.get("/", (req, res) => {
  res.render("index.ejs", {
    newTasks: locallyAddedItems,
    newTasksStatus: locallyAddedItemsStatus,
  });
});

app.listen(port, () => {
  console.log(`Listening at port ${port}.`);
});

app.post("/submit", (req, res) => {
  locallyAddedItems.push(req.body["newTask"]);
  locallyAddedItemsStatus.push("unchecked");
  res.render("index.ejs", {
    newTasks: locallyAddedItems,
    newTasksStatus: locallyAddedItemsStatus,
  });
});

app.post("/update", (req, res) => {
  locallyAddedItems = req.body[0];
  locallyAddedItemsStatus = req.body[1];

  res.render("index.ejs", {
    newTasks: locallyAddedItems,
    newTasksStatus: locallyAddedItemsStatus,
  });
});

app.post("/", (req, res) => {
  console.log(req.body);
});
