import { Link, useParams } from "react-router-dom";
import axios from "axios";
import { useState,useEffect } from "react";

export function ViewVideo(){
    const params = useParams();

    const[videos,setVideos] = useState([{VideoId:0, Title:'', Url:'', Likes:0, Dislikes:0,Views:0, CategoryId:0}]);

    useEffect(()=>{
        axios.get(`http://127.0.0.1:5000/videos/${params.id}`)
        .then((response)=>{
            setVideos(response.data)
        })
    },[])

    return(
        <div>
            <h2>{videos[0].Title}</h2>
            <iframe src={videos[0].Url} width="400" height="300">

            </iframe>
            <p>
                <Link to='/admin-home'>Back to home</Link>
            </p>
        </div>
    )
}