var fs = require('fs');

module.exports = function(req, res) {
    let userobj = {
        "userid": req.body.userid,
        "username": req.body.username,
        "useremail": req.body.useremail,
        "userrole": req.body.userrole
    }
    let uPwdObj = {
        "username": "",
        "pwd": "123"
    }
    let uArray = [];
    let uPwdArray = [];
    let status = [];

    fs.readFile('./data/extendedUsers.json', 'utf8', function(err, data) {
        //open the file of user list
        if (err) throw err;
        uArray = JSON.parse(data);
       
        // make some change according to user's post 
        let i = uArray.findIndex(x => x.username == userobj.username);
        if (i == -1) {
            let f = uArray.findIndex(x => x.useremail == userobj.useremail);
                if(f == -1){
                    //Store new user
                    let a = uArray.length + 1;
                    userobj.userid = a;
                    uArray.push(userobj);
                    console.log(userobj);

                    //Grab password data
                    fs.readFile('./data/users.json', 'utf8', function(err, pwdData) {
                        if (err) throw err;
                        uPwdArray = JSON.parse(pwdData)
                        //Create password for new user
                        uPwdObj.username = userobj.username;
                        uPwdArray.push(uPwdObj);

                        let uPwdArrayJson = JSON.stringify(uPwdArray);
                        fs.writeFile('./data/users.json', uPwdArrayJson, 'utf-8', function(err) {
                            if (err) throw err;
                        });
                    });
                    // send response to user
                    res.send(uArray);
                    // save the file of user list
                    let uArrayjson = JSON.stringify(uArray);
                    fs.writeFile('./data/extendedUsers.json', uArrayjson, 'utf-8', function(err) {
                        if (err) throw err;
                    });
                    
                }else{
                    console.log("Email already exists");
                    status.push(1);
                    res.send(status);
                }
            
            
        } else {
            //Update existing user
            uArray[i] = userobj;
            // send response to user
            res.send(uArray);
            // save the file of user list
            let uArrayjson = JSON.stringify(uArray);
            fs.writeFile('./data/extendedUsers.json', uArrayjson, 'utf-8', function(err) {
                if (err) throw err;
            });
        }

    });
}