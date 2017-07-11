// var express = require("express");
// var app = express();
// var path = require("path");
// var mongoose = require("mongoose");
// var Schema = mongoose.Schema;

// // connect to the localhost mongo running on default port 27017
// mongoose.createConnection("mongodb://xwang345:Xlxc101302#@ds151752.mlab.com:51752/web322_a6");

// // define the company schema
// var companySchema = new Schema({
//   "companyName":  String,
//   "address": String,
//   "phone": String,
//   "employeeCount": {
//     "type": Number,
//     "default": 0
//   },
//   "country": String
// });
// // register the Company model using the companySchema
// // use the web322_companies collection in the db to store documents
// var Company = mongoose.model("web322_companies", companySchema);

// // create a new company
// var kwikEMart = new Company({
//   companyName: "The Kwik-E-Mart",
//   address: "Springfield",
//   phone: "212-842-4923",
//   employeeCount: 3,
//   country: "U.S.A"
// });

// // save the company
// kwikEMart.save((err) => {
//   if(err) {
//     console.log("There was an error saving the Kwik-E-Mart company");
//   } else {
//     console.log("The Kwik-E-Mart company was saved to the web322_companies collection");
//   }
//   // exit the program after saving
//   process.exit();
// });

var mongoose = require("mongoose");
var Schema = mongoose.Schema;

mongoose.createConnection("mongodb://xwang345:Xlxc101302#@ds151752.mlab.com:51752/web322_a6");

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

kwikEMart.save((err) => {
  if(err) {
    console.log("There was an error saving the Kwik-E-Mart company");
  }
  console.log("The Kwik-E-Mart company was saved to the web322_companies collection");
  Company.findOne({ companyName: "The Kwik-E-Mart" })
  .exec()
  .then((company) => {
    if(!company) {
      console.log("No company could be found");
    } else {
      console.log(company);
    }
    // exit the program after saving and finding
    process.exit();
  })
  .catch((err) => {
    console.log('There was an error: ${err}');
  });
});