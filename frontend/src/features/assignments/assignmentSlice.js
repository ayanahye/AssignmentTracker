import {createSlice, createAsyncThunk} from '@reduxjs/toolkit'
import assignmentService from './assignmentService';

const initialState = {
    assignments: [],
    isError: false,
    isSuccess: false,
    isLoading: false,
    message: ''
}

// create a new assignment
export const createAssignment = createAsyncThunk('assignments/create', async (assignmentData, thunkAPI) => {
    try {
        const token = thunkAPI.getState().auth.user.token;
        return await assignmentService.createAssignment(assignmentData, token)

    } catch (error) {
        const message = (error.response && error.response.data && error.response.data.message || error.message || error.toString());
        return thunkAPI.rejectWithValue(message)
    }
})

// get the assignments
export const getAssignments = createAsyncThunk('assignments/getAll', async (_, thunkAPI) => {
    try {
        const token = thunkAPI.getState().auth.user.token;
        return await assignmentService.getAssignments(token)
    } catch (error) {
        const message = (error.response && error.response.data && error.response.data.message || error.message || error.toString());
        return thunkAPI.rejectWithValue(message)
    }
} )

// delete assignment
export const deleteAssignment = createAsyncThunk('assignments/delete', async (id, thunkAPI) => {
    try {
        const token = thunkAPI.getState().auth.user.token;
        return await assignmentService.deleteAssignment(id, token)

    } catch (error) {
        const message = (error.response && error.response.data && error.response.data.message || error.message || error.toString());
        return thunkAPI.rejectWithValue(message)
    }
})

// reset function dispatched will set it to the initial state
export const assignmentSlice = createSlice({
    name: 'assignment',
    initialState,
    reducers: {
        reset: (state) => initialState
    },
    extraReducers: (builder) => {
        builder
            .addCase(createAssignment.pending, (state) => {
                state.isLoading = true
            })
            .addCase(createAssignment.fulfilled, (state, action)=> {
                state.isLoading = false
                state.isSuccess = true
                // action.payload is the new assignment that was just created
                state.assignments.push(action.payload)
            })
            .addCase(createAssignment.rejected, (state, action)=> {
                state.isLoading = false
                state.isError = true
                state.message = action.payload
            })
            .addCase(getAssignments.pending, (state) => {
                state.isLoading = true
            })
            .addCase(getAssignments.fulfilled, (state, action)=> {
                state.isLoading = false
                state.isSuccess = true
                // action.payload is the new assignment that was just created
                state.assignments = action.payload
            })
            .addCase(getAssignments.rejected, (state, action)=> {
                state.isLoading = false
                state.isError = true
                state.message = action.payload
            })
            .addCase(deleteAssignment.pending, (state) => {
                state.isLoading = true
            })
            .addCase(deleteAssignment.fulfilled, (state, action)=> {
                state.isLoading = false
                state.isSuccess = true
                // action.payload is the new assignment that was just created
                // must filter from ui when delete otherwise wont delete on ui until refresh
                state.assignments = state.assignments.filter((assignment) => assignment._id !== action.payload.id)
            })
            .addCase(deleteAssignment.rejected, (state, action)=> {
                state.isLoading = false
                state.isError = true
                state.message = action.payload
            })
    }
})

export const {reset} = assignmentSlice.actions
export default assignmentSlice.reducer