import React from 'react'
import {useState, useEffect} from 'react'
// useselector selects something from the state like isError, user, etc
// useDispatch if we want to dispatch function like register or reset in reducer
import {useSelector, useDispatch} from 'react-redux';
import { useNavigate } from 'react-router-dom';
import {toast} from 'react-toastify';
import {FaUser} from 'react-icons/fa';
import {register, reset} from '../features/auth/authSlice';
import Spinner from '../components/Spinner';
import "../styles/Login.css";

function Register() {

    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
        password2: ''
    })

    const {name, email, password, password2} = formData;

    const navigate = useNavigate()
    const dispatch = useDispatch()

    const {user, isLoading, isError, isSuccess, message} = useSelector((state) => state.auth)

    useEffect(() => {
        if(isError) {
            toast.error(message)
        }

        if(isSuccess || user) {
            navigate('/')
        }

        dispatch(reset())

    }, [user, isError, isSuccess, message, navigate, dispatch])

    const onChange = (e) => {
        setFormData((prevData) => ({
            ...prevData,
            [e.target.name]: e.target.value,
        }))
    }

    const onSubmit = (e) => {
        e.preventDefault()

        if(password !== password2) {
            toast.error('Password do not match')
        } else {
            const userData = {
                name, 
                email, 
                password
            }

            dispatch(register(userData))
        }
    }

    if(isLoading) {
        return <Spinner />
    }

    return (
        <div className='cont1'>
          <div className="login-ele">
            <section className='heading w-100' style={{ color: "rgb(74, 141, 212)" , margin:'25px'}}>
              <h1>
                <FaUser style={{ color: "rgb(74, 141, 212)", marginRight: '15px' }} />Register
              </h1>
              <p>Please create an account</p>
            </section>
    
            <section className='form w-100'>
              <form onSubmit={onSubmit}>
                <div className="form-group mb-4">
                  <input
                    type="text"
                    className="form-control"
                    id="name"
                    name="name"
                    value={name}
                    placeholder="Enter your name"
                    onChange={onChange}
                  />
                </div>
                <div className="form-group mb-4">
                  <input
                    type="email"
                    className="form-control"
                    id="email"
                    name="email"
                    value={email}
                    placeholder="Enter your email"
                    onChange={onChange}
                  />
                </div>
                <div className="form-group mb-4">
                  <input
                    type="password"
                    className="form-control"
                    id="password"
                    name="password"
                    value={password}
                    placeholder="Enter your password"
                    onChange={onChange}
                  />
                </div>
                <div className="form-group mb-4">
                  <input
                    type="password"
                    className="form-control"
                    id="password2"
                    name="password2"
                    value={password2}
                    placeholder="Confirm your password"
                    onChange={onChange}
                  />
                </div>
                <div className="form-group mb-4">
                  <button style={{marginBottom:'25px'}} type="submit" className='btn btn-primary w-100'>Submit</button>
                </div>
              </form>
            </section>
          </div>
        </div>
      );
    }

export default Register