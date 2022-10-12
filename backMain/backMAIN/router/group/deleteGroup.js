module.exports = function(db,app){
    app.post('/dltGrp', function(req,res){
        if(!req.body){
            return res.sendStatus(400)
        }
        //error status
        let status = [];

        //group object created
        let grpObj = req.body.groupname

        //collection
        const colGroups = db.collection('groups');
        
    
        

        colGroups.find({'group':grpObj}).count((err,count)=>{
            //If exists delete group
            if (count == 0){
                //No group with that name
                status.push(1);
                res.send(status);

                
            }else{  //Group exists
                colGroups.deleteOne({'group':grpObj}, (err, result)=>{
                    colGroups.find({}).toArray((err,data)=>{
                        res.send(data);
                    });
                });
            }
        });
    });
}