import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import {toast} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useSignup } from '../../hooks/useSignup'

import "./SignupPage.css";

//toast
toast.configure()

const SignupPage = () => {
  const [fullName, setFullName] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPass, setConfirmPass] = useState("");
  const { signup, isPending, error } = useSignup()


  const validation = (user) => {
    if(user.fullName === ``){
      return `Please Enter your full name`
    }
    if(user.username === ``){
      return `Please enter your username`
    }
    if(user.password === ``){
      return `Please choose a password`
    }
    if(user.confirmPass === ``){
      return `Please enter confirm password`
    }
    if(user.password !== user.confirmPass){
      return `Passwords must be same!`
    }
    return null
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    const error = validation({fullName, username, password, confirmPass})
    if(error){
      toast.error(error)
      return
    }
    signup(fullName, username, password);
  }

  //show error if exist
  useEffect(() => {
    if(error){
      toast.error(error)
    }
  }, [error])

  return (
    <div className="signup-form">
      <form onSubmit={handleSubmit} className="auth-form">
        <h2>Sign up</h2>
        <label>
          <span>Full name:</span>
          <input
            placeholder="full name"
            type="text"
            onChange={(e) => setFullName(e.target.value)}
            value={fullName}
          />
        </label>
        <label>
          <span>User name:</span>
          <input
            placeholder="username"
            type="text"
            onChange={(e) => setUsername(e.target.value)}
            value={username}
          />
        </label>
        <label>
          <span>Password:</span>
          <input
            placeholder="password"
            type="password"
            onChange={(e) => setPassword(e.target.value)}
            value={password}
          />
        </label>
        <label>
          <span>Confirm password:</span>
          <input
            placeholder="repeat password"
            type="password"
            value={confirmPass}
            onChange={(e) => setConfirmPass(e.target.value)}
          />
        </label>
        {isPending && <button className="btn" disabled>Loading...</button>}
        {!isPending && <button className="btn">Sign up</button>}
        <p>
          <Link to="/login"> Already have an account? Login</Link>
        </p>
      </form>
    </div>
  );
};

export default SignupPage;
