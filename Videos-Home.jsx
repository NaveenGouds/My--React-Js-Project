
import { useEffect, useState } from "react"
import axios from "axios";
import { useCookies } from "react-cookie";

export function VideosHome(){
    const[videos,setVideos]=useState([]);
    const[cookies,setCookie,removeCookie]=useCookies('userName')

    useEffect(()=>{
        axios.get('http://127.0.0.1:5000/videos')
        .then((response)=>
              setVideos(response.data));
    },[])   
    return(
        <div>
            <h2>Videos-Home {cookies['userName']}</h2>
            <div className="d-flex justify-content-between flex-wrap">
                
                {
                    videos.map(video=>
                       <div className="card m-2 p-2" style={{width:'400px'}}> 
                       <div className="card-header">
                        <h3>{video.Title}</h3>
                       </div>
                       <div className="card-body">
                        <iframe src={video.Url} width="300" height="200">
                        </iframe>
                       </div>
                       <div className="card-footer">
                                <span className="bi bi-hand-thumbs-up"></span> {video.Likes} Likes
                                <div>
                                    <label className="bi bi-hand-thumbs-down">{video.Dislikes}</label>
                                    
                                </div>
                            </div>
                       </div>
                        
                        )
                }
            </div>
        </div>
    )
}