// const mongoose = require('mongoose');
// let Schema = mongoose.Schema;

// dbURI = "mongodb://localhost/web322";
// mongoose.connect(dbURI);

// mongoose.connection.on('connected', function () {
//   console.log('Mongoose default connection open to ' + dbURI);
// });

// var contentSchema = new Schema({
//     "authorName": String,
//     "authorEmail": String,
//     "subject": String,
//     "postedDate": Date,
//      "replies": {
//         "comment_id": String,
//         "authorName": String,
//         "authorEmail": String,
//         "authorText": String,
//         "repliedDate": Date
//      },
// });

// let Comment = mongoose.model("web322_A6", contentSchema); // to be defined on new connection (see initialize)

// require mongoose and setup the Schema
var mongoose = require("mongoose");
var Schema = mongoose.Schema;

mongoose.Promise = global.Promise;  
// connect to the localhost mongo running on default port 27017
var db = mongoose.connect('mongodb://localhost/web322');

// define the company schema
var companySchema = new Schema({
  "companyName":  String,
  "address": String,
  "phone": String,
  "employeeCount": {
    "type": Number,
    "default": 0
  },
  "country": String
});
// register the Company model using the companySchema
// use the web322_companies collection in the db to store documents
var Company = mongoose.model("web322_companies", companySchema);

// create a new company
var kwikEMart = new Company({
  companyName: "The Kwik-E-Mart",
  address: "Springfield",
  phone: "212-842-4923",
  employeeCount: 3,
  country: "U.S.A"
});

// save the company
kwikEMart.save((err) => {
  if(err) {
    console.log("There was an error saving the Kwik-E-Mart company");
  } else {
    console.log("The Kwik-E-Mart company was saved to the web322_companies collection");
  }
  // exit the program after saving
  process.exit();
});