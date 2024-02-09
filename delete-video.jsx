
import { Link, useParams,useNavigate } from "react-router-dom";
import axios from "axios";
import { useState,useEffect } from "react";

export function DeleteVideo(){

    const params = useParams();
    const navigate=useNavigate();

    const[videos,setVideos] = useState([{VideoId:0, Title:'', Url:'', Likes:0, Dislikes:0,Views:0, CategoryId:0}]);
    
 function handleDeleteClick(){
    axios.delete(`http://127.0.0.1:5000/deletevideo/${params.id}`)
    alert("video deleted");
    navigate("/admin-home")
 }
    useEffect(()=>{
        axios.get(`http://127.0.0.1:5000/videos/${params.id}`)
        .then((response)=>{
            setVideos(response.data)
        })
    },[])

    return(
        <div>
            <h1>Deleting Video {videos[0].Title} are you sure?</h1>
            <iframe src={videos[0].Url} width="400" height="300">

            </iframe>
            <p>
                <button  onClick={handleDeleteClick} className="btn btn-danger me-2">Yes</button><Link  className="btn btn-warning"   to='/admin-home'>Cancel</Link>
            </p>
        </div>
    )
}