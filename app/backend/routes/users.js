import express from 'express'
import admin from '../config/firebase.js';
const router = express.Router()
import { getUsers, getUsersByID, postUsers, putUsers, deleteUsers } from '../controllers/userController.js'
import user from '../models/userModel.js';

//router.route('/').get(getUsers).post(postUsers)
//router.route('/login/:id').get(getUsersByID).put(putUsers).delete(deleteUsers)
router.get('/login', async (req, res) => {
    if (!req.headers.authorization) {
        return res.status(500).send({message: 'invalid token'});
    }

    const newUserData = async  (decodeValue, req, res) => {
        const newUser = new user({
            email: decodeValue.email,
            name: decodeValue.name,
            imageURL: decodeValue.picture,
            userId: decodeValue.user_id,
            email_verified: decodeValue.email_verified,
            auth_time: decodeValue.auth_time
        });

        try {
            const savedUser = await newUser.save();
            res.status(200).send({ user: savedUser })
        } catch (error) {
            res.status(400).send({success: false, message: error})
        }
    };

    const updateUserData = async (decodeValue, req, res) => {
        const filter = { userId :  decodeValue.user_id }
        const options = {
            upsert: true,
            new: true,
        };

        try {
            const result = await user.findOneAndUpdate(filter, {
                auth_time: decodeValue.auth_time
            },options);
            res.status(200).send({user: result});
        } catch (error) {
            res.status(400).send({ success: false, message: error });
        }
    };

    const token = req.headers.authorization.split(" ")[1];
    try {
        const decodeValue = await admin.auth().verifyIdToken(token);
        if (!decodeValue) {
            return res.status(500).json({success: false, message: 'unauthorized user'})
        }

        // checks if user exists yet or not
        const userExists = await user.findOne({userId: decodeValue.user_id});
        if (!userExists) {
            newUserData(decodeValue, req, res);
        } else {
            updateUserData(decodeValue, req, res);
        }

    } catch (error) {
        return res.status(500).send({ success: false, message: error});
    }
});

export default router