import React,{useState,useEffect} from "react";
import { Link } from "react-router-dom";
import { Formik,useFormik } from "formik";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export function AddVideo(){
    const[categories,setCategories]=useState([]);
const navigate=useNavigate();

    const formik = useFormik({
        initialValues:{
            VideoId: 0,
            Title: '',
            Url: '',
            Likes: 0,
            Dislikes:0,
            Views:0,
            CategoryId:0
        },
        onSubmit:(values)=>{
            axios.post("http://127.0.0.1:5000/addvideo",values);
            alert('Vide added Sucessfully..')
            navigate("/admin-home")
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
        },[]);

    return(
        <div className="border border-2 rounded rounded-2 p-4 m-4 bg-dark text-white" style={{height:'100vh'}}>
            <h2>Add New video</h2>
            <form onSubmit={formik.handleSubmit}>
                <dl>
                    <dt>Video Id</dt>
                    <dd><input type="number" onChange={formik.handleChange} name="VideoId"/></dd>
                    <dt>Title</dt>
                    <dd><input type="text" onChange={formik.handleChange} name="Title" /></dd>
                    <dt>Url</dt>
                    <dd><input type="text" onChange={formik.handleChange} name="Url" /></dd>
                    <dt>Likes</dt>
                    <dd><input type="number" onChange={formik.handleChange}  name="Likes"/></dd>
                    <dt>Dislikes</dt>
                    <dd><input type="number" onChange={formik.handleChange}  name="Dislikes"/></dd>
                    <dt>Views</dt>
                    <dd><input type="text" onChange={formik.handleChange} name="Views"/></dd>
                    <dt>Category</dt>
                    <dd>
                        <select name="CategoryId" onChange={formik.handleChange}>
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
                <button className="btn btn-primary">Add</button>
            </form>
            <p>
                <Link to ='/admin-home'>Back to Home</Link>
            </p>
        </div>
    )
}