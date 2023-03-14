const venderModelSchema = require("../models/venderModelSchema")
const sendMailer = require('../services/venderEmailServices')
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

//1 st API user signup ..................................................................................
const venderSignUp = async (req, res) => {
    try {
        const isEmailExists = await venderModelSchema.findOne({ venderEmail: req.body.venderEmail });
        if (isEmailExists) {
            res.status(409).json({
                success: false,
                message: "This email is already exists"
            });
        }
        else {
            const venderSignUp = await new venderModelSchema(req.body)
            const salt = await bcrypt.genSalt(10);
            venderSignUp.password = await bcrypt.hash(req.body.password, salt);
            try {
                const filePath = `/uploads/${req.file.filename}`;
                venderSignUp.venderProfilePic = filePath;
                venderSignUp.save();
                res.status(201).json({
                    success: true,
                    message: "The vender register successfully"
                });
            } catch (err) {
                res.status(400).json({
                    success: false,
                    message: "Error occur" + err.message
                });
            }
        }
    }
    catch (err) {
        res.status(400).json({
            success: false,
            message: "Error occur" + err.message
        });
    }
}
//2nd API of user Login.............................................................................................
const venderLogin = async (req, res) => {
    try {
        const { venderEmail, password } = req.body;
        if (venderEmail && password) {
            const vender = await venderModelSchema.findOne({ venderEmail: venderEmail });
            if (vender != null) {
                const isMatch = await bcrypt.compare(password, vender.password);
                if (venderEmail === venderEmail && isMatch) {
                    const token = jwt.sign({ venderId: vender._id }, process.env.jwt_secretKey, { expiresIn: '5d' });
                    res.status(200).send({
                        success: true,
                        message: "Login Success",
                        "data": vender,
                        "token": token
                    });
                }
                else {
                    res.status(400).send({
                        success: false,
                        message: "Email or Password is not valid",
                    });
                }
            } else {
                res.status(400).send({
                    success: false,
                    message: " you are not a register User"
                });
            }
        }
    } catch (err) {
        res.status(400).json({
            Success: false,
            message: "Error occur" + err.message
        });
    }
};
//3rd user resend password API................................................................................
const resetPasswordThroughEmail = async (req, res) => {
    const { venderEmail } = req.body;
    try {
        const vender = await venderModelSchema.findOne({ venderEmail: venderEmail });
        if (vender != null) {
            const secret = process.env.jwt_secretKey;
            const token = jwt.sign({ venderId: vender._Id }, secret, { expiresIn: '60m' });
            const link = 'http://127.0.0.1:9000/api/user/reset/${user._Id}/${token}';
            const id = vender._id
            const emailSend = await sendMailer.sendEmail(venderEmail, token, id)

            return res.status(201).json({
                success: true,
                message: "Email send to vender successfully",
                venderId: vender._id,
                token: token
            });
        } else {
            res.status(403).json({
                success: false,
                message: "Email vender is not found"
            });
        }
    } catch (err) {
        res.status(500).json({
            success: false,
            message: err.message,
        });
    }
};
//4Th Reset Password Api 
const userPasswordReset = async (req, res) => {
    const { id, token } = req.params;
    const { newPassword, confirmPassword } = req.body;
    try {
        const checkUser = await venderModelSchema.findById(id);
        if (checkUser != null) {
            const secretKey = process.env.jwt_secretKey;
            jwt.verify(token, secretKey);
            if (newPassword === confirmPassword) {
                const salt = await bcrypt.genSalt(10);
                const password = await bcrypt.hash(confirmPassword, salt);
                await venderModelSchema.findByIdAndUpdate(checkUser._Id, { $set: { password: password }, });
                res.status(200).json({
                    success: true,
                    message: "password successfully update",
                });
            } else {
                res.status(403).json({
                    success: false,
                    message: "password and Confirmpassword is not match",
                });
            }
        } else {
            res.status(403).json({
                success: false,
                message: "email user is not found"
            });
        }
    } catch (err) {
        res.status(500).json({
            success: false,
            message: err.message,
        });
    }
};

module.exports = {
    venderSignUp,
    venderLogin,
    resetPasswordThroughEmail,
    userPasswordReset
}