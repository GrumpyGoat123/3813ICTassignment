module.exports = function(db,app){
    app.post('/crtGrp', function(req,res){
        if(!req.body){
            return res.sendStatus(400)
        }
        //error status
        let status = [];

        //group object created
        let grpObj = {
            "group": req.body.groupname,
            "users": [],
            "rooms": {users:[], room:[]}
        }

        //collection
        const colGroups = db.collection('groups');
        
    
        

        colGroups.find({'group':grpObj.group}).count((err,count)=>{
            //If doesnt exist create new group
            if (count == 0){
                //Add new group
                colGroups.insertOne(grpObj,(err,dbres)=>{
                    if (err) throw err;
                    let num = dbres.insertedCount;

                    res.send(grpObj);
                });
                
            }else{  //Already exists 
                status.push(1);
                res.send(status)
            }
        });
    });
}