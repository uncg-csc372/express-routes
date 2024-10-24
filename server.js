"use strict";
const express = require("express");
const app = express();

const gamesRoutes = require("./routes/games.route");
const { db_close } = require("./models/db-conn");

app.use(express.static("public"));
app.use("/games", gamesRoutes);

app.get("/", (req, res) => {
  res.redirect("/games/all");
});

const PORT = process.env.PORT || 3000;
const server = app.listen(PORT, function () {
  console.log("App listening at http://localhost:" + PORT);
});

process.on("SIGINT", cleanUp);
function cleanUp() {
  console.log("Terminate signal received.");
  db_close();
  console.log("...Closing HTTP server.");
  server.close(() => {
    console.log("...HTTP server closed.")
  })
}
