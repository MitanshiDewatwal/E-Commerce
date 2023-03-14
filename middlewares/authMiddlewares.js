const user = require("../models/userModelSchema");
const { string } = require("joi");
const jwt = require("jsonwebtoken");
const checkUserAuth = async (req, res, next) => {
    let token;
    const { authorization } = req.headers;
    if (authorization && authorization.startsWith("Bearer")) {
        try {
            token = authorization.split(" ")[1];
            const { userId } = jwt.verify(token, process.env.jwt_secretKey);
            req.user = await user.findById(userId).select('-password');
            next()
        } catch (err) {
            res.status(401).send({ status: "failed", message: "authenticaton failed ,unauthorized user" + err.message });
        }
    }
    if (!token) {
        res.status(401).send({ "message": "the user is unauthorized no token" })
    }
}


// exports.isUser = async (req, res, next) => {
//     if (req.user.user_type_id === 0) {
//         next();
//     }
//     return res.status(401).send("Unauthorized");
// }

// exports.isAdmin = async (req, res, next) => {
//     if (req.user.user_type_id === 1) {
//         next();
//     }
//     return res.status(401).send("Unauthorized");
// }

// ///vender.......................
// exports.isVender = async (req, res, next) => {
//     if (req.user.user_type_id === 0) {
//         next();
//     }
//     return res.status(401).send("Unauthorized");
// }

// exports.isAdmin = async (req, res, next) => {
//     if (req.user.user_type_id === 1) {
//         next();
//     }
//     return res.status(401).send("Unauthorized");
// }

const isUser = async(req,res,next)=>{
    let role=req.body.userRole
    if(role){
        if (role ==="user"){
            next();
        }else{
            res.status(400).json({
                message : "Role is not user",
            })
        }
     } else{
            res.status(400).json({
                message : "role is not present"
            })
        }
    }

    const isVender = async(req,res,next)=>{
        let role=req.body.venderRole
        if(role){
            if (role ==="vender"){
                next();
            }else{
                res.status(400).json({
                    message : "Role is not user",
                })
            }
         } else{
                res.status(400).json({
                    message : "role is not present"
                })
            }
        }
    

module.exports = {
    checkUserAuth,
    isUser,
    isVender
}