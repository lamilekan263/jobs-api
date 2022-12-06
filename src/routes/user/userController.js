// const jwt = 

const User = require('../../models/userModel');



async function createUser (req, res) {
    try {
        const { userName,
            firstName,
            lastName,
            password,
            email } = req.body;


        if (!userName || !firstName || !lastName || !password || !email) {
            return res.status(400).json({
                status: 'failed',
                message: 'missing parameters'
            });
        }

        const user = await User.create({
            userName,
            email,
            password,
            firstName,
            lastName,
        });


        return res.status(201).json({ user });

    } catch (error) {
        return res.status(500).json({
            status: 'failed',
            err: error.message
        });
    }
}


async function login (req, res) {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).json({
                status: 'failed',
                message: 'missing parameters'
            });
        }


        const user = await User.findOne({ email }).select('+password');


        if (!user) {
            return res.status(404).json({
                status: 'failed',
                message: 'user not found, Please sign up'
            });
        }


        const isMatched = await user.comparePassword(password);

        if (!isMatched) {
            return res.status(401).json({
                status: 'failed',
                message: 'Invalid password'
            });
        }
        delete user.password;


        const token = user.createJWT();
       
        return res.status(200).json({
            user,
            token
        });
    } catch (error) {
        return res.status(500).json({
            status: 'failed',
            err: error.message
        });
    }
}

module.exports = { createUser, login };