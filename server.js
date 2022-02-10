const bodyParser = require('body-parser');
const express = require('express');
const {engine} = require('express-handlebars');
const path = require ("path");
const methodOverride = require ("method-override");


const app = express();
// Assigns the port
const PORT = process.env.PORT;


// Allowsexpress to get data from forms
app.use(bodyParser.urlencoded({extended:true}));
app.use(express.json());
app.use(express.urlencoded({extended:true}))


// Assigns handlbebars as view engine and makes .hbs extention
app.engine('.hbs', engine({extname:'.hbs'}));
app.set('view engine', '.hbs');

//sets up the public folder for static files
app.use(express.static("public"));

// Allows express to use put and delete methods
app.use(
  methodOverride(function(req, res) {
    if (req.body && typeof req.body === "object" && "_method" in req.body) {
      let method = req.body._method;
      delete req.body._method;
      return method;
    }
  })
)


// Creates routes
const indexRouter = require('./routes/index')
const notesRouter = require('./routes/notes')

app.use("/", indexRouter);
app.use("/notes", notesRouter);

// Start the server on the port
  app.listen(PORT, () => console.log(`Example app ${PORT}`));



























