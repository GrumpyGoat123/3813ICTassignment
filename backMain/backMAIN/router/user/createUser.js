module.exports = function(db,app){
    app.post('/crtUser', function(req,res){
        if(!req.body){
            return res.sendStatus(400)
        }
        //extended users data
        let userobj = {
            "userid": req.body.userid,
            "username": req.body.username,
            "useremail": req.body.useremail,
            "userrole": req.body.userrole,
            "usergroups": [] = [],
            "userrooms": [] = []
        }
        //User password data
        let uPwdObj = {
            "userid": req.body.userid,
            "useremail": req.body.useremail,
            "pwd": "123"
        }

        //Db collection 
        const colExtUser = db.collection('extendedUsers');
        const colUser = db.collection('users');
        
        //Check if user exists
        colExtUser.find({$or:[{'useremail':userobj.useremail},{'username':userobj.username}]}).count(async (err,count)=>{
            //If doesnt exist create new user
            if (count == 0){
                //Get amount of users and update id
                userobj.userid = await colExtUser.estimatedDocumentCount();
                uPwdObj.userid = userobj.userid;
                
                //Add new user
                colExtUser.insertOne(userobj,(err,dbres)=>{
                    if (err) throw err;
                    let num = dbres.insertedCount;

                    res.send({'num':1,err:null});
                });
                //Add user password
                colUser.insertOne(uPwdObj, (err, dbres)=>{
                    if (err) throw err;
                })
            }else{  //Update existing user
                colExtUser.updateOne({useremail:userobj.useremail}, {$set:{username:userobj.username, userrole:userobj.userrole}});
                res.send({num:0,err:"Updated user"});
            }
        });
    });
}