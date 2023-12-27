import React from 'react';
import { useDispatch } from 'react-redux';
import { deleteAssignment } from '../features/assignments/assignmentSlice';
import '../styles/AssignmentItem.css';

function AssignmentItem({ assignment }) {
  const dispatch = useDispatch();

  return (
    <div className="assignment card mb-3">
      <div className="card-body">
        <p className="card-text text-muted">
          {new Date(assignment.createdAt).toLocaleString('en-US')}
        </p>
        <h5 className="card-title">{assignment.text}</h5>
        <button
          onClick={() => dispatch(deleteAssignment(assignment._id))}
          className="btn btn-danger"
        >
          Delete
        </button>
      </div>
    </div>
  );
}

export default AssignmentItem;
