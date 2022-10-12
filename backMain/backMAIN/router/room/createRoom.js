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

        //Push new room into room array
        newRoom.push(rmNameObj);

        //collection
        const colGroups = db.collection('groups');
        
        //Update new room
        colGroups.updateOne({group:grpNmeObj}, {$set:{rooms:{room:newRoom, users:roomUsers}}});
        status.push(1);
        res.send(status);
    });
}