import axios from 'axios'

const API_URL = '/api/assignments/'

// create new assignment

const createAssignment = async (assignmentData, token) => {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`
        }
    }

    // need to send config otherwise cant access
    const response = await axios.post(API_URL, assignmentData, config)

    return response.data
}

// get all assignments
const getAssignments = async (token) => {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`
        }
    }

    // need to send config otherwise cant access
    const response = await axios.get(API_URL, config)

    return response.data
}

// delete assignment
const deleteAssignment = async (assignmentId, token) => {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`
        }
    }

    // need to send config otherwise cant access
    const response = await axios.delete(API_URL + assignmentId, config)

    return response.data
}

const assignmentService = {
    createAssignment,
    getAssignments,
    deleteAssignment
}

export default assignmentService