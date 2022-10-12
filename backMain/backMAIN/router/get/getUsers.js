module.exports = function(db,app){
    app.get('/getUsers', function(req,res){
        
        //collection
        const colUsers = db.collection('extendedUsers');
      

        colUsers.find({}).toArray().then(function(docs) {
            console.log("Found the following records");
            console.log(docs);
            res.send(docs);
        });
    });
}