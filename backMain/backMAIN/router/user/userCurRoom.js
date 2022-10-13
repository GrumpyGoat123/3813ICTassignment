module.exports = function(db,app){
    app.post('/curRoom', function(req,res){
        if(!req.body){
            return res.sendStatus(400)
        }
        
        let currentroom = req.body.currentroom;
        let user = req.body.username;

        const colExtUser = db.collection('extendedUsers');
        colExtUser.updateOne({username:user}, {$set:{currentroom:currentroom}});
    });
}