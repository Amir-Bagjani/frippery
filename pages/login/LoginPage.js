import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import {toast} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useLogin } from "../../hooks/useLogin";

//style
import "./LoginPage.css";

//toast
toast.configure()

const LoginPage = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const { error, isPending, login } = useLogin();

  const validation = (user) => {
    if(user.username === ``){
      return `Please enter your username`
    }
    if(user.password === ``){
      return `Please enter your password`
    }
    return null
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    const error = validation({username, password});
    if(error){
      toast.error(error)
      return
    }
    login(username, password);
  };

   //show error if exist
   useEffect(() => {
    if(error){
      toast.error(error)
    }
  }, [error])
  

  return (
    <div className="login-form">
      <form onSubmit={handleSubmit} className="form">
        <h2>Login</h2>
        <label>
          <span>Username:</span>
          <input
            placeholder="your username"
            type="text"
            onChange={(e) => setUsername(e.target.value)}
            value={username}
          />
        </label>
        <label>
          <span>Password:</span>
          <input
            placeholder="your password"
            type="password"
            onChange={(e) => setPassword(e.target.value)}
            value={password}
          />
        </label>
        {!isPending && <button className="btn">Login</button>}
        {isPending && <button className="btn" disabled>Loading...</button>}
        <p><Link to="/signup">Don't have an account? Sign up</Link></p>
      </form>
    </div>
  );
};

export default LoginPage;
