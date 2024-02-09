
import React from "react";
import { useState,useEffect } from "react";
import { Link,useNavigate } from "react-router-dom";
import axios from "axios";
import { useCookies } from "react-cookie";


export function AdminHome(){

    const navigate=useNavigate();

    const [videos, setVideos] = useState([{VideoId:0, Title:'', Url:'', Comments:'', Likes:0, Category_Id:0}]);
const[cookies,setCookie,removeCookie]=useCookies('adminName');

    function LoadVideos(){
        axios.get('http://127.0.0.1:5000/videos')
        .then(response=>{
            setVideos(response.data);
        })
    }
    
    useEffect(()=>{
if(cookies['adminName']==undefined){
   navigate("/admin-login")
   }else{
    LoadVideos();
   }
 },[])

    function handleSignout(){
        removeCookie('adminName');
        navigate("/admin-login")

    }
    return(
        <div className="border border-2 rounded rounded-2 p-4 m-4 bg-dark text-white">
            <h2>Admin Home-Hello ! {cookies['adminName']} <button  onClick={handleSignout} className="btn btn-link">signout</button></h2>
            <div className="mb-4">
                <Link to='/add-video' className="btn btn-primary">New Video</Link>
            </div>
            <table className="table table-hover">
                <thead>
                    <tr>
                        <th>Title</th>
                        <th>Preview</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        videos.map(video=>
                            <tr key={video.VideoId}>
                                <td >{video.Title}</td>
                                <td>
                                    <iframe src={video.Url} width="200" height="100"></iframe>
                                </td>
                                <td>
                                    <Link to={`/view-video/${video.VideoId}`} className="btn btn-primary bi bi-eye me-2"></Link>
                                    <Link  to={`/edit-video/${video.VideoId}`} className="btn btn-warning bi bi-pen-fill me-2"></Link>
                                    <Link  to={`/delete-video/${video.VideoId}`} className="btn btn-danger bi bi-trash-fill"></Link>
                                </td>
                            </tr>
                            )
                    }
                </tbody>
            </table>
        </div>
    )
}