import React from "react";
import Styled from "styled-components";
import { Use_Global_Context } from "../../context/globalContext";
// import { register, login, user } from "../../context/globalContext";

const Login = () => {
  const { register,login } = Use_Global_Context();
  const [error,setError]=React.useState(null);
  const [loginR,setLoginR]=React.useState(1);
  const [info, setInfo] = React.useState({
    userName: "",
    password: "",
    confirmPassword: "",
  });
 
  const handleInput = (name) => (e) => {
    setInfo({ ...info, [name]: e.target.value });
  };

  const handleSubmit = async(e) => {
    e.preventDefault();
    if(!info.userName){
        setError(`UserName can't be empty`);
        return;
    }
    if(!info.password){
        setError("Password can't be empty");
        return;
    }
    if(!loginR && info.password!==info.confirmPassword){
        setError("Password and Confirm Password must be same");
        return;
    }
    if(!loginR){
        const res= await register(info);
        if(res?.status===200){
          setLoginR(1);
        }
        setError(res?.data?.message);
    }else{
        const res=await login(info);
        setError(res?.data?.message);
    }
//    console.log('res is', res);
  };
  React.useEffect(()=>{
    setTimeout(() => {
        setError(null);
    }, 5000);
  },[error]);

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <label for="username">Username:</label>
        <input
          type="text"
          id="username"
          name="username"
          onChange={handleInput("userName")}
          required
        />

        <label for="password">Password:</label>
        <input
          type="password"
          id="password"
          name="password"
          onChange={handleInput("password")}
          required
        />

        {!loginR?<div>
        <label for="confirmPassword">Confirm Password:</label>
        <input
          type="password"
          id="confirmPassword"
          name="confirmPassword"
          onChange={handleInput("confirmPassword")}
          required
        />
        </div>:null}
        <button type="submit">
            {loginR?"Login":"Register"}
            
            </button>
      </form>
      {error}
      <div onClick={(e)=>setLoginR(1-loginR)} style={{cursor:"pointer"}}>{loginR?"SignUp":"Login"}</div>
    </div>
  );
};

export default Login;
