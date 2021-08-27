const StudentsController = require('./controllers/students.controller');

exports.routesConfig = function (app) {
    app.post('/una/students',
    [StudentsController.validate('student'), StudentsController.createStudent]);
    
    app.get('/una/students', [StudentsController.listStudents]);

    app.get('/una/students/:studentID', [StudentsController.getByStudentID]);

    app.put('/una/students/:studentID', [StudentsController.validate('student'), StudentsController.updateByStudentID]);

    app.delete('/una/students/:studentID', [StudentsController.validate('student'), StudentsController.removeByStudentID]);
}