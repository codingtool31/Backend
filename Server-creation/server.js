
const express = require("express");
const path = require("path");
const app = express();


const open = (...args) => import("open").then(m => m.default(...args));

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

app.get("/", (req, res) => {
  res.render("Header", { message: "Server is running!" });
});

const PORT = 5000;
app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
  open(`http://localhost:${PORT}`);
});
