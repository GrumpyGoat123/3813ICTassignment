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
        let roomname = req.body.roomname;
        let newRoom = req.body.newRoom;
        let users = req.body.users;
        let userrooms = req.body.userrooms;

        
        //Create a new room object
        users.push(username);
        a = {room:roomname, users:users};

        //update rooms
        let i = newRoom.indexOf(roomname);
        console.log(i)
        newRoom.splice(i, 1, a);

        //a = {room:rmNameObj, users:[]};
        //Push to array of rooms in user
        let newRoomObj = {groupname:grpNmeObj, rooms:userrooms}

        Object.assign(userrooms, newRoomObj);

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