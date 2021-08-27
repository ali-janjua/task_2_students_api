const StudentModel = require('../models/students.model');
const { validationResult }= require('express-validator/check');
const { body }= require('express-validator/check');

exports.listStudents = (req, res) => {

    checkForValidationErrors(req, res)

    let limit = req.query.limit && req.query.limit <= 100 ? parseInt(req.query.limit) : 10;
    let page = 0;
    if (req.query) {
        if (req.query.page) {
            req.query.page = parseInt(req.query.page);
            page = Number.isInteger(req.query.page) ? req.query.page : 0;
        }
    }
    StudentModel.list(limit, page)
        .then((result) => {
            res.status(200).send(result);
        })
};

exports.getByStudentID = (req, res) => {

    checkForValidationErrors(req, res)

    StudentModel.findByStudentID(req.params.studentID)
        .then((result) => {
            formatResult(req, res, result)
        })
        .catch((err) => {
            res.status(404).json({error: "Not found"})
        });
    
};

exports.updateByStudentID = (req, res) => {

    checkForValidationErrors(req, res)

    StudentModel.findByStudentIdAndUpdate(req.params.studentID, req.body)
        .then((result) => {
            formatResult(req, res, result)
        })
        .catch((err) => {
            res.status(404).json({error: "Not found"})
        });
    
};

exports.createStudent = (req, res) => {

    checkForValidationErrors(req, res)
    StudentModel.createStudent(req.body)
        .then((result) => {
            res.status(201).send({id: result._id})
        })
        .catch((err) => {
            res.status(400).json({error: err})
        });
};

exports.removeByStudentID = (req, res) => {
    StudentModel.removeByStudentID(req.params.studentID)
        .then((result)=>{
            res.status(204).send({})
        })
        .catch((err) => {
            res.status(400).json({error: err})
        });
};

exports.validate = (method) => {
    switch (method) {
      case 'student': {
        return [ 
            //Student ID must be 6 characters long, containing 3 letters and 3 numbers.
            body('studentID', 'Invalid studentID').matches(/[A-Z][A-Z][A-Z][0-9][0-9][0-9]/),
            body('firstName').isLength({ min: 2, max:30}),
            body('lastName').isLength({ min: 2, max:30}),
            body('gender', "Invalid gender, must be either Male or Female").matches(/^(Male|Female|MALE|FEMALE|male|female)$/),
        ]   
      }
    }
}

/*
* Private functions
*/
function checkForValidationErrors(req, res) {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
}

function formatResult(req, res, result) {
    result = result.toJSON();
    delete result._id;
    delete result.__v;
    res.status(200).send(result);
}