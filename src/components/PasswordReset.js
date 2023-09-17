import axios from "axios";
import React, { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

function  PasswordReset({url}) {
  const [password, setPassword] = useState()
  const navigate = useNavigate()
  const { id }=useParams()


  const handleReset =(e) => {
    e.preventDefault()
      axios.patch(`${url}/PasswordReset/${id}`,{password})
      .then(result => {
        console.log(result)
        navigate('/password')
      })
      .catch( err => console.log(err))

  }
  return (
    <form
      onSubmit={handleReset}
      className="signIn container d-flex flex-column gap-1 p-3"
    >
      <h2 className="display-6 text-center">Reset Password</h2>
      <div className="form-group d-flex flex-column gap-1">
        <label htmlFor="password">New Password</label>
        <input
          type="password"
          className="form-control"
          id="password"
          placeholder="Enter Password"
          required
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <small className="form-text text-muted"></small>
      </div>
     
      <button type="submit" className="btn mt-3 btn-primary">
        Reset Password
      </button>
    </form>
  );
};

export default PasswordReset;
