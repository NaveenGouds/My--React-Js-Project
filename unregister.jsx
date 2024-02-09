import React from "react";
import { Link } from "react-router-dom";
export function Unregisterd(){
    return(
        <div>
            <h2>Unable to Find Your Account</h2>
            <p><span><Link to='/register'>Register</Link></span></p>
        </div>
    )
}