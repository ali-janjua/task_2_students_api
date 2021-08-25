const mongoose = require('../../common/services/mongoose.service').mongoose;
const Schema = mongoose.Schema;

const studentSchema = new Schema({
    studentID: String,
    firstName: String,
    lastName: String,
    gender: String
 });

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
            .exec(function (err, users) {
                if (err) {
                    reject(err);
                } else {
                    resolve(users);
                }
            })
    });
};