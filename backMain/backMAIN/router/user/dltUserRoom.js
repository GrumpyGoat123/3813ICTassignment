module.exports = function(db,app){
    app.post('/dltUserRoom', function(req,res){
        if(!req.body){
            return res.sendStatus(400)
        }
        //error status
        let status = [];

        //group name and room name
        let grpNmeObj =  req.body.group;
        let username = req.body.username;
        let roomname = req.body.roomname;
        let newRoom = req.body.newRoom;
        let users = req.body.users;
        let userrooms = req.body.userrooms;
       
        //Create a new room object
        let b = users.indexOf(username);
        users.splice(b, 1);
        a = {room:roomname, users:users};

        //update rooms
        let i = newRoom.indexOf(roomname);
        console.log(i)
        newRoom.splice(i, 1, a);

        //Delete room from user array
        let f = userrooms.indexOf(roomname);
        userrooms.splice(f, 1);

        //collection
        const colGroups = db.collection('groups');
        const colUsers = db.collection('extendedUsers');
        
        //Add rooom to user data
        //colUsers.updateOne({username:username}, {$set:{userrooms:userrooms}});

        //Update new room
        colGroups.updateOne({group:grpNmeObj}, {$set:{rooms:newRoom}});
        status.push(1);
        res.send(status);
    });
}