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

exports.createStudent = (req, res) => {
    
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    StudentModel.createStudent(req.body)
        .then((result) => {
            res.status(201).send({id: result._id});
        });
};