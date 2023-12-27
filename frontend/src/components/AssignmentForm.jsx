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
        <section className='form' style={{width: '100%', marginBottom: '20px'}}>
            <form onSubmit={onSubmit} className="container mt-4">
                <div className="mb-3">
                    <input
                        type="text"
                        className="form-control"
                        placeholder='Add Assignment'
                        id="text"
                        name="text"
                        value={text}
                        onChange={(e) => setText(e.target.value)}
                    />
                </div>
                <div className="mb-3">
                    <button className="btn btn-primary w-100" type="submit">
                        Add Assignment
                    </button>
                </div>
            </form>
        </section>
    );
}

export default AssignmentForm;