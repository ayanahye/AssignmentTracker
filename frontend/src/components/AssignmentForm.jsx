import {useState} from 'react'
import { useDispatch } from 'react-redux';
import {createAssignment} from '../features/assignments/assignmentSlice';

function AssignmentForm() {
    const [text, setText] = useState("");

    const dispatch = useDispatch()

    const onSubmit = e => {
        e.preventDefault()

        dispatch(createAssignment({text}))
        setText('');
    }

    return (
        <section className='form'>
            <form onSubmit={onSubmit} >
                <div className="form-group">
                    <label htmlFor='text'>Assignment</label>
                    <input type="text" name="text" id="text" value={text} onChange={(e) => setText(e.target.value)}></input>
                </div>
                <div className="form-group">
                    <button className="btn" type="submit">Add Assignment</button>
                </div>
            </form>

        </section>
    )
}

export default AssignmentForm;