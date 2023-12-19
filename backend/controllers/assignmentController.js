const asyncHandler = require('express-async-handler')

const Assignment = require('../models/assignmentModel')
// get the assignments
// GET api/assignments
// private
const getAssignments = asyncHandler(async (req, res) => {
    const assignments = await Assignment.find()
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
        text: req.body.text
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

    await assignment.deleteOne();

    res.status(200).json({id: req.params.id})
})

module.exports = {
    getAssignments,
    setAssignment,
    updateAssignment,
    deleteAssignment,
}