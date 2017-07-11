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
    console.log("==========================================================");
    console.log("=+++++++++   This is initialize fuction   +++++++++++++++=");
    console.log("==========================================================");
    return new Promise(function (resolve, reject) {
        let db = mongoose.createConnection("mongodb://xwang345:Xlxc101302#@ds151752.mlab.com:51752/web322_a6");
        db.on('error', (err) => {
            reject(err); // reject the promise with the provided error
        });
        db.once('open', () => {
            resolve(Comment = db.model("contentSchema", contentSchema));
        });
    });
};

module.exports.addComment = (data) => {
    // console.log(data);
    console.log("==========================================================");
    console.log("=+++++++++   This is addComment function   ++++++++++++++=");
    console.log("==========================================================");
    data.postedData = Date.now();
    console.log(data);
    return new Promise((resolve, reject) => {
        let newComment = new Comment();
        // console.log("/////////"+newComment);
        newComment.save((err) => {
            if(err) {
                reject("There was an error saving the comment: ${err}");
            } else {
                console.log("This is newConmment id from addComment fuction in data-service-comments.js: "+newComment._id);
                resolve(newComment._id);
            }
        });
    });
}

module.exports.getAllComments = () => {
    console.log("==========================================================");
    console.log("=+++++++++   This is getAllComments function   ++++++++++=");
    console.log("==========================================================");
    return new Promise((resolve, reject) => {
    Comment.find({postedData}).exec().then(() => {
            if(!postedData) {
                reject();
                // console.log("No company could be found");
            } else {
                resolve();
            }
        // exit the program after saving
            process.exit();
        }).catch((err) => {
            console.log('There was an error: ${err}');
        });
    });
}

module.exports.addReply = (data) => {
    console.log("==========================================================");
    console.log("=+++++++++   This is addReply function   ++++++++++++++++=");
    console.log("==========================================================");
    data.repliedDate = Date.now();
    console.log(data);
    return new Promise((resolve, reject) => {
        // if ( data._id == data.comment_id) {
            resolve(Comment.update({ _id: data.comment_id},
            { $addToSet: { replies: data } },
            { multi: false }).exec());
        // }
    }).catch(() => {
        reject();
    })
}
