var fs = require('fs');

module.exports = function(req, res) {
    let grpNmeObj =  req.body.group;
    let rmNameObj = req.body.roomName;
    console.log(rmNameObj);

    console.log(req.body.group);
    let status = [];
    
    let uArray = [];
        
        fs.readFile('./data/groups.json', 'utf8', function(err, data) {
            //open the file of groups list
            if (err) throw err;
            uArray = JSON.parse(data);
            // Check if group exists and place new group
            let i = uArray.findIndex(x => x.group == grpNmeObj);
            if (i == -1) {
                console.log("No group with that name");
                status.push(2);
                res.send(status);
                    
            } else {
                let fRoom = uArray[i].rooms.findIndex(x => x.room == rmNameObj);
                if(fRoom == -1){
                    console.log("Store new room");
                    uArray[i].rooms.push({
                        "room": rmNameObj,
                        "users": []
                    })

                    res.send(uArray);
                    let uArrayjson = JSON.stringify(uArray);
                    fs.writeFile('./data/groups.json', uArrayjson, 'utf-8', function(err) {
                        if (err) throw err;
                    });
                }else{
                    console.log("Room already exists");
                    status.push(1);
                    res.send(status);
                    
                }
                
                    
            }
            
        });    
}