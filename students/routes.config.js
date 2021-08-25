const StudentsController = require('./controllers/students.controller');
const { body, validationResult } = require('express-validator');


exports.routesConfig = function (app) {
    app.post('/una/students',
    //Student ID must be 6 characters long, containing 3 letters and 3 numbers.
    body('studentID').isLength({ min: 6, max:6}).matches(/[A-Z][A-Z][A-Z][0-9][0-9][0-9]/),
    body('firstName').isLength({ min: 2, max:30}),
    body('lastName').isLength({ min: 2, max:30}),
    body('gender', "Invalid gender, must be either Male or Female").matches(/^(Male|Female|MALE|FEMALE|male|female)$/),
    [StudentsController.createStudent]);
    
    app.get('/una/students', [
        StudentsController.listStudents
    ]);

    app.get('/una/students/:studentID', [
        StudentsController.getByStudentID
    ]);
};