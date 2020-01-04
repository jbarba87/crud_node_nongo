var mongo = require('mongodb');
/*
database = {
  "url":"mongodb://localhost:27017/",
  "database":"mydb",
  "collection":"prueba"
};
*/
// the next functions return a Promise

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



  search_doc : function(document, database) {

    return new Promise( (resolve, reject) => {

      mongo.connect(database.url, (err, db) => {

        if (err) throw err;
        
        var dbo = db.db(database.database);
        dbo.collection(database.collection).find(document).toArray( (err, result) => {

          if (err) throw err;
          resolve(result);
          db.close();
          
        });
      });
    });
  },


  update_doc : function(document_old, document_new, database){
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
  },


  del_doc : function(document, database){
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
  },
};

