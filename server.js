/*********************************************************************************
 *  WEB322 –Assignment05
 *  I declare that this assignment is my own work in accordance with Seneca  Academic Policy.  No part
 *  of this assignment has been copied manually or electronically from any other source
 *  (including 3rd party web sites) or distributed to other students.
 *
 *  Name: ___Xiaochen Wang__ Student ID: ___015297153_____ Date: ____23-06-2017__
 *
 *  Online (Heroku) Link:  https://fast-forest-51536.herokuapp.com/
 *
 ********************************************************************************/
var express = require("express");
var app = express();
var path = require("path");
var data_service = require("./data-service.js");
const exphbs = require('express-handlebars');
const bodyParser = require('body-parser');

var HTTP_PORT = process.env.PORT || 8080;

function onHttpStart() {
    console.log("Express http server listening on: " + HTTP_PORT);
    return new Promise((res, req) => {
        data_service.initialize().then((data) => {
            console.log(data)
        }).catch((err) => {
            console.log(err);
        });
    });
}

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

// alternative method.
// app.use(express.static(path.join(__dirname, 'public')));

/////////////////////////////////////Get Route //////////////////////////////////

// setup a 'route' to listen on the default url path (http://localhost)
app.get("/", (req, res) => {
    res.render("home");
});

// setup another route to listen on /about
app.get("/about", (req, res) => {
    res.render("about");
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

app.use((req, res) => {
    res.status(404).send("Sorry!!!!!!!>>>Page Not Found! <<<:(");
});

app.listen(HTTP_PORT, onHttpStart);
