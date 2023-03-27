const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const User = require('../models/userSchema');
const {SECRET_KEY} = process.env;

const register = async (req, res) => {
    const { email, password } = req.body;
    const user = await User.findOne({email});
    
    if(user){
        res.status(409).json({message:"Email in use"})
    }
    
    const salt = bcrypt.genSaltSync(10);
    const hashPassword = bcrypt.hashSync(password, salt);
    const newUser = await User.create({email, password: hashPassword});
    const { subscription } = newUser;
    res.status(201).json({
        user: {
            email,
            subscription           
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


module.exports = {
    register,
    login,
    getCurrentUser,
    logout, 
    updateStatusUser
}