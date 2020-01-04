const express = require("express");
const app =  express();
const port = 3000;

const db = require("./mongo_access");
//const db = mongo_access();

app.set('view engine', 'ejs');

database = {
  "url":"mongodb://localhost:27017/",
  "database":"mydb",
  "collection":"alumnos"
};

// main route
app.get("/", (request, resolve) => {

  // Consulta a la base de datos
  var p_buscar = db.search_doc({}, database);

  p_buscar.then((rpta) => {
    resolve.render('index', {rpta});
  }).catch( (err) => console.log(err));

});

app.get("/modificar", (request, resolve) => {

  resolve.send("Not implemented yet");
});


app.get("/borrar", (request, resolve) => {

  resolve.send("Not implemented yet");
});


app.listen(port, () => {
  console.log("Escuchando al puerto " + port);

});
