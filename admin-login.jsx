
import React from "react";
import { useFormik } from "formik";
import { useState,useEffect } from "react";
import axios from "axios";
import {useNavigate} from "react-router-dom";
import { useCookies } from "react-cookie";


export function AdminLogin(){
     const[users,setUsers]=useState({UserId:'',Password:''});
     const[error,setError]=useState('');
     const [cookies, setCookie, removeCookie] = useCookies('adminName');
    const navigate = useNavigate();

    const formik = useFormik({
        initialValues:{
            UserId: '',
            Password:''
        },
        onSubmit:(values)=>{
            var user = users.find(item=>item.UserId===values.UserId);
            if(user.Password===values.Password){
                setCookie("adminName",user.UserId)
                navigate("/admin-home")
            }else{
                setError("Invalid Cresentials");
            }
        }
    })

    useEffect(()=>{
        axios.get('http://127.0.0.1:5000/admin')
        .then((response)=>{
            setUsers(response.data);
        })
    },[]);
    
    return(
        <div className="border border-2 rounded rounded-2 p-4 m-4 bg-black text-white" style={{height:'50vh'}}>
            <h3><span className="bi bi-person-fill"></span> Admin Login</h3>
            <form onSubmit={formik.handleSubmit}>
                <dl>
                    <dt>Admin Id</dt>
                    <dd><input type="text" onChange={formik.handleChange} name="UserId"/></dd>
                    <dt>Password</dt>
                    <dd><input type="password" onChange={formik.handleChange} name="Password" /></dd>
                </dl>
                <button className="btn btn-primary">Login</button>
                <p className="text-danger">{error}</p>
            </form>
        </div>
    )
}