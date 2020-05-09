const express = require("express");

const port = 3000;
const app = express();

app.use(express.static(__dirname));

let messages = [
  { name: "Rub", message: "Hello" },
  { name: "Nima", message: "Hello Everyone" },
];

app.get("/messages", (req, res) => {
  res.send(messages);
});

app.post("/messages", (req, res) => {
  res.sendStatus(200);
});

app.listen(port, () => {
  console.log(`Server is listening on port ${port}`);
});
