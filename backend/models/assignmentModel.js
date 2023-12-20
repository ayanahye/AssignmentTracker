const mongoose = require('mongoose')

const assignmentSchema = mongoose.Schema(
    {
    user: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        // reference so a user associates with an assignment
        ref: 'User'
    },
    text: {
        type: String,
        required: [true, 'Please add a text value']
    }
}, 
{
    timestamps: true
})

module.exports = mongoose.model('Assignment', assignmentSchema);