import React,{useState} from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export function MainComponent(){

    const[users,setUsers]=useState([{UserId:'', UserName:'', Password:'', Email:'', Mobile:''}]);
    const[userEmail,setUserEmail]=useState('');



     const navigate=useNavigate();
    
    function handleMailChnage(e){
      setUserEmail(e.target.value)
        }

    function handleStartClick(e){
     axios({
        method:'get',
        url:'http://127.0.0.1:5000/users'
         })
         .then((response)=>{
            for(var user of response.data){
                if(user.Email===userEmail){
                    navigate('/login');
                    break;
                }else{
                    navigate('/unregister');
                }
            }
         })
    }
    return(
        <div>
             <main >
                    <h1>Learn and Design</h1>
                    <p>Watch Videos,Learn any Technology</p>
                    <div className="input-group">
                        <input onChange={handleMailChnage} type="email" className="form-control"/> <button  onClick={handleStartClick} className="btn btn-danger">Get Started<span className="bi bi-chevron-right"></span></button>
                    </div>
                </main>
        </div>
    )
}