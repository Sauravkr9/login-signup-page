import React from "react"
import "./homepage.css"
import { useLocation } from "react-router-dom"
const Homepage = ({setLoginUser}) => {
    const location=useLocation()
    return (
        <div className="homepage">
            <h1>Hello {location.state} welcome to our Homepage</h1>
            <div className="button" onClick={() => setLoginUser({})} >Logout</div>
        </div>
    )
}

export default Homepage
