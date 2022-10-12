module.exports = function(db,app){
    app.post('/addUserRoom', function(req,res){
        if(!req.body){
            return res.sendStatus(400)
        }
        //error status
        let status = [];

        //group name and room name
        let grpNmeObj =  req.body.group;
        let username = req.body.username;
        let users = req.body.users;


        //Delete user from group user array
        let i = users.indexOf(username);
        users.splice(i, 1);

        //collection
        const colGroups = db.collection('groups');
        
    
        

        colGroups.updateOne({group:grpNmeObj}, {$set:{users:users}});
        status.push(1);
        res.send(status);
    });
}