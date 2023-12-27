import React from 'react'
import {useEffect} from 'react'
import { useNavigate } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import AssignmentForm from '../components/AssignmentForm'
import Spinner from '../components/Spinner'
import AssignmentItem from '../components/AssignmentItem'
import { getAssignments, reset } from '../features/assignments/assignmentSlice'
import "../styles/Dashboard.css";

function Dashboard() {
    const navigate = useNavigate()
    const dispatch = useDispatch()

    // user comes from state.auth
    const {user} = useSelector((state) => state.auth);
    const {assignments, isLoading, isError, message} = useSelector((state) => state.assignments)

    useEffect(() => {
        if (isError) {
            console.log(message)
        }

        if(!user) {
            navigate('/login')
        } else {
            // get assignments from backend into assignments
            dispatch(getAssignments())
        }

        return () => {
            dispatch(reset())
        }

    }, [user, navigate, isError, message, dispatch])

    if(isLoading) {
        return <Spinner />
    }

    return (
        <div className="cont1">
            <section className='heading'>
                <h1 style={{color:"rgb(74, 141, 212)"}}>Welcome {user && user.name}</h1>
                <p>Assignments Dashboard</p>

            <AssignmentForm />
            </section>
                <section className="content">
                    {assignments.length > 0 ? (
                        <div className="assignments">
                            {assignments.map((assignment) => (
                                <AssignmentItem key={assignment._id} assignment={assignment} />
                            ))}
                        </div>
                    ) : (<h3 style={{color:"rgb(74, 141, 212)"}}>You have no assignments.</h3>)}
                </section>
        </div>
    );
}

export default Dashboard