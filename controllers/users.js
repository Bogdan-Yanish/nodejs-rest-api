const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const gravatar = require("gravatar");
const path = require("path");
const fs = require("fs").promises;
const Jimp = require("jimp");

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
    const newUser = await User.create({email, password: hashPassword, avatarURL});
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

    try {
        const resultUpload = path.join(avatarsDir, uniqueAvatar);
        
        const avatarImg = await Jimp.read(tmpUpload);
        await avatarImg
            .cover(
                250,
                250,
                Jimp.HORIZONTAL_ALIGN_CENTER || Jimp.VERTICAL_ALIGN_MIDDLE
                )
            .writeAsync(tmpUpload);

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