const express = require("express");
const app =  express();
const port = 3000;

const db = require("./mongo_access");
//const db = mongo_access();

app.set('view engine', 'ejs');
//app.set('view engine', 'pug');

database = {
  "url":"mongodb://localhost:27017/",
  "database":"mydb",
  "collection":"alumnos"
};

// main route
app.get("/", (request, resolve) => {

  // Consulta a la base de datos
  var p_buscar = db.list_all(database);

  p_buscar.then((rpta) => {
    resolve.render('index', {rpta});
  }).catch( (err) => console.log(err));

});

app.get("/modificar/:id", (request, resolve) => {

  obj = request.params.id;

  var p_buscar = db.search_doc(obj, database);

  p_buscar.then((rpta) => {
    resolve.render('form_modif', {rpta});
  }).catch( (err) => console.log(err));

});


app.get("/borrar/:id", (request, resolve) => {
  
  obj = request.params.id;

  var p_delete = db.del_doc( obj, database );
  p_delete.then( (resolve) => {
    console.log("Cantidad de documentos eliminados: " + resolve);
  });
  
  resolve.redirect('/');

});


app.get("/ingresar", (request, resolve) => {

  resolve.render('form', {});
});

app.get("/data_ingresar", (request, resolve) => {

  // Creacion del objeto alumno
  alumno = {
    "user_id": Math.random(),
    "nombre": request.query.txtNombre, 
    "apellido":request.query.txtApellido,
    "especialidad": request.query.txtEspecialidad,
    "edad":request.query.txtEdad
  }

  var p_insert = db.insert_doc(alumno, database);

  p_insert.then(() => {
    console.log("Documento insertado");
  });

  resolve.redirect('/');

});

app.get("/data_modificar", (request, resolve) => {


  alumno = {
    "nombre": request.query.txtNombre, 
    "apellido":request.query.txtApellido,
    "especialidad": request.query.txtEspecialidad,
    "edad":request.query.txtEdad
  }

  var p_update = db.update_doc( request.query.txtId, alumno, database); // <---------------- Error, deben ser 3 arg
  p_update.then((resolve) => {
    console.log("Cantidad de documentos actualizados: " + resolve);
  });
  resolve.redirect('/');

});

app.listen(port, () => {
  console.log("Escuchando al puerto " + port);

});
