const express = require("express");
const app = express();
const config = require("platformsh-config").config();
const port = config.port || 3000;

app.get("/", (req, res) => {
  res.send("Hello Platform.sh!");
});

app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});
