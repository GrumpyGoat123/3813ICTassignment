module.exports = function(db,app){
    app.post('/dltUserGroup', function(req,res){
        if(!req.body){
            return res.sendStatus(400)
        }
        //error status
        let status = [];

        //group name and room name
        let grpNmeObj =  req.body.group;
        let username = req.body.username;
        let users = req.body.users;
        let usergroups = req.body.usergroups;

        //Delete user from group array
        let i = users.indexOf(username);
        users.splice(i, 1);

        //Delete group from user array
        let a = usergroups.indexOf(grpNmeObj);
        usergroups.splice(a, 1);

        //collection
        const colGroups = db.collection('groups');
        const colUsers = db.collection('extendedUsers');

        //Delete group from user data
        colUsers.updateOne({username:username}, {$set:{usergroups:usergroups}});
        
    
        

        colGroups.updateOne({group:grpNmeObj}, {$set:{users:users}});
        status.push(1);
        res.send(status);
    });
}