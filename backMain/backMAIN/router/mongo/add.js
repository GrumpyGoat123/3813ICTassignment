module.exports = function(db,app){
    app.post('/add', function(req,res){
        if(!req.body){
            return res.sendStatus(400)
        }
        let userobj = {
            "userid": req.body.userid,
            "username": req.body.username,
            "useremail": req.body.useremail,
            "userrole": req.body.userrole
        }
        let uPwdObj = {
            "userid": req.body.userid,
            "username": req.body.username,
            "pwd": "123"
        }
        const colExtUser = db.collection('extendedUsers');
        const colUser = db.collection('users');
        

        colExtUser.find({'useremail':userobj.useremail}).count(async (err,count)=>{
            if (count == 0){
                userobj.userid = await colExtUser.estimatedDocumentCount();
                uPwdObj.userid = userobj.userid;
                console.log(userobj.userid);
                colExtUser.insertOne(userobj,(err,dbres)=>{
                    if (err) throw err;
                    let num = dbres.insertedCount;

                    res.send({'num':1,err:null});
                });
                colUser.insertOne(uPwdObj, (err, dbres)=>{
                    if (err) throw err;
                })
            }else{
                colExtUser.updateOne({useremail:userobj.useremail}, {$set:{username:userobj.username, userrole:userobj.userrole}});
                res.send({num:0,err:"Updated user"});
            }
        });
    });
}