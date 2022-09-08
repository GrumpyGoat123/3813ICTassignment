var fs = require('fs');

module.exports = function(req, res) {
    let userobj =  req.body.groupname;
    console.log(req.body.groupname);
    let status = [];
    
    let uArray = [];
        
        fs.readFile('./data/groups.json', 'utf8', function(err, data) {
            //open the file of groups list
            if (err) throw err;
            uArray = JSON.parse(data);
            // Check if group exists and place new group
            let i = uArray.findIndex(x => x.group == userobj);
            if (i == -1) {
                uArray.push({
                    "group": req.body.groupname,
                    "roomsTtl": 0,
                    "usersTtl": 0,
                    "users": [],
                    "rooms":[]
                })
                console.log(uArray);
                // send response to user
                res.send(uArray);
                // save the file of new group
                let uArrayjson = JSON.stringify(uArray);
                fs.writeFile('./data/groups.json', uArrayjson, 'utf-8', function(err) {
                if (err) throw err;
                });
            } else {
                console.log("Already a group with that name");
                status.push(1);
                res.send(status);
                    
            }
            
        });    
}