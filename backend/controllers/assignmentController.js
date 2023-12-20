const asyncHandler = require('express-async-handler')

const Assignment = require('../models/assignmentModel')
const User = require('../models/userModel');

// get the assignments
// GET api/assignments
// private
const getAssignments = asyncHandler(async (req, res) => {
    const assignments = await Assignment.find({user: req.user.id})
    res.status(200).json(assignments)
})

// set the assignment
// POST api/assignments
// private
const setAssignment = asyncHandler(async (req, res) => {
    // if no text in body cannot add an assignment send bad request
    if (!req.body.text) {
        res.status(400)
        throw new Error('Please add a text field')
    }

    const assignment = await Assignment.create({
        text: req.body.text,
        user: req.user.id
    })

    res.status(200).json(assignment)
})

// update the assignment
// PUT api/assignments/:id
// private
const updateAssignment = asyncHandler(async (req, res) => {
    const assignment = await Assignment.findById(req.params.id)

    if (!assignment) {
        res.status(400)
        throw new Error('Assignment not found');
    }

    const user = await User.findById(req.user.id);

    // check for user
    if (!user) {
        res.status(401)
        throw new Error('User not found')
    }

    // ensure the logged in user matches the assignment user
    if(assignment.user.toString() !== user.id) {
        res.status(401)
        throw new Error('User not authorized.')
    }

    const updatedAssignment = await Assignment.findByIdAndUpdate(req.params.id, req.body, {new:true})
    res.status(200).json(updateAssignment);
})

// delete the assignment
// DELETE api/assignments/:id
// private
const deleteAssignment = asyncHandler(async (req, res) => {
    const assignment = await Assignment.findById(req.params.id)

    if (!assignment) {
        res.status(400)
        throw new Error('Assignment not found');
    }

    const user = await User.findById(req.user.id);

    // check for user
    if (!user) {
        res.status(401)
        throw new Error('User not found')
    }

    // ensure the logged in user matches the assignment user
    if(assignment.user.toString() !== user.id) {
        res.status(401)
        throw new Error('User not authorized.')
    }

    await assignment.deleteOne();

    res.status(200).json({id: req.params.id})
})

module.exports = {
    getAssignments,
    setAssignment,
    updateAssignment,
    deleteAssignment,
}