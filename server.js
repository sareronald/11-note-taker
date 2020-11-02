// Dependencies
const express = require("express");
const path = require("path");
const fs = require("fs");
const dayjs = require("dayjs");

// Express configuration
const app = express();
// Sets an initial port.
const PORT = process.env.PORT || 8080;

// Set up the Express App to handle data parsing
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
// Configure Express to serve static files
app.use(express.static("public"));

// ROUTES
// =======================================================
// index.html is the default file so no need to app.get
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "index.html"));
});

app.get("/notes", (req, res) => {
  res.sendFile(path.join(__dirname, "/public/notes.html"));
});

// API GET request
app.get("/api/notes", (req, res) => {
  res.json(JSON.parse(fs.readFileSync("./db/db.json")));
  // res.json(notesDb);
});

// ADD & SAVE from DATABASE
// =======================================================
app.post("/api/notes", (req, res) => {
  let newNote = req.body;
  // generate unique id using the date and time
  // https://day.js.org/docs/en/display/format
  let dateTimeNow = dayjs().format("DDMMYYYYTHHmmss");
  console.log("This is your unique id: " + dateTimeNow);
  newNote.id = dateTimeNow;
  // Read the notes DB file
  let notesDb = JSON.parse(fs.readFileSync("./db/db.json"));
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

// DELETE from db.json
// =======================================================
app.delete("/api/notes/:id", function (req, res) {
  console.log(req.params);
  const chosenID = req.params.id;
  console.log("You are chosing to delete this ID " + chosenID);
  let notesDb = JSON.parse(fs.readFileSync("./db/db.json"));
  // Read all notes and filters the notes that do not match the chosenID
  const newDB = notesDb.filter((savedNote) => savedNote.id != chosenID);
  console.log("new db", newDB);
  // your formula would be to return each value into the new array if it does not match the id of the record to be deleted
  // Writes remaining notes to db.json
  fs.writeFileSync(
    path.resolve("./db/db.json"),
    JSON.stringify(newDB),
    (err) => {
      if (err) throw err;
      console.log(`Deleting note ${chosenID}...`);
      // return true;
    }
  );
  res.send(newDB);
});

// Default Route
app.get("*", function (req, res) {
  res.sendFile(path.join(__dirname, "public/index.html"));
});

// LISTENER
// =======================================================
// Starts the server
app.listen(PORT, function () {
  console.log("App listening on PORT: " + PORT);
});
