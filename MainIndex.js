
import React from "react";
import { BrowserRouter,Link,Route,Routes,useNavigate } from "react-router-dom";
import { MainComponent } from "./HomeMain";
import { Unregisterd } from "./unregister";
import { Login } from "./login";
import { Register } from "./register";
import { VideosHome } from "./Videos-Home";
import { AdminHome } from "./admin-home";
import { AdminLogin } from "./admin-login";
import { AddVideo } from "./add-video";
import { ViewVideo } from "./View-video";
import { EditVideo } from "./edit-video";
import { DeleteVideo } from "./delete-video";
import { useCookies } from 'react-cookie';

function SignoutComponent(){
    const [cookies, setCookie, removeCookie] = useCookies('userName');
    let navigate = useNavigate();
    function handleSignout(){
       removeCookie('userName');
       navigate('/login');
      }
    return(
       <button onClick={handleSignout} className='btn btn-light me-2'>Signout</button>
    )
 }
export function MainIndex(){

    const [cookies, setCookie, removeCookie] = useCookies('userName');

    return(
        <div className="container-fluid">
            <BrowserRouter>
            <header className="d-flex justify-content-between p-2 mt-3 bg-dark text-white">
        <div>
           <h2><Link className="text-white text-decoration-none" to ='/'>Tech-Videos</Link></h2> 
        </div>
        <div>
            {/* <Link to="/login" className="btn btn-danger me-2"> User Signin</Link>
            <Link  to='/admin-login'className="btn btn-danger"> Admin Signin</Link> */}
           {
                  (cookies['userName']===undefined) ? <Link className='btn btn-light me-2' to='/login'>User Signin</Link> : <SignoutComponent/>
               }
               <Link to="/admin-login" className='btn btn-light'> <span className='bi bi-person-fill'></span> Admin Dashboard </Link>
        </div>
            </header>
            <section className="d-flex justify-content-center align-items-center" style={{height:'100vh'}}>
               <div>
                <Routes>
                    <Route path='/'element={<MainComponent/>}/>
                    <Route path ='/register' element={<Register/>} />
                    <Route path='/login' element={<Login/>}/>
                    <Route path ='/unregister' element={<Unregisterd/>} />
                    <Route path='/videos' element={<VideosHome/>}/>
                    <Route path ='/admin-login' element={<AdminLogin/>}/>
                     <Route path='/admin-home' element={<AdminHome/>}/>
                     <Route path='/add-video' element={<AddVideo/>}/>
                     <Route path = '/view-video/:id'  element={<ViewVideo />} />
                     <Route path ='/edit-video/:id' element={<EditVideo/>}/>
                    <Route path ='/delete-video/:id' element={<DeleteVideo/>}/>
                </Routes>
               </div>
            </section>





            </BrowserRouter>

        </div>
    )
}