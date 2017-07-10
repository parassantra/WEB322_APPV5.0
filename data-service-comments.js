const mongoose = require('mongoose');
let Schema = mongoose.Schema;

// mongoose.connection.on('connected', function () {
//   console.log('Mongoose default connection open to ' + dbURI);
// });

var contentSchema = new Schema({
    "authorName": String,
    "authorEmail": String,
    "subject": String,
    "postedDate": Date,
     "replies": {
        "comment_id": String,
        "authorName": String,
        "authorEmail": String,
        "authorText": String,
        "repliedDate": Date
     },
});
var Comment; // to be defined on new connection (see initialize)

module.exports.initialize = function () {
    return new Promise(function (resolve, reject) {
        let db = mongoose.createConnection("mongodb://xwang345:Xlxc101302#@ds151752.mlab.com:51752/web322_a6");
        // let db = mongoose.createConnection("mongodb://localhost:27017");
        db.on('error', (err)=>{
            reject(err); // reject the promise with the provided error
        });
        db.once('open', ()=>{
            Comment = db.model("web322_A6_contentSchema", contentSchema);
            resolve();
        });
    });
};

module.exports.addComment = (data) => {
    data.postedDate = Date.now();
    return new Promise((resolve, reject) => {
        let newComment = new Comment();
        newComment.save((err) => {
            if(err) {
                reject('There was an error saving the comment: ${err}');
            } else {
                resolve(data);
            }
        });
    });
}

module.exports.getAllComments = () => {
    return new Promise((resolve, reject) => {
    Comment.find({
        postedDate: postedDate
        }).exec().then((company) => {
            if(!company) {
                console.log("No company could be found");
            } else {
                console.log(company);
            }
        // exit the program after saving
            process.exit();
        }).catch((err) => {
            console.log('There was an error: ${err}');
        });
    });
}

module.exports.addReply = (data) => {
    console.log("+++++++++++"+Date.now());
    data.repliedDate = Date.now();
    return new Promise((resolve, reject) => {
        // if ( data.comment_id) {
            resolve(Comment.update({ companyName: "The Leftorium"},
            { $addToSet: { replies: data } }).exec());
        // }
    }).catch(() => {
        reject();
    })
}
