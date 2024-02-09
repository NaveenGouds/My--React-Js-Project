

import { useFormik } from "formik";
import React,{useState,useEffect} from"react";
import { Link,useNavigate } from "react-router-dom";
import axios from "axios";

export function Register(){
    const [users, setUsers] = useState([{UserId:'', UserName:'', Password:'', Email:'', Mobile:''}]);
    const [userError, setUserError] = useState('');
    const[errclass,setErrorClass]=useState('');

 const navigate=useNavigate();
 
    useEffect(()=>{
        axios.get('http://127.0.0.1:5000/users')
        .then(response => {
            setUsers(response.data);
        })
     },[]);

    const formik = useFormik({
        initialValues: {
            UserId: '',
            UserName: '',
            Password:'',
            Email: '',
            Mobile: ''
        },
        onSubmit:(user)=>{
            axios.post('http://127.0.0.1:5000/registeruser',user)
            alert('Registered Successfully..');
            navigate('/login');
        }
    })

    function VerifyUser(e){
        for(var user of users){
          if(user.UserId===e.target.value){
              setUserError("User Id Taken - Try Another");
              setErrorClass('text-danger');
              break;
          } else {
             setUserError("User Id Available");
             setErrorClass('text-success');
          }
        }
     }
    return(
        <div className="border border-2 rounded rounded-2 p-4 m-4 bg-dark text-white" >
            <h2><span className="bi bi-person-fill">Register</span></h2>
            <form onSubmit={formik.handleSubmit}>
            <dl>
                <dt>User Id</dt>
                <dd><input type="text" onKeyUp={VerifyUser}  onChange={formik.handleChange} name="UserId" /></dd>
                <dd className={errclass}>{userError}</dd>
                <dt>User Name</dt>
                <dd><input type="text" onChange={formik.handleChange} name="UserName" /></dd>
                <dt>Password</dt>
                <dd><input type="password" onChange={formik.handleChange} name="Password" /></dd>
                <dt>Email</dt>
                <dd><input type="email" onChange={formik.handleChange} name="Email" /></dd>
                <dt>Mobile</dt>
                <dd><input type="text" onChange={formik.handleChange} name="Mobile" /></dd>
            </dl>
             <button className="btn btn-primary">Register</button>
             <p>Existing User?<Link to='/login'>Login</Link></p>
            </form>
        </div>
    )
}