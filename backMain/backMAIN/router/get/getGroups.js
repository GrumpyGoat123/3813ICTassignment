module.exports = function(db,app){
    app.get('/getGrp', function(req,res){
        
        //collection
        const colGroups = db.collection('groups');
      

        colGroups.find({}).toArray().then(function(docs) {
            console.log("Found the following records");
            console.log(docs);
            res.send(docs);
        });
    });
}