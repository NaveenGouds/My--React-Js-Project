
import React from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import {  useFormik } from "formik";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useCookies } from "react-cookie";

export function Login(){
    const navigate = useNavigate();

    const[users,setUser]=useState([{UserId:'', UserName:'', Password:'', Email:'', Mobile:''}]);
    const [userError, setUserError] = useState('');
    const[cookies,setCookie,removeCookie]=useCookies('userName');

    const formik = useFormik({
        initialValues : {
            UserId: '',
            Password:''
        },
        onSubmit:(values)=>{
            var nuser = users.find(item=>item.UserId===values.UserId);
            if(nuser.Password===values.Password){
                setCookie("userName",nuser.UserName);
                navigate('/videos');
            }else{
                setUserError("Invalid Credentials");
            }
        }
    })
   useEffect(()=>{
    axios.get('http://127.0.0.1:5000/users')
    .then((response)=>{
        setUser(response.data)
    })
   })
    return(
        <div>
            <form  className="border border-2 rounded rounded-2 p-4 m-4 bg-dark text-white" style={{height:'50vh'}} onSubmit={formik.handleSubmit}>
            <h3>User Login</h3>
                <dl>
                    <dt>User Id</dt>
                    <dd><input type="text" name="UserId" onChange={formik.handleChange} /></dd>
                    <dt>Password</dt>
                    <dd><input type="password" name="Password" onChange={formik.handleChange} /></dd>
                </dl>
                <button className="btn btn-warning me-2">Login</button>
                <Link to='/register'>New User? Register</Link>
                <p className=" text-danger">{userError}</p>
            </form>
        </div>
    )
}