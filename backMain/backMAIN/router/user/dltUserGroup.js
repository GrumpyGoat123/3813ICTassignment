var fs = require('fs');

module.exports = function(req, res) {
    let groupname =  req.body.group;
    let username = req.body.username;
    console.log(req.body.groupname);
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
                // Check if group exists and place new group
                let i = uArray.findIndex(x => x.group == groupname);
                if (i == -1) {
                    console.log("Group does not exist");
                    status.push(1);
                    res.send(status);
                } else {
                    let fUser = uArray[i].users.findIndex(x => x == username);
                    if(fUser == -1){
                        console.log("User does not exist in group");
                        status.push(2);
                        res.send(status);
                    }else{
                        uArray[i].users.splice(fUser, 1);
                        console.log("Removed user from group");
    
                        console.log(uArray);
    
                        res.send(uArray);
                        // save the file of new group
                        let uArrayjson = JSON.stringify(uArray);
                        fs.writeFile('./data/groups.json', uArrayjson, 'utf-8', function(err) {
                        if (err) throw err;
                        });
                    }
                    
                        
                }
                
            });    
        }
    });
        
        
}