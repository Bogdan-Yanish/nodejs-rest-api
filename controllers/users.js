const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const gravatar = require("gravatar");
const path = require("path");
const fs = require("fs").promises;
const uuid = require("uuid").v4;
const avatarJimpManipulation = require("../helpers/avatarJimpManipulation");
const sendEmail = require("../helpers/emailSender");


const User = require('../models/userSchema');
const {SECRET_KEY} = process.env;

const register = async (req, res) => {
    const { email, password } = req.body;
    const user = await User.findOne({email});
    const avatarURL = gravatar.url(email);
    
    if(user){
        res.status(409).json({message:"Email in use"})
    }
    
    const salt = bcrypt.genSaltSync(10);
    const hashPassword = bcrypt.hashSync(password, salt);
    const verificationToken = uuid();

    const newUser = await User.create({email, password: hashPassword, avatarURL, verificationToken});
    
    const mailToSend = {
        to: email,
        subject: "Welcome! Confirm your email!",
        html: `<a target="_blank" href="http://localhost:3000/api/users/verify/${verificationToken}">
                Confirm your email
            </a>`,
    };

    await sendEmail(mailToSend);

    const { subscription } = newUser;
    res.status(201).json({
        user: {
            email,
            subscription,
            avatarURL
        }
    })
};

const login = async(req, res) => {
    const { email, password } = req.body;
    const user = await User.findOne({email});
    const passwordCompare = await user?.comparePassword(password);
        
    if(!user || !passwordCompare){
        res.status(401).json({message: "Email or password is wrong"})
    }
    
    const { subscription } = user;
    const payload = {
        id: user._id
    };
    const token = jwt.sign(payload, SECRET_KEY, {expiresIn: "2h"});
    await User.findByIdAndUpdate(user._id, { token });

    res.status(200).json({
        token,
        user: {
            email,
            subscription
        }
    })
};

const getCurrentUser = async(req, res) => {
    const { email, subscription } = req.user;
    res.status(200).json({email, subscription});
};

const logout = async(req, res) => {
    const { _id } = req.user;
    await User.findByIdAndUpdate(_id, {token: null});
    res.status(204).json();
};

const updateStatusUser = async (req, res) => {
    const { _id } = req.user;
    const { subscription } = req.body;

    const updateUserStatus = await User.findByIdAndUpdate(_id, {subscription}, {new: true});
    const { email } = updateUserStatus; 
    res.status(200).json({user: {
        email,
        subscription
    }});
};


const avatarsDir = path.join(process.cwd(), "public", "avatars");
const updateAvatarUser = async (req, res, next) => {
    const {path:tmpUpload, originalname} = req.file;
    const {_id: id } = req.user;
    const uniqueAvatar = `${id}_${originalname}`;

    await avatarJimpManipulation(tmpUpload);

    try {
        const resultUpload = path.join(avatarsDir, uniqueAvatar);
        await fs.rename(tmpUpload, resultUpload);
        const avatarURL = path.join("public", "avatars", uniqueAvatar);
        await User.findByIdAndUpdate(req.user._id, {avatarURL});
        res.status(200).json({avatarURL})
    } catch (error) {
        await fs.unlink(tmpUpload);
        next(error);
    }
}

module.exports = {
    register,
    login,
    getCurrentUser,
    logout, 
    updateStatusUser,
    updateAvatarUser
}