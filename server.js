// Dependencies
const express = require("express");
const path = require("path");
const fs = require("fs");
const dayjs = require("dayjs");

// Read the notes DB file - this data source holds an array of information
let notesDb = JSON.parse(fs.readFileSync("./db/db.json"));
console.log(notesDb);

// Express configuration
const app = express();
// Sets an initial port.
const PORT = process.env.PORT || 8080;

// Set up the Express App to handle data parsing
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static("public"));

// ROUTES
// =======================================================
// index.html is the default file so no need to app.get

app.get("/notes", function (req, res) {
  res.sendFile(path.join(__dirname, "/public/notes.html"));
});

// API GET request
app.get("/api/notes", function (req, res) {
  // do I need to return this? ReferenceError notesBD is not defined
  res.json(notesDb);
});

// ADD & SAVE from DATABASE
// =======================================================
app.post("/api/notes", function (req, res) {
  let newNote = req.body;
  console.log(newNote);
  // generate unique id using the date and time
  // https://day.js.org/docs/en/display/format
  let dateTimeNow = dayjs().format("DDMMYYYYTHHmmss");
  console.log(dateTimeNow);
  newNote.id = dateTimeNow;

  notesDb.push(newNote);

  fs.writeFileSync(
    path.resolve("./db/db.json"),
    JSON.stringify(notesDb),
    (err) => {
      if (err) throw err;
      console.log("Adding new note...");
    }
  );
  res.send(newNote);
});

// DELETE from DATABASE
// =======================================================
// app.delete("/api/notes/:id", function (req, res) {
//   console.log(req.params);
//   let id = req.params.id;
//   console.log(id);
//   //  can not use newNote in line below...
//   const deleteNote = notesDb.find((deleteNote) => newNote.id === id);
//   if (deleteNote) {
//     return res.json(deleteNote);
//   }
//   return res.send("No ID found");
// });

// LISTENER
// =======================================================
// Starts the server
app.listen(PORT, function () {
  console.log("App listening on PORT: " + PORT);
});
