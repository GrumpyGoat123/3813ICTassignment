const getRoom = (username) => {
    const db = client.db("3813ICT");

    const colUser = db.collection('usersExtended');

    colUser.find({"username":username}).toArray().then(function(docs){
        console.log(docs);
    })
}

module.exports = {getRoom};

