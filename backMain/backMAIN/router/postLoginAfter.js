var fs = require('fs');

module.exports = function(req, res) {
    let userobj = {
        "userid": req.body.userid,
        "username": req.body.username,
        "useremail": req.body.useremail,
        "userrole": req.body.userrole
    }
    let uArray = [];
    fs.readFile('./data/extendedUsers.json', 'utf8', function(err, data) {
        //open the file of user list
        if (err) throw err;
        uArray = JSON.parse(data);
        console.log(userobj);
        // make some change according to user's post 
        let i = uArray.findIndex(x => x.group == userobj.username);
        if (i == -1) {
            uArray.push(userobj);
        } else {
            uArray[i] = userobj;
        }
        // send response to user
        res.send(uArray);
        // save the file of user list
        let uArrayjson = JSON.stringify(uArray);
        fs.writeFile('./data/groups.json', uArrayjson, 'utf-8', function(err) {
            if (err) throw err;
        });
    });
}