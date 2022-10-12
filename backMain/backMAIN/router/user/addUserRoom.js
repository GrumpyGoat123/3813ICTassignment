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

        //Create a new room object
        users.push(username);
        a = {room:roomname, users:users};
        //update rooms
        let i = newRoom.indexOf(roomname);
        console.log(i)
        newRoom.splice(i, 1, a);

        //collection
        const colGroups = db.collection('groups');
        
        //Update new room
        colGroups.updateOne({group:grpNmeObj}, {$set:{rooms:newRoom}});
        status.push(1);
        res.send(status);
    });
}