var fs = require('fs');

module.exports = function(req, res) {
    let grpNmeObj =  req.body.group;
    let rmNameObj = req.body.roomname;
    let username = req.body.username;
    console.log(rmNameObj);

    console.log(req.body.group);
    let status = [];
    
    let uArray = [];
    let users = [];

    fs.readFile('./data/extendedUsers.json', 'utf8', function(err, userExist) {
        //open the file of user list
        if (err) throw err;
        users = JSON.parse(userExist);
        let f = users.findIndex(x => x.username == username);
        if (f == -1){
            console.log("User does not exist");
            status.push(3);
            res.send(status);
        }else{
            fs.readFile('./data/groups.json', 'utf8', function(err, data) {
                //open the file of groups list
                if (err) throw err;
                uArray = JSON.parse(data);
                // Check if group exists 
                let i = uArray.findIndex(x => x.group == grpNmeObj);
                if (i == -1) {
                    console.log("Group does not exist");
                    status.push(1);
                    res.send(status);
                }else{
                    let fUser = uArray[i].users.findIndex(x => x == username);
                    if(fUser == -1){
                        console.log("User is not in this group");
                        status.push(5);
                        res.send(status);
                    }else {
                        let fRoom = uArray[i].rooms.findIndex(x => x.room == rmNameObj);
                        if(fRoom == -1){
                            console.log("Room does not exist");
                            status.push(2);
                            res.send(status);
                        }else{
                            let fRoomUser = uArray[i].rooms[fRoom].users.findIndex(x => x == username);
                            if(fRoomUser == -1){
                                console.log("User does not exist in this room");
                                status.push(4);
                                res.send(status);
                            }else{
                                console.log("Delete user from room");
                                uArray[i].rooms[fRoom].users[fRoomUser] = {};
                                console.log(uArray);

                                res.send(uArray);
                                let uArrayjson = JSON.stringify(uArray);
                                fs.writeFile('./data/groups.json', uArrayjson, 'utf-8', function(err) {
                                    if (err) throw err;
                                });
                            }
                            
                        } 
                            
                    }
                    
                } 
                
            });    
        }
    });
}