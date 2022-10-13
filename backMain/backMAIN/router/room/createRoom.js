module.exports = function(db,app){
    app.post('/crtRoom', function(req,res){
        if(!req.body){
            return res.sendStatus(400)
        }
        //error status
        let status = [];

        //group name and room name
        let grpNmeObj =  req.body.group;
        let rmNameObj = req.body.roomName;
        let newRoom = req.body.newRoom;
        let roomUsers = req.body.roomUsers;
        console.log(newRoom);
        a = {room:rmNameObj, users:[], messages:[] = []};
        //Push new room into room array
        newRoom.push(a);

        //collection
        const colGroups = db.collection('groups');
        
        //Update new room
        colGroups.updateOne({group:grpNmeObj}, {$set:{rooms:newRoom}});
        status.push(1);
        res.send(status);
    });
}