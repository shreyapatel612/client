import React,{useState, setState} from "react";
import "./register.css"
import axios from "axios"
import DropDown from "../dropdown";
import { useHistory } from "react-router-dom";

const Register = () => {
    const history = useHistory()
    const [roleState,setRoleState] = useState("");
    const [ user,setUser] = useState({
        name:"",
        email:"",
        password:"",
        reEnterPassword:"",
        roleid:""
    })

    const handleChange = e =>{
        const {name,value} = e.target
        setUser({
            ...user,
            [name]: value
        })
    }

    const register = () =>{
        const { name, email, password, reEnterPassword, roleid} = user
        if( name && email && password && (password === reEnterPassword) && roleid){
            axios.post("http://localhost:8080/users/register", user)
            .then( res => {
                alert(res.data.message)
                history.push()
            })
           // alert("posted") 
        }else{
            alert("invalid input")
        }
    }
    axios.get("http://localhost:8080/roles")
        .then(function(response){ 
            console.log(response.data.data);
            const roles = response.data.data;
            var tmp =[];
            for(let i =0; i < roles.length ; i++){
                const rolename = roles[i].name;
                console.log(rolename);
                //console.log(rolename);
            }  
        })
        .catch(error =>{
            console.log(error);
        })

    return(
        <div className="register">
            {console.log("User",user)}
            <h1>Register</h1>
            <input type="text" name="name" value={user.name} placeholder="Enter Your Name" onChange={ handleChange}></input>
            <input type="text" name="email" value={user.email} placeholder="Enter Your Email" onChange={ handleChange}></input>
            <input type="password" name="password" value={user.password} placeholder="Enter Your Password" onChange={ handleChange}></input>
            <input type="password" name="reEnterPassword" value={user.reEnterPassword} placeholder="Re-Enter Your Password" onChange={ handleChange}></input>
            <div className="drop-down">
            <p>Roles</p>
             <select>
                 {
                     <option value={roleState}>{roleState}</option>
                 }   
             </select>
        </div>
            <div className="button" onClick={register}>Register</div>
            <div>or</div>
            <div className="button" onClick={() => history.push("/login")}>Login</div>
        </div>
    )
}

export default Register