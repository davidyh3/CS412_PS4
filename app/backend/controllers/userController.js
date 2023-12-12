import asyncHandler from 'express-async-handler'
import user from '../models/userModel.js'

// @desc    get Users
// @route   Get /users
// @access  Private
export const getUsers = asyncHandler(async (req, res) => {
    const users = await user.find()
    res.json(users)
})

// @desc    get Users by id
// @route   Get /users/:id
// @access  Private
export const getUsersByID = asyncHandler(async (req, res) => {
    const userid = await user.findById(req.params.id)
    res.json(userid)
})

// @desc    set Users
// @route   Post /users
// @access  Private
export const postUsers = asyncHandler(async (req, res) => {
    const { name, username, password } = req.body;

    const make = await user.create({
        name,
        username,
        password,
      })

    res.json(make)
})

// @desc    Update Users
// @route   Put /users
// @access  Private
export const putUsers = asyncHandler(async (req, res) => {
    const { name, username, password } = req.body;
    const update = await user.findById(req.params.id)

    if (!update) {
        res.status(400)
        throw new Error('user not found')
    }

    const updateduser = await user.findByIdAndUpdate(req.params.id, { name, username, password }, {new: true})
    res.json(updateduser)
})

// @desc    delete Users
// @route   Delete /users
// @access  Private
export const deleteUsers = asyncHandler(async (req, res) => {
    const getrid = await user.findById(req.params.id)

    if (!getrid) {
        res.status(400)
        throw new Error('user not found')
    }

    const deleteduser = await user.findByIdAndDelete(req.params.id)
    res.json(deleteduser)
})