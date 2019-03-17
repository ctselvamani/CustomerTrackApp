const Employee = require('../models/employee');
const Banklocation= require('../models/banklocation');
const Customertrack = require('../models/customertrack');
const { body,validationResult } = require('express-validator/check');
const { sanitizeBody } = require('express-validator/filter');

var async = require('async');

//get call to test 
exports.test = function (req, res) {
    res.send('Greetings from the Test controller!');
};

exports.index = function(req, res) {   
        res.render('index', { title: 'My Bank' });
};


exports.customertrack_create_get = function(req, res, next) { 
    // Get all authors and genres, which we can use for adding to our book.
    async.parallel({
        employees: function(callback) {
            Employee.find(callback);
        },
        banklocations: function(callback) {
            Banklocation.find(callback);
        },
    }, function(err, results) {
        if (err) { return next(err); }
        res.render('customertrack_form', { title: 'Track Customer', employees: results.employees, banklocations: results.banklocations });
    });
};

// Handle book create on POST.
exports.customertrack_create_post= [
    // Validate fields.
    body('firstname', 'Firstname cannot be empty.').isLength({ min: 1 }).trim(),
    body('lastname', 'Lastname cannot be empty.').isLength({ min: 1 }).trim(),
    body('email', 'Emailaddress cannot be empty.').isLength({ min: 1 }).trim(),
    body('iscustomer', 'Choose whether existing customer.').isLength({ min: 1 }).trim(),
    body('city', 'City cannot be empty.').isLength({ min: 1 }).trim(),
    body('zip', 'Enter valid Zip').isLength({ min: 1, max: 5}).trim(),
    body('typeofinter', 'Enter valid interaction type').isLength({ min: 1}).trim(),
    body('lengthofinter', 'Enter valid minutes').isLength({ min: 1,max:3}).trim(),
    body('banklocation', 'Bank Location cannot be empty').isLength({ min: 1}).trim(),
    body('empid', 'Employee ID cannot be empty').isLength({ min: 1}).trim(),
  
    // Sanitize fields (using wildcard).
    sanitizeBody('*').trim().escape(),

    // Process request after validation and sanitization.
    (req, res, next) => {
        
        // Extract the validation errors from a request.
        const errors = validationResult(req);

        // Create a Book object with escaped and trimmed data.
        var customertrack= new Customertrack(
          { firstname: req.body.firstname,
            lastname: req.body.lastname,
            email: req.body.email,
            iscustomer: req.body.iscustomer,
            city: req.body.city,
            zip: req.body.zip,
            typeofinter: req.body.typeofinter,
            lengthofinter: req.body.lengthofinter,
            additionalcoms: req.body.additionalcoms,
            banklocation: req.body.banklocation,
            empid: req.body.empid,

           });

        if (!errors.isEmpty()) {
            // There are errors. Render form again with sanitized values/error messages.

            res.render('customertrack_form', { title: 'Track Customer',errors: errors.array() });
            return;
        }
        else {
            // Data from form is valid. Save book.
            customertrack.save(function (err) {
                if (err) { return next(err); }
                   //successful - redirect to new book record.
                   res.redirect(customertrack.url);
                });
        }
    }
];

// Display detail page for a specific book.
exports.customertrack_detail= function(req, res) {

    Customertrack.findById(req.params.id, function (err, customertrack) {
        if (err) return next(err);
        if (customertrack==null) { // No results.
           var err = new Error('Customer Track not found');
           err.status = 404;
           return next(err);
        }
        // Successful, so render.
        res.render('customertrack_detail', { title: 'Name', customertrack: customertrack } );
    })
};

exports.customertrack_banklocation_post = [
    // Validate fields.
    body('banklocation', 'Bank Location cannot be empty').isLength({ min: 1}).trim(),

    // Sanitize fields (using wildcard).
    sanitizeBody('*').trim().escape(),

    // Process request after validation and sanitization.
    (req, res, next) => {

        // Extract the validation errors from a request.
        const errors = validationResult(req);
        const banklocationurl = '/customertrack/banklocation/' + req.body.banklocation;
                   res.redirect(banklocationurl);
        }
];

exports.customertrack_banklocation_get = function(req, res, next) {
    async.parallel({
        banklocations: function(callback) {
            Banklocation.find(callback);
        },
    }, function(err, results) {
        if (err) { return next(err); }
        res.render('banklocation_form', { title: 'Report by Branch Loction', banklocations: results.banklocations });
    });
};


// Display detail page for a specific book.
exports.customertrack_banklocation_detail= function(req, res) {

    Customertrack.find({banklocation:req.params.banklocation}, function (err, customertrack) {
        if (err) return next(err);
        if (customertrack==null) { // No results.
           var err = new Error('Customer Track not found');
           err.status = 404;
           return next(err);
        }
        // Successful, so render.
        res.render('customertrack_banklocation_details', { title: 'Branch Location: ' + req.params.banklocation, customertrack: customertrack } );
    })
};
