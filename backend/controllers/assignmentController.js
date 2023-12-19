const asyncHandler = require('express-async-handler')

// get the assignments
// GET api/assignments
// private
const getAssignments = asyncHandler(async (req, res) => {
    res.status(200).json({message: 'Get assignments'})
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
    res.status(200).json({message: 'Add assignment'})
})

// update the assignment
// PUT api/assignments/:id
// private
const updateAssignment = asyncHandler(async (req, res) => {
    res.status(200).json({message: `Update assignment ${req.params.id}`})
})

// delete the assignment
// DELETE api/assignments/:id
// private
const deleteAssignment = asyncHandler(async (req, res) => {
    res.status(200).json({message: `Delete assignment ${req.params.id}`})
})

module.exports = {
    getAssignments,
    setAssignment,
    updateAssignment,
    deleteAssignment,
}