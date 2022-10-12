module.exports = function(db,app){
    app.post('/addUserGroup', function(req,res){
        if(!req.body){
            return res.sendStatus(400)
        }
        //error status
        let status = [];

        //group name and room name
        let grpNmeObj =  req.body.group;
        let username = req.body.username;
        let users = req.body.users;
        users.push(username);

        //collection
        const colGroups = db.collection('groups');
        
    
        

        colGroups.updateOne({group:grpNmeObj}, {$set:{users:users}});
        status.push(1);
        res.send(status);
    });
}