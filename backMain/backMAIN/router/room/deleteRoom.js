module.exports = function(db,app){
    app.post('/dltRoom', function(req,res){
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

        let i = newRoom.indexOf(rmNameObj);
        
        newRoom.splice(i, 1);
        
        
        //collection
        const colGroups = db.collection('groups');
        
        colGroups.updateOne({group:grpNmeObj}, {$set:{rooms:{room:newRoom, users:roomUsers}}});
        status.push(1);
        res.send(status);
    });
}