/*
CRUD Mongodb 
CAda una de las funcines retorna una Promesa
Ejemplo de objeto database:

documento: Es el objeto a ingresar
id: _id del documento de la collecion

database = {
  "url":"mongodb://localhost:27017/",
  "database":"mydb",
  "collection":"prueba"
};
*/


var mongo = require('mongodb');
var obj = mongo.ObjectID;


module.exports = {

  insert_doc : function(document, database) {

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
  },

  search_doc : function(id, database) {

    return new Promise( (resolve, reject) => {

      mongo.connect(database.url, (err, db) => {

        if (err) throw err;
        
        var dbo = db.db(database.database);

        dbo.collection(database.collection).find( {_id: new mongo.ObjectID(id)} ).toArray( (err, result) => {

          if (err) throw err;
          resolve(result);
          db.close();
          
        });
      });
    });
  },

  list_all : function(database) {

    return new Promise( (resolve, reject) => {

      mongo.connect(database.url, (err, db) => {

        if (err) throw err;
        
        var dbo = db.db(database.database);

        dbo.collection(database.collection).find().toArray( (err, result) => {

          if (err) throw err;
          resolve(result);
          db.close();
          
        });
      });
    });
  },

    update_doc : function(id, document_new, database){
    return new Promise( (resolve, reject) => {
    
      mongo.connect(database.url, (err, db) => {
      
        if (err) throw err;
        var dbo = db.db(database.database);
        var doc = { $set: document_new };

        dbo.collection(database.collection).updateOne( {_id: new mongo.ObjectID(id)} , doc, function(err, res) {
        
          if (err) throw err;
          resolve(res.modifiedCount);
          db.close();
        
        });
      });
    });
  },


    del_doc : function(id, database){
    return new Promise( (resolve, reject) => {
    
      mongo.connect(database.url, (err, db) => {
      
        if (err) throw err;
        var dbo = db.db(database.database);
        dbo.collection(database.collection).deleteOne( {_id: new mongo.ObjectID(id)} , function(err, obj) {

          if (err) throw err;
          resolve(obj.deletedCount); // Regresamos la cantidad de documentos eliminados
          db.close();
        
        });
      });
    });
  },
};

