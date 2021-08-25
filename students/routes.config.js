const StudentsController = require('./controllers/students.controller');
const { body, validationResult } = require('express-validator');

exports.routesConfig = function (app) {
    app.post('/una/students', body('name').isEmail(),[StudentsController.createStudent]);
    app.get('/una/students', [
        StudentsController.listStudents
    ]);
};