var db = require("./mongo_access.js");

database = {
  "url":"mongodb://localhost:27017/",
  "database":"mydb",
  "collection":"prueba"
};

// Examples of How to use
/*
var p_delete = del_doc( {"nombre":"piojosa"}, database );
p_delete.then( (resolve) => {
  console.log("Cantidad de documentos eliminados: " + resolve);
});


var p_update = update_doc({ "name":"enrique"}, { "name":"juan"}, database);
p_update.then((resolve) => {
  console.log("Cantidad de documentos actualizados: " + resolve);
});


var p_insert = insert_doc(documento, database);

p_insert.then(() => {
  console.log("Documento insertado");
});
*/
/*
var p_buscar = search_doc({}, database);

p_buscar.then((resolve) => {
  console.log("Recuperados\n");
  console.log(resolve);
}).catch( () => console.log("Error"));
*/



var p_buscar = db.search_doc({}, database);

p_buscar.then((resolve) => {
  console.log("Recuperados\n");
  console.log(resolve);
}).catch( () => console.log("Error"));


