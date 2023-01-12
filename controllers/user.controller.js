const User = require('../models/user.model');
const { userResponse, userListResponse } = require('../utils/objectConverter');

const getAllUser = async (req, res) => {
    const queryObj = {};
    if(req.query.name){
        queryObj.name = req.query.name;
    }
    if(req.query.userType){
        queryObj.userType = req.query.userType;
    }
    if(req.query.userStatus){
        queryObj.userStatus = req.query.userStatus;
    }

    try {
        const users = await User.find(queryObj);
        res.status(200).send(userListResponse(users));
    } catch (err) {
        console.log(err.message);
        res.status(500).send({
            message: "Error occured in processing request. Please try again after sometime!"
        });
    }
}

const getUserById = async (req, res) => {
    try{
        const user = await User.findById(req.params.id);
        if(!user){
            return res.status(404).send({
                message: "User doesn't exist!"
            });
        }
        res.status(200).send(userResponse(user));
    }catch(err){
        console.log(err.message);
        res.status(500).send({
            message: "Error occured in processing request. Please try again after sometime!"
        });
    }
}

const updateUser = async (req, res) => {
    try {
        const user = await User.findByIdAndUpdate(req.params.id, {
            name: req.body.name,
            userStatus: req.body.userStatus,
            userType: req.body.userType
        });

        if(!user){
            return res.status(404).send({
                message: "User being updated doesn't exist!"
            });
        }
        res.status(200).send({
            message: "User record has been updated successfully!"
        });
    } catch (err) {
        console.log(err.message);
        res.status(500).send({
            message: "Error occured in processing request. Please try again after sometime!"
        });
    }
}

module.exports = {
    getAllUser,
    getUserById,
    updateUser
}