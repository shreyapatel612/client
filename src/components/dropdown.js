import React,{useState} from "react";
import axios from "axios";

function DropDown(){
    const [roleData,setRoleData] = useState("");
    axios.get("http://localhost:8080/roles")
        .then(res =>{ 
            console.log(res.data.data);
            const role = res.data.data;
            console.log(role.length);
            for(let i=0;i<role.length;i++){
                console.log(role[i].name);
                setRoleData(role[i].name);
            }
        })
        .catch(error =>{
            console.log(error);
        })
    return(
        <div className="drop-down">
            <p>Roles</p>
             <select>
                 {
                     <option>{roleData}</option>
                 }   
             </select>
        </div>
    )
}
export default DropDown;