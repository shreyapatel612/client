import React, {useState} from "react";
import "./login.css"
import axios from "axios";
import { useHistory } from "react-router-dom";

const Login = ( {setLoginUser} ) => {

    const history = useHistory()

    const [ user,setUser] = useState({
        email:"",
        password:"",
    })

    const handleChange = e =>{
        const {name,value} = e.target
        setUser({
            ...user,
            [name]: value
        })
    }

    const login = () => {
        axios.post("https://mernadminpanel.herokuapp.com/users/login",user)
        .then(res =>{
            alert(res.data.message)
            setLoginUser(res.data.user)
            //console.log(res.data.user._id);
            sessionStorage.setItem("id",res.data.user._id);
            sessionStorage.setItem("name",res.data.user.name);
            history.push("/")
        })
    }

    return(
        <div className="login">
            <h1>Login</h1>
            <input type="text" name="email" value={user.email} onChange={handleChange} placeholder="Enter Your Email" ></input>
            <input type="password" name="password" value={user.password} onChange={handleChange} placeholder="Enter Your Password" ></input>
            <div className="button" onClick={login}>Login</div>
            <div>or</div>
            <div className="button" onClick={() => history.push("/register")}>Register</div>
        </div>
    )
}

export default Login