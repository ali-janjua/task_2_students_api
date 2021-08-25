const mongoose = require('../../common/services/mongoose.service').mongoose;
var uniqueValidator = require('mongoose-unique-validator');
const Schema = mongoose.Schema;

const studentSchema = new Schema({
    studentID: {
        type:String,
        unique: true
    },
    firstName: String,
    lastName: String,
    gender: String
 });

studentSchema.plugin(uniqueValidator);



const Student = mongoose.model('Students', studentSchema);

exports.createStudent = (studentData) => {
    const student = new Student(studentData);
    return student.save();
};

exports.list = (perPage, page) => {
    return new Promise((resolve, reject) => {
        Student.find()
            .limit(perPage)
            .skip(perPage * page)
            .exec(function (err, students) {
                if (err) {
                    reject(err);
                } else {
                    resolve(students);
                }
            })
    });
};

exports.findByStudentID = (id) => {
    return new Promise((resolve, reject) => {
        Student.find({studentID: id})
            .exec(function (err, students) {
                if (err) {
                    reject(err);
                } else {
                    resolve(students[0]);
                }
            })
    });
};

exports.findByStudentIdAndUpdate = (id, studentData) => {
    return new Promise((resolve, reject) => {
        Student.find({studentID: id})
            .exec(function (err, students) {
                if (err) {
                    reject(err);
                } else {
                    resolve(Student.findOneAndUpdate({ studentID: id}, studentData, {new: true}));
                }
            })
    });
};