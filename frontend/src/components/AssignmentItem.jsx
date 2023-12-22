import React from 'react'
import { useDispatch } from 'react-redux'
import { deleteAssignment } from '../features/assignments/assignmentSlice';

function AssignmentItem({assignment}) {
    const dispatch = useDispatch();

    return (
        <div className="assignment">
            <div>
                {new Date(assignment.createdAt).toLocaleString('en-US')}
            </div>
            <h2>{assignment.text}</h2>
            <button onClick={() => dispatch(deleteAssignment(assignment._id))}className="close">X</button>
        </div>
    )
}

export default AssignmentItem