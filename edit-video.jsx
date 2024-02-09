import React from "react";
import { useState,useEffect }from "react";
import { useParams,Link,useNavigate } from "react-router-dom";
import axios from "axios";
import { useFormik } from "formik";


export function EditVideo(){
    const params = useParams();
    const navigate=useNavigate();

    const[videos,setVideos] = useState([{VideoId:0, Title:'', Url:'', Likes:0, Dislikes:0,Views:0, CategoryId:0}]);
     const[categories,setCategories] = useState([{CategoryId:0, CategoryName:''}]);

    const formik = useFormik({
        initialValues:{
            VideoId: videos[0].VideoId,
            Title: videos[0].Title,
            Url:  videos[0].Url,
            Likes: videos[0].Likes,
            Dislikes:videos[0].Dislikes,
            Views:videos[0].Views,
            CategoryId:videos[0].CategoryId
        },
        enableReinitialize: true,
        onSubmit:(values)=>{
           axios.put(`http://127.0.0.1:5000/updatevideo/${params.id}`,values)
           alert('Video Updated..');
            navigate('/admin-home');
        }
    });

    function LoadCategories(){
        axios.get('http://127.0.0.1:5000/categories')
        .then(response=>{
            response.data.unshift({CategoryId:-1, CategoryName:'Select Category'});
            setCategories(response.data);
        })   
   }
       useEffect(()=>{
        LoadCategories();
        axios.get(`http://127.0.0.1:5000/videos/${params.id}`)
        .then((response)=>{
            setVideos(response.data)
        })
    },[])

    return(
        <div>
            <h3>Edit video Details</h3>
            <form onSubmit={formik.handleSubmit}>
                <dl>
                    <dt>Video Id</dt>
                    <dd><input type="number"  value={formik.values.VideoId} onChange={formik.handleChange} name="VideoId"/></dd>
                    <dt>Title</dt>
                    <dd><input type="text"  value={formik.values.Title} onChange={formik.handleChange} name="Title" /></dd>
                    <dt>Url</dt>
                    <dd><input type="text"  value={formik.values.Url} onChange={formik.handleChange} name="Url" /></dd>
                    <dt>Likes</dt>
                    <dd><input type="number"  value={formik.values.Likes} onChange={formik.handleChange}  name="Likes"/></dd>
                    <dt>Dislikes</dt>
                    <dd><input type="number" value={formik.values.Dislikes} onChange={formik.handleChange}  name="Dislikes"/></dd>
                    <dt>Views</dt>
                    <dd><input type="text" value={formik.values.Views} onChange={formik.handleChange} name="Views"/></dd>
                    <dt>Category</dt>
                    <dd>
                        <select name="CategoryId" value={formik.values.CategoryId} onChange={formik.handleChange}>
                            {
                                categories.map(category=>
                                    <option value={category.CategoryId} key={category.CategoryId}>
                                        {category.CategoryName.toUpperCase()}
                                    </option>
                                    )
                            }
                        </select>
                    </dd>
                </dl>
                <button className="btn btn-success">Update Video</button>
            </form>
            <Link to='/admin-home'>Back to Home</Link>
        </div>
    )
}