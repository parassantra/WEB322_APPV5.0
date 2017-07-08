const mongoose = require('mongoose');
let Schema = mongoose.Schema;

mongoose.connect("mongodb://<>:<>@ds151752.mlab.com:51752/web322_a6");

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

let Comment = mongoose.model("web322_A6", contentSchema); // to be defined on new connection (see initialize)

