var mongo = require('mongodb');

database = {
  "url":"mongodb://localhost:27017/",
  "database":"mydb",
  "collection":"prueba"
};


documento = {
  "nombre":"juan"
};

var insert_doc = function(document, database) {

  return new Promise( (resolve, reject) => {

    mongo.connect(database.url, (err, db) => {
      if (err) throw err;
      var dbo = db.db(database.database);
      dbo.collection(database.collection).insertOne(document, function(err, res) {
        if (err) throw err;
        resolve(1);
        db.close();
      });
    });
  });
}



var search_doc = function(document, database) {

  return new Promise( (resolve, reject) => {

    mongo.connect(database.url, (err, db) => {

      if (err) throw err;
      
      var dbo = db.db(database.database);
      dbo.collection(database.collection).find(document).toArray( (err, result) => {

        if (err) throw err;
        //console.log(result);
        resolve(result);
        db.close();
        
      });
    });
  });
}


var update_doc = function(document_old, document_new, database){
  return new Promise( (resolve, reject) => {
  
    mongo.connect(database.url, (err, db) => {
    
      if (err) throw err;
      var dbo = db.db(database.database);
      var doc = { $set: document_new };
      //console.log(result);
      dbo.collection(database.collection).updateOne(document_old, doc, function(err, res) {
      
        if (err) throw err;
        resolve(res.modifiedCount);
        db.close();
      
      });
    });
  });
}


var del_doc = function(document, database){
  return new Promise( (resolve, reject) => {
  
    mongo.connect(database.url, (err, db) => {
    
      if (err) throw err;
      var dbo = db.db(database.database);
      dbo.collection(database.collection).deleteOne(document, function(err, obj) {

        if (err) throw err;
        //console.log(obj);
        resolve(obj.deletedCount); // Regresamos la cantidad de documentos eliminados
        db.close();
      
      });
    });
  });
}

/*
var p_delete = del_doc( {"nombre":"piojosa"}, database );
p_delete.then( (resolve) => {
  console.log("Cantidad de documentos eliminados: " + resolve);
});
*/

var p_update = update_doc({ "name":"enrique"}, { "name":"juan"}, database);
p_update.then((resolve) => {
  console.log("Cantidad de documentos actualizados: " + resolve);
});

/*
var p_insert = insert_doc(documento, database);

p_insert.then(() => {
  console.log("Documento insertado");
});


var p_buscar = search_doc({ "nombre":"jorge"}, database);

p_buscar.then((resolve) => {
  console.log(resolve);
}).catch( () => console.log("Error"));
*/




