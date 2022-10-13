module.exports = function(db,app){
    app.post('/strCht', function(req,res){
        if(!req.body){
            return res.sendStatus(400)
        }

        //error status
        let status = [];

        let grpNmeObj =  req.body.group;
        let username = req.body.username;
        let roomname = req.body.roomname;
        let newRoom = req.body.newRoom;
        let users = req.body.users;
        let userrooms = req.body.userrooms;
        let messages = req.body.messages;

        //Create a new room object
        a = {room:roomname, users:users, messages:messages};

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