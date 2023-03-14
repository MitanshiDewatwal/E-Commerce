const userModelSchema = require("../models/userModelSchema")
const sendMailer = require('../services/userEmailServices')
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

//1 st API user signup ..................................................................................
const userSignUp = async (req, res) => {
    try {
        const isEmailExists = await userModelSchema.findOne({ userEmail: req.body.userEmail });
        if (isEmailExists) {
            res.status(409).json({
                success: false,
                message: "This email is already exists"
            });
        }
        else {
            const userSignUp = await new userModelSchema(req.body)
            const salt = await bcrypt.genSalt(10);
            userSignUp.password = await bcrypt.hash(req.body.password, salt);
            try {
                const filePath = `/uploads/${req.file.filename}`;
                userSignUp.profilePic = filePath;
                userSignUp.save();
                res.status(201).json({
                    success: true,
                    message: "The user register successfully"
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
const userLogin = async (req, res) => {
    try {
        const { userEmail, password } = req.body;
        if (userEmail && password) {
            const user = await userModelSchema.findOne({ userEmail: userEmail });
            if (user != null) {
                const isMatch = await bcrypt.compare(password, user.password);
                if (userEmail === userEmail && isMatch) {
                    const token = jwt.sign({ userId: user._id }, process.env.jwt_secretKey, { expiresIn: '5d' });
                    res.status(200).send({
                        success: true,
                        message: "Login Success",
                        "data": user,
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
    const { userEmail } = req.body;
    try {
        const user = await userModelSchema.findOne({ userEmail: userEmail });
        if (user != null) {
            const secret = process.env.jwt_secretKey;
            const token = jwt.sign({ userId: user._Id }, secret, { expiresIn: '60m' });
            const link = 'http://127.0.0.1:9000/api/user/reset/${user._Id}/${token}';
            const id = user._id
            const emailSend = await sendMailer.sendEmail(userEmail, token, id)

            return res.status(201).json({
                success: true,
                message: "Email send to user successfully",
                userId: user._id,
                token: token
            });
        } else {
            res.status(403).json({
                success: false,
                message: "Email user is not found"
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
        const checkUser = await userModelSchema.findById(id);
        if (checkUser != null) {
            const secretKey = process.env.jwt_secretKey;
            jwt.verify(token, secretKey);
            if (newPassword === confirmPassword) {
                const salt = await bcrypt.genSalt(10);
                const password = await bcrypt.hash(confirmPassword, salt);
                await userModelSchema.findByIdAndUpdate(checkUser._Id, { $set: { password: password }, });
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
    userSignUp,
    userLogin,
    resetPasswordThroughEmail,
    userPasswordReset
}