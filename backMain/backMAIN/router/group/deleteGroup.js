var fs = require('fs');

module.exports = function(req, res) {
    let userobj =  req.body.groupname;
    let rolePass = req.body.userrole;
    let status = [];

    console.log(req.body.groupname);
    
    let uArray = [];
        fs.readFile('./data/groups.json', 'utf8', function(err, data) {
            //open the file of groups list
            if (err) throw err;
            uArray = JSON.parse(data);
            // Check if group exists and place new group
            let i = uArray.findIndex(x => x.group == userobj);
            if (i == -1) {
                console.log("Couldnt find the group");
                status.push(1);
                res.send(status);
            
            } else {
                uArray[i] = {};

                console.log(uArray);
                // send response to user
                res.send(uArray);
                // save the file of new group
                let uArrayjson = JSON.stringify(uArray);
                
                fs.writeFile('./data/groups.json', uArrayjson, 'utf-8', function(err) {
                    if (err) throw err;
                });
                    
                console.log("Group Deleted");
            }
            
        });
    

    
}