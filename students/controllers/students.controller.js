const StudentModel = require('../models/students.model');
const { body, validationResult } = require('express-validator');

exports.listStudents = (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

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
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    StudentModel.findByStudentID(req.params.studentID)
        .then((result) => {
            result = result.toJSON();
            delete result._id;
            delete result.__v;
            res.status(200).send(result);
        })
        .catch((err) => {
            res.status(404).json({error: "Not found"})
        });
    
};

exports.updateByStudentID = (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    StudentModel.findByStudentIdAndUpdate(req.params.studentID, req.body)
        .then((result) => {
            result = result.toJSON();
            delete result._id;
            delete result.__v;
            res.status(200).send(result);
        })
        .catch((err) => {
            res.status(404).json({error: "Not found"})
        });
    
};

exports.createStudent = (req, res) => {
    
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    StudentModel.createStudent(req.body)
        .then((result) => {
            res.status(201).send({id: result._id});
        })
        .catch((err) => {
            res.status(400).json({error: err})
        });
};