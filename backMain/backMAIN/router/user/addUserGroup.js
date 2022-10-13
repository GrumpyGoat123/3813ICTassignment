module.exports = function(db,app){
    app.post('/addUserGroup', function(req,res){
        if(!req.body){
            return res.sendStatus(400)
        }
        //error status
        let status = [];

        //group name 
        let grpNmeObj =  req.body.group;
        let username = req.body.username;
        let users = req.body.users;
        let usergroups = req.body.usergroups;
        
        //Push to array of users in group
        users.push(username);

        //Push to array of groups in user
        usergroups.push(grpNmeObj);
        console.log(usergroups);

        //collection
        const colGroups = db.collection('groups');
        const colUsers = db.collection('extendedUsers');
        
        //Add group to user data
        colUsers.updateOne({username:username}, {$set:{usergroups:usergroups}});

        //Add to groups data
        colGroups.updateOne({group:grpNmeObj}, {$set:{users:users}});
        status.push(1);
        res.send(status);
    });
}