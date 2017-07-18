const mongoose = require('mongoose');
let Schema = mongoose.Schema;

mongoose.Promise = global.Promise;

var contentSchema = new Schema({
    "authorName": String,
    "authorEmail": String,
    "subject": String,
    "postedDate": Date,
    "commentText": String,
     "replies": {
         "_id": String,
        "comment_id": String,
        "authorName": String,
        "authorEmail": String,
        "commentText": String,
        "repliedDate": Date
     }
});
var Comment; // to be defined on new connection (see initialize)

var dbURI = "mongodb://xwang345:Wxc111222@ds047950.mlab.com:47950/web322-a6"

module.exports.initialize = () => {
    console.log("============================================");
    console.log("===                                      ===");
    console.log("===           MongoDB initialize         ===");
    console.log("===                                      ===");
    console.log("============================================");
    console.log("\n")
    console.log(">>> DB dbURI: " + dbURI + " <<<");
    console.log("\n")
    return new Promise((resolve, reject) => {
        let db = mongoose.createConnection(dbURI);
        db.on('error', (err) => {
            reject(err); // reject the promise with the provided error
        });
        db.once('open', () => {
            Comment = db.model("contentSchema", contentSchema);
            resolve("Secess initialize MongoDB");
        });
    });
};

module.exports.addComment = (data) => {
    console.log("============================================");
    console.log("===                                      ===");
    console.log("===    This is addComment function       ===");
    console.log("===                                      ===");
    console.log("============================================");
    data.postedDate = Date.now();
    return new Promise((resolve, reject) => {
        var newComment = new Comment(data);
        newComment.save((err) => {
            if(err) {
                reject("There was an error saving the comment: ${err}");
            } else {
                console.log("===   Object is saving in the database.  ===");
                console.log(data);
                console.log("============================================");
                console.log("This is Comment object id from addComent: " + newComment._id);
                resolve(newComment._id);
            }
        });
    });
};

module.exports.getAllComments = () => {
    console.log("=============================================");
    console.log("===                                       ===");
    console.log("===     This is getAllComments function   ===");
    console.log("===                                       ===");
    console.log("=============================================");
    return new Promise((resolve, reject) => {
        Comment.find().sort({postedDate:1}).exec().then((data) => {
            resolve(data);
        }).catch((err) => {
            console.log('There was an error: ${err}');
        });
    });
};

module.exports.addReply = (data) => {
    console.log("=============================================");
    console.log("===                                       ===");
    console.log("===    This is addReply function          ===");
    console.log("===                                       ===");
    console.log("=============================================");
    data.repliedDate = Date.now();
    console.log("===          addReply messages            ===");
    console.log(data);
    console.log("=============================================");
    return new Promise((resolve, reject) => {
        if (data._id == data.comment_id) {
            Comment.update({ _id: data.comment_id},
            { $addToSet: { replies: data}},{ multi: false }).exec();
            resolve(data);
        }
    }).catch((err) => {
        reject("It is error");
    });
};
