const express = require('express')
const router = express.Router()
const {getAssignments, setAssignment, updateAssignment, deleteAssignment} = require('../controllers/assignmentController')

router.get('/', getAssignments)

router.post('/', setAssignment)

router.put('/:id', updateAssignment)

router.delete('/:id', deleteAssignment)

module.exports = router