/*
 *  (including 3rd party web sites) or distributed to other students.
 *
 *  Name: ___Xiaochen Wang__ Student ID: ___015297153_____ Date: ____2-06-2017__
 *
 *  Online (Heroku) Link:  https://fast-forest-51536.herokuapp.com/
 *
 ********************************************************************************/
var express = require("express");
var gulp = require("gulp");
var app = express();
var path = require("path");
var data_service = require("./data-service.js");
const dataServiceComments = require("./data-service-comments.js");
const exphbs = require('express-handlebars');
const bodyParser = require('body-parser');

var HTTP_PORT = process.env.PORT || 3000;

app.listen(HTTP_PORT, function onHttpStart() {
    console.log("==========    System is running   ==========");
    console.log("===                                      ===");
    console.log("== Express http server listening on: " + HTTP_PORT + " ==");
    console.log("===                                      ===");
    console.log("============================================");
    return new Promise((res, req) => {
        data_service.initialize().then(()=> {
            console.log("============================================");
            console.log("Now can connect to the dataService.js!!!!!!");
            console.log("============================================");
        }).catch((err) => {
            console.log(err);
        });
        dataServiceComments.initialize().then(() => {
                console.log("\n");
                console.log("=====================================================================");
                console.log(">>> Call initialize Suceess!!! where from data-service-comment.js <<<");
                console.log("=====================================================================");
                console.log("\n");
                // dataServiceComments.addComment({
                //     authorName: "Comment 1 Author",
                //     authorEmail: "comment1@mail.com",
                //     subject: "Comment 1111111111",
                //     commentText: "Comment Text 1"}, {
                //         versionKey: false
                //     }).then((id) => {
                //         console.log("This is Comment object id from addReply: "+ id);
                //         dataServiceComments.addReply({
                //             comment_id: id,
                //             authorName: "Reply 111111111111111111 Author",
                //             authorEmail: "reply1@mail.com",
                //             commentText: "Reply Text 22222222222"
                //         }).then(dataServiceComments.getAllComments).then((data) => {
                //             console.log("comment: " + data[data.length - 1]);
                //             // process.exit();
                //         });
                //     });
                // }).catch((err) => {
                //     console.log("Error: " + err);
                //     process.exit();
           }).catch((err) => {
               console.log(err);
            });
        }).catch(()=> {
            console.log("unable to start dataService");
    });
});
// Load CSS file
app.use(express.static('public'));

app.use(bodyParser.urlencoded({ extended: true }));
app.engine(".hbs", exphbs({
    extname: ".hbs",
    defaultLayout: 'layout',
    helpers: {
        equal: (lvalue, rvalue, options) => {
            if (arguments.length < 3)
                throw new Error("Handlebars Helper equal needs 2 parameters");
            if (lvalue != rvalue) {
                return options.inverse(this);
            } else {
                return options.fn(this);
            }
        }
    }
}));
app.set("view engine", ".hbs");

/////////////////////////////////////Get Route //////////////////////////////////

// setup a 'route' to listen on the default url path (http://localhost)
app.get("/", (req, res) => {
    res.render("home");
});

// setup another route to listen on /about
app.get("/about", (req, res) => {
    dataServiceComments.getAllComments().then((dataFromPromise) => {
        // res.send(dataFromPromise);
        res.render("about", {data: dataFromPromise});
    }).catch(() => {
        res.render("about");
    });
});

app.get("/employees", (req, res) => {
    if (req.query.status) {
        data_service.getEmployeesByStatus(req.query.status).then((data) => {
            res.render("employeeList", { data: data, title: "Employees" });
        }).catch((err) => {
            res.render("employeeList", { data: {}, title: "Employees" });
        });
    } else if (req.query.department) {
        data_service.getEmployeesByDepartment(req.query.department).then((data) => {
            res.render("employeeList", { data: data, title: "Employees" });
        }).catch((err) => {
            res.render("employeeList", { data: {}, title: "Employees" });
        });
    } else if (req.query.manager) {
        data_service.getEmployeesByManager(req.query.manager).then((data) => {
            res.render("employeeList", { data: data, title: "Employees" });
        }).catch((err) => {
            res.render("employeeList", { data: {}, title: "Employees" });
        });
    } else {
        data_service.getAllEmployees().then((data) => {
            res.render("employeeList", { data: data, title: "Employees" });
        }).catch((err) => {
            res.render("employeeList", { data: {}, title: "Employees" });
        });
    }
});

app.get("/employee/:empNum", (req, res) => {
    // initialize an empty object to store the values
    let viewData = {};
    data_service.getEmployeeByNum(req.params.empNum).then((data) => {
        viewData.data = data; //store employee data in the "viewData" object as "data"
    }).catch(() => {
        viewData.data = null; // set employee to null if there was an error
    }).then(data_service.getDepartments).then((data) => {
        viewData.departments = data; // store department data in the "viewData" object as "departments"
                                     // loop through viewData.departments and once we have found the departmentId that matches
                                     // the employee's "department" value, add a "selected" property to the matching
                                     // viewData.departments object
        for (let i = 0; i < viewData.departments.length; i++) {
            if (viewData.departments[i].departmentId == viewData.data[0].department) {
                viewData.departments[i].selected = true;
            }
        }
        // if not add department set Selected to false and promto a message to user, message like "Please Choose Department" in html.
        if (viewData.departments[viewData.departments.length-1].departmentId != viewData.data[0].department) {
            viewData.departments.Selected = false;
        }
    }).catch(() => {
        viewData.departments = []; // set departments to empty if there was an error
    }).then(() => {
        if (viewData.data == null){ // if no employee - return an error
            res.status(404).send("Employee Not Found!!!");
        } else {
            res.render("employee", { viewData: viewData }); // render the "employee" view
        }
    });
});

app.get("/managers", (req, res) => {
    data_service.getManagers().then((data) => {
        res.render("employeeList", { data: data, title: "Employees (Managers)" });
    }).catch((err) => {
        res.render("employeeList", { data: {}, title: "Employees (Managers)" });
    });
});

app.get("/departments", (req, res) => {
    data_service.getDepartments().then((data) => {
        res.render("departmentList", { data: data, title: "Departments" });
    }).catch((err) => {
        res.render("departmentList", { data: {}, title: "Departments" });
    });
});

app.get("/employees/add", (req, res) => {
    data_service.getDepartments().then((data) => {
        res.render("addEmployee",{departments: data});
    }).catch((err) => {
        res.render("addEmployee", {departments: []});
    });
});

app.get("/departments/add", (req, res) => {
    res.render("addDepartment",{title: "Department"});
});

app.get("/employee/delete/:empNum", (req, res) => {
    data_service.deleteEmployeeByNum(req.params.empNum).then((data) => {
        res.redirect("/employees");
    }).catch((err) => {
        res.status(500).send("Unable to Remove Employee / Employee not found");
    });
});

app.get("/department/:departmentId", (req, res) => {
    data_service.getDepartmentById(req.params.departmentId).then((data) => {
        res.render("department", {
           data: data
        });
    }).catch((err) => {
        res.status(404).send("Department Not Found");
    });
});

/////////////////////////////////////Post Route /////////////////////////////////

app.post("/employees/add", (req, res) => {
    data_service.addEmployee(req.body).then((data) => {
        res.redirect("/employees");
    }).catch((err) => {
        console.log(err);
    });
});

app.post("/employees/update", (req, res) => {
    res.redirect("/employees");
});

app.post("/employee/update", (req, res) => {
    data_service.updateEmployee(req.body).then((data) => {
        res.redirect("/employees");
    }).catch((err) => {
        console.log(err);
    });
});

app.post("/departments/add", (req, res) => {
    data_service.addDepartment(req.body).then((data) => {
        res.redirect("/departments");
    }).catch(() => {
        console.log(err);
    });
});

app.post("/department/update", (req,res) => {
    data_service.updateDepartment(req.body).then((data) => {
        res.redirect("/departments");
    });
});

app.post("/about/addComment", (req, res) => {
    dataServiceComments.addComment(req.body).then((data) => {
        res.redirect("/about");
    }).catch(() => {
        res.reject("error to the console");
        res.redirect("/about");
    });
});

app.post("/about/addReply", (req, res) => {
    dataServiceComments.addReply(req.body).then((data) => {
        //res.send(data);
        res.redirect("/about");
    }).catch((err) => {
        // reject("error to the console");
        redirect("/about");
    });
});

// error 404 always put last
app.use((req, res) => {
    res.status(404).send("Sorry!!!!!!!>>>Page Not Found! <<<:(");
});

///////////////////////////////////////////////////////////////////
