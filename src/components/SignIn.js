import axios from "axios";
import React, { useState } from "react";
import { Link , useNavigate} from "react-router-dom";

//get email,password from USER -->LOGIN SUCCESS-->HOME PAGE
function SignIn ({url}) {
  const [email, setEmail] = useState()
  const [password, setPassword] = useState()
  const navigate = useNavigate()

  const handleSignIn =(e) => {
    e.preventDefault()
      axios.post(`${url}/signin`,{email,password})
      .then(res =>{
        window.localStorage.setItem("loggedInUser", JSON.stringify(res.data.token))
        navigate('/Urlshortner')

      })
      .catch( err => console.log(err))

  }
  return (
    <form
      onSubmit={handleSignIn}
      className="signIn container d-flex flex-column gap-3 p-3"
    >
      <h2 className="display-6 text-center">Login In</h2>
      <div className="form-group d-flex flex-column gap-1">
        <label htmlFor="userName">Email</label>
        <input
          type="email"
          className="form-control m-2"
          id="userName"
          placeholder="Email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <small className="form-text text-muted"></small>
      </div>
      <div className="form-group d-flex flex-column gap-1">
        <label htmlFor="password">Password</label>
        <input
          type="password"
          className="form-control m-2"
          id="password"
          placeholder="Password"
          required
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <small className="form-text text-muted"></small>
      </div>
      <div className="form-group d-flex justify-content-between gap-1 px-1">
        
      <button type="submit" className="btn btn-success">
        Login
      </button>
        
        <Link
          className="btn btn-danger fw-bold" to="/forgotPassword">
          Forgot Password
        </Link>
      </div>
      <div className="text-center mt-3">Don't have an account?
        <span>
          <Link className="btn text-primary text-decoration-underline fw-bold fs-6" to="/">SignUp</Link>
        </span>
      </div>
         
    </form>
  );
};

export default SignIn;
