module.exports = function(db,app){
    app.post('/login', function(req,res){
        if(!req.body){
            return res.sendStatus(400)
        }
        
        //Password obj
        let uPwdObj = {
            "useremail": req.body.useremail,
            "pwd": req.body.pwd
        }
        
        //Collections
        const colExtUser = db.collection('extendedUsers');
        const colUser = db.collection('users');
    
        

        //Check if email and password is correct
        colUser.find({$and:[{'useremail':uPwdObj.useremail}, {'pwd':uPwdObj.pwd}]}).count(async (err, count)=>{
            //If wrong send back false
            if (count == 0){
                res.send({
                    "ok": false
                });
            }else{
                //Else send back true with users data
                let userData = await colExtUser.find({'useremail':uPwdObj.useremail}).next();
                userData["ok"] = true;
                console.log(userData);
                res.send(userData);
            }
        });
    });
}