process.env.NODE_ENV = 'test';

let mongoose = require("mongoose");
let StudentModel = require('../students/models/students.model');

//Require the dev-dependencies
let chai = require('chai');
let chaiHttp = require('chai-http');
let server = require('../index');
let should = chai.should();


chai.use(chaiHttp);
process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0';

//Our parent block
describe('Students', () => {
    beforeEach((done) => { //Before each test we empty the database
        StudentModel.student.deleteMany({}, (err) => {
           done();
        });
    });
  
    /*
    * Test the /GET route
    */
    describe('/GET students', () => {
        it('it should GET an empty list of students', (done) => {
            chai.request(server)
                .get('/una/students')
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.be.a('array');
                    res.body.length.should.be.eql(0);
                    done();
                });
        });
    });

    describe('/GET student/:studentID', () => {
        it('it should not GET a record that does not exist', (done) => {
            chai.request(server)
                .get('/una/students/ABC001')
                .end((err, res) => {
                    res.should.have.status(404);
                    res.body.should.have.property('error');
                    res.body.error.should.be.eql("Not found");
                    done();
                });
        });
    });

    describe('/GET una/students', () => {
        it('it should GET a list of students', (done) => {
            const s = StudentModel.student({studentID: "ABC001", firstName: "Michael", lastName: "Piper", gender: "Male"});
            s.save()
            .then((res) => {
                chai.request(server)
                .get('/una/students')
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.be.a('array');
                    res.body.length.should.be.eql(1);
                    done();
                });
            })
            .catch((err) => {
                console.log(err)
            })
        });
    });

    describe('/GET una/student/:studentID', () => {
        it('it should GET a record', (done) => {
            const record = {studentID: "ABC001", firstName: "Michael", lastName: "Piper", gender: "Male"}
            const s = StudentModel.student(record);
            s.save()
            .then((res) => {
                chai.request(server)
                .get('/una/students/'+record.studentID)
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.be.eql(record);
                    done();
                });
            })
            .catch((err) => {
                console.log(err)
            });
        });
    });

    /*
    * Test the /POST route
    */
    describe('/POST una/student', () => {
        it('it should not POST a student without student ID', (done) => {
            let student = {
                firstName: "Michael",
                lastName: "Piper",
                gender: "Male"
            }
            chai.request(server)
                .post('/una/students')
                .send(student)
                .end((err, res) => {
                    res.should.have.status(400);
                    res.body.should.have.property('errors');
                    res.body.errors[0].param.should.be.eql("studentID");
                    res.body.errors[0].msg.should.be.eql("Invalid value")
                    done();
                });
        });
    });

    describe('/POST una/student', () => {
        it('it should not POST a student invalid student ID format', (done) => {
            let student = {
                studentID: "123456", // Valid format is 3 characters then 3 digits
                firstName: "Michael",
                lastName: "Piper",
                gender: "Male"
            }
            chai.request(server)
                .post('/una/students')
                .send(student)
                .end((err, res) => {
                    res.should.have.status(400);
                    res.body.should.have.property('errors');
                    res.body.errors[0].param.should.be.eql("studentID");
                    res.body.errors[0].msg.should.be.eql("Invalid value")
                    done();
                });
        });
    });

    describe('/POST una/student', () => {
        it('it should not POST a student invalid gender', (done) => {
            let student = {
                studentID: "ABC001",
                firstName: "Michael",
                lastName: "Piper",
                gender: "Test"
            }
            chai.request(server)
                .post('/una/students')
                .send(student)
                .end((err, res) => {
                    res.should.have.status(400);
                    res.body.should.have.property('errors');
                    res.body.errors[0].param.should.be.eql("gender");
                    res.body.errors[0].msg.should.be.eql("Invalid gender, must be either Male or Female")
                    done();
                });
        });
    });

    describe('/POST una/student', () => {
        it('it should POST a student', (done) => {
            let student = {
                studentID: "ABC001",
                firstName: "Michael",
                lastName: "Piper",
                gender: "Male"
            }
            chai.request(server)
                .post('/una/students')
                .send(student)
                .end((err, res) => {
                    res.should.have.status(201);
                    done();
                });
        });
    });

    /*
    * Test the /PUT route
    */
    describe('/PUT una/student/:studentID', () => {
        it('it should not update/PUT a student that does not exist', (done) => {
            let student = {
                studentID: "ABC001",
                firstName: "Michael",
                lastName: "Piper",
                gender: "Male"
            }
            chai.request(server)
                .put('/una/students/ABC001')
                .send(student)
                .end((err, res) => {
                    res.should.have.status(404);
                    done();
                });
        });
    });

    describe('/PUT una/student/:studentID', () => {
        it('it should update/PUT the student', (done) => {
            const record = {studentID: "ABC001", firstName: "Michael", lastName: "Piper", gender: "Male"}
            const s = StudentModel.student(record);
            s.save()
            .then((res) => {
                let student = {
                    studentID: record.studentID,
                    firstName: record.firstName,
                    lastName: "Petterson",
                    gender: record.gender
                }
                chai.request(server)
                    .put('/una/students/'+record.studentID)
                    .send(student)
                    .end((err, res) => {
                        res.should.have.status(200);
                        res.body.should.be.eql(student)
                        done();
                    });
            })
            .catch((err) => {
                console.log(err)
            })

            
        });
    });

    /*
    * Test the /DELETE route
    */
    describe('/DELETE una/student/:studentID', () => {
        it('it should DELETE a student', (done) => {
            // Create a record first
            const record = {studentID: "ABC001", firstName: "Michael", lastName: "Piper", gender: "Male"}
            const s = StudentModel.student(record);
            s.save()
            .then((res)=> {
                // Delete the record
                chai.request(server)
                    .delete('/una/students/'+record.studentID)
                    .end((err, res) => {
                        res.should.have.status(204);
                    });
                // Verify that it is deleted
                chai.request(server)
                    .get('/una/students')
                    .end((err, res) => {
                        res.should.have.status(200);
                        res.body.should.be.a('array');
                        res.body.length.should.be.eql(0);
                        done();
                    });
                })
            .catch((err) => {
                console.log(err)
            });
        });
    });

});