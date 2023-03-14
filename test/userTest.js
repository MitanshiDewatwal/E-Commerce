// let server = require("../index");
// let chaiHttp = require("chai-http");
// var chai = require("chai");
// const utils = require("../models/userModelSchema.js");
// let routes = require("../routes/userRoutes.js");
// const { trusted } = require("mongoose");
// chai.should();
// chai.use(chaiHttp);

// // //2nd API test case
// describe("POST/api/user", () => {
//     it("It  should return login user detail :", (done) => {
//         const data = {
//             userEmail: "mitanshidewatwal@gmail.com",
//             password: "123ABCabcde",
//             userRole: "user"
//         };
//         chai
//             .request(server)
//             .post("/user/login")
//             .send(data)
//             .end((err, res) => {
//                 res.should.have.status(200);
//                 res.should.be.a("object");
//                 res.body.should.have.property("success").eq(true);
//                 res.body.should.have.property("message").eq("Login Success");
//                 res.body.should.have.property("token");
//                 done();
//             })
//     })
// })
// it("It  should return error message:", (done) => {
//     const data = {
//         userEmail: "mitanshidewatwa@gmail.com",
//             password: "123ABCabcde",
//             userRole: "user"
//     };
//     chai
//         .request(server)
//         .post("/user/login")
//         .send(data)
//         .end((err, res) => {
//             res.should.have.status(400);
//             res.body.should.have.property("success").eq(false);
//             res.body.should.have.property("message").eq(" you are not a register User");

//             done();
//         })
// })

// it("It  should return Email or Password Error Message:", (done) => {
//     const data = {
//         userEmail: "mitanshidewatwal@gmail.com",
//             password: "123ABCabcd",
//             userRole: "user"
//     };
//     chai
//         .request(server)
//         .post("/user/login")
//         .send(data)
//         .end((err, res) => {
//             res.should.have.status(400);
//             res.body.should.have.property("success").eq(false);
//             res.body.should.have.property("message").eq("Email or Password is not valid");

//             done();
//         })
// })

// // //signUp API test cases .............................................................................
// // describe("POST/api/user", () => {
// //     it("It  should return  user  signUp detail :", (done) => {
// //         const data = {
// //             userName: "Mitanshi Dewatwal",
// //             userEmail: "sarthak@gmail.com",
// //             password: "123456ABCDEabcde!@#$%",
// //             city: "dewas",
// //             phoneNo: "9617273505",
// //             address: "215 MG Road Dewas MP",
// //             gender: "female"


// //         };
// //         chai
// //             .request(server)
// //             .post("/user/signUp")
// //             .set("Content-Type", "application/x-www-form-urlencoded")
// //             .field(data)
// //             .attach("profilePic", "/Users/Dell/OneDrive/Desktop/3image.jpg", "3image.jpg")
// //             .send(data)
// //             .end((err, res) => {
// //                 res.should.have.status(201);
// //                 res.should.be.a("object");
// //                 res.body.should.have.property("success").eq(true);
// //                 res.body.should.have.property("message").eq("The user register successfully");
// //                 done();
// //             })
// //     })
// // })

// // describe("POST/api/user", () => {
// //     it("It  should  give error in signUp detail :", (done) => {
// //         const data = {
// //             userName: "Mitanshi Dewatwal",
// //             userEmail: "sarthakdewatwal555@gmail.com",
// //             password: "123456ABCDEabcde!@#$%",
// //             city: "dewas",
// //             phoneNo: "9617273505",
// //             address: "215 MG Road Dewas MP",
// //             gender: "female"

// //         };
// //         chai
// //             .request(server)
// //             .post("/user/signUp")
// //             .set("Content-Type", "application/x-www-form-urlencoded")
// //             .field(data)
// //             .attach("profilePic", "/Users/Dell/OneDrive/Desktop/3image.jpg", "3image.jpg")
// //             .send(data)
// //             .end((err, res) => {
// //                 res.should.have.status(409);
// //                 res.should.be.a("object");
// //                 res.body.should.have.property("success").eq(false);
// //                 res.body.should.have.property("message").eq("This email is already exists");
// //                 done();
// //             })
// //     })
// // })



// // //send email test API.........................................................................
// describe("POST/api/user", () => {
//     it("It  should sends mail to us :", (done) => {
//         const data = {
//             userEmail: "mitanshidewatwal@gmail.com"
//         };
//         chai
//             .request(server)
//             .post("/user/resetPassword")
//             .send(data)
//             .end((err, res) => {
//                 res.should.have.status(201);
//                 res.should.be.a("object");
//                 res.body.should.have.property("success").eq(true);
//                 res.body.should.have.property("message").eq("Email send to user successfully");
//                 res.body.should.have.property("token");
//                 done();
//             })
//     })
// })

// describe("POST/api/user", () => {
//     it("It  should give error in sending mail to us :", (done) => {
//         const data = {
//             userEmail: "mitanshdewatwal@gmail.com"
//         };
//         chai
//             .request(server)
//             .post("/user/resetPassword")
//             .send(data)
//             .end((err, res) => {
//                 res.should.have.status(403);
//                 res.should.be.a("object");
//                 res.body.should.have.property("success").eq(false);
//                 res.body.should.have.property("message").eq("Email user is not found");
//                 done();
//             })
//     })
// })

// // //Reset  password .........................................................................

// describe("POST/api/user", () => {
//     it("It  should reset our password:", (done) => {
//         const data = {
            
//                 newPassword: "Mitanshi@505",
//                 confirmPassword: "Mitanshi@505"
            
//         };
//         chai
//             .request(server)
//             .post("/user/passwordReset/640a0901022eae807cbb64b0/eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2NDBhMDkwMTAyMmVhZTgwN2NiYjY0YjAiLCJpYXQiOjE2NzgzODAzMzIsImV4cCI6MTY3ODgxMjMzMn0.Rpw7VXChRTIuewYbDfTIJLMvwhFUU4Wh4DNTpghEyUM")
//             .send(data)
//             .end((err, res) => {
//                 res.should.have.status(200);
//                 res.should.be.a("object");
//                 res.body.should.have.property("success").eq(true);
//                 res.body.should.have.property("message").eq("password successfully update");
//                 done();

//             })
//     })
// })


// describe("POST/api/user", () => {
//     it("It  should give error in rest password and tells password and confirm password is not match:", (done) => {
//         const data = {
//             newPassword: "Mitanshi@505",
//             confirmPassword: "Mitansh@505"
//         };
//         chai
//             .request(server)
//             .post("/user/passwordReset/640a0901022eae807cbb64b0/eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2NDBhMDkwMTAyMmVhZTgwN2NiYjY0YjAiLCJpYXQiOjE2NzgzODAzMzIsImV4cCI6MTY3ODgxMjMzMn0.Rpw7VXChRTIuewYbDfTIJLMvwhFUU4Wh4DNTpghEyUM")
//             .send(data)
//             .end((err, res) => {
//                 res.should.have.status(403);
//                 res.should.be.a("object");
//                 res.body.should.have.property("success").eq(false);
//                 res.body.should.have.property("message").eq("password and Confirmpassword is not match");
//                 done();

//             })
//     })
// })
