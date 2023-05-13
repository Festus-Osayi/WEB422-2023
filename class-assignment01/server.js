// Setup
const express = require("express");
const path = require("path");
const cors = require("cors");


// const bodyParser = require('body-parser');
const app = express();
const HTTP_PORT = process.env.PORT || 8080;
// Or use some other port number that you like better

// Add support for incoming JSON entities
// app.use(bodyParser.json());
app.use(express.json()); // built-in body-parser

app.use(cors());


/**************************************************************************** */
// CRUD operations to employees which is from employees.json.
/**************************************************************************** */
// Data model and "persistent store" setup for v6
const dataService = require("./data-service.js");

// Get all
app.get("/api/students", (req, res) => { // for query string, e.g. ?page=2, we don't need to define in the path
  // let page = req.query.page ? req.query.page : 0;
  res.json(dataService.getAllStudents());
});

// Get one
app.get("/api/students/:id", (req, res) => {
 
  dataService.getStudentsById(req.params.id)
    .then((emp) => {
      emp ? res.json(emp) : res.status(404).json({ "message": "Resource not found" });
    })
    .catch((err) => {
      res.status(500).json({ "message": "Server internal error" });
    });
});

// Add new
app.post("/api/students", (req, res) => {
  // MUST return HTTP 201
  res.status(201).json(dataService.AddNewStudents(req.body));
});

// Edit existing
app.put("/api/students/:id", (req, res) => {

  if (req.params.id != req.body.sid) {
    res.status(400).json({ "message": "IDs not match" });
  }
  else {
    // Call the students method & Return the appropriate result
    let o = dataService.EditStudents(req.params.id);
    o ? res.json(o) : res.status(404).json({ "message": "Resource not found" });
  }

});

// Delete item
app.delete("/api/students/:id", (req, res) => {
  dataService.deleteStudents(req.params.id);
  // In a real app, do not send body data, instead just send...
  res.status(204).end();
});



// Resource not found (this should be at the end)
app.use((req, res) => {
  res.status(404).send("Resource not found");
});

// Tell the app to start listening for requests
app.listen(HTTP_PORT, () => {
  console.log("Ready to handle requests on port " + HTTP_PORT);
});