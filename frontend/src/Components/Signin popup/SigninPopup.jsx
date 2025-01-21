import {  useContext,  useState } from 'react';
import './SigninPopup.css';
import React from 'react';
import { assets } from '../../assets/assets';
import { StoreContext } from '../../Context/StoreContext';
import axios from "axios"

const SigninPopup = ({ setShowLogin }) => {

    const {url, setToken} = useContext(StoreContext)
    const [currState, setCurrState] = useState("Login");
    const [data, setData] = useState({
        name : "",
        email : "",
        password : ""
    })

    const onChangeHandler = (event) => {
        const name = event.target.name; 
        const value = event.target.value;
        setData(data=>({...data, [name]:value}))
    }

    const onLogin = async (event) => {
        event.preventDefault();
        console.log("Form submitted");
    
        let newUrl = url;
        if(currState === "Login") {
            newUrl += "/api/user/login";
        } else {
            newUrl += "/api/user/register";
        }
    
        console.log("Making API call to:", newUrl); // Log the API endpoint
    
        try {
            const response = await axios.post(newUrl, data);
            console.log("API Response received:", response); // Log the API response
    
            if (response.data.success) {
                console.log("Login/Sign Up successful");
                setToken(response.data.token);
                localStorage.setItem("token", response.data.token);
                setShowLogin(false);
            } else {
                console.log("API responded with error:", response.data.message);
                alert(response.data.message);
            }
        } catch (error) {
            console.error("Error during API call:", error); // Log any errors from axios
            alert("An error occurred. Please try again.");
        }
    };
    

    

    return (
        <div className="signin-popup">
            <form onSubmit={onLogin}  className="signin-popup-container">
                <div className="signin-popup-title">
                    <h2>{currState}</h2>
                    <img onClick={() => setShowLogin(false)} src={assets.cross_icon} alt="Close" />
                </div>

                <div className="signin-popup-input">
                    {currState === "Sign Up" && <input name="name" onChange = {onChangeHandler} value = {data.name} type="text" placeholder="Your name" required />}
                    <input name="email" onChange={onChangeHandler} value={data.email} type="email" placeholder="Your email" required />
                    <input name="password" onChange={onChangeHandler} value = {data.password} type="password" placeholder="Password" required />
                </div>

                <button type="submit">
                    {currState === "Sign Up" ? "Create account" : "Login"}
                </button>

                <div className="login-popup-condition">
                    <input type="checkbox" required />
                    <p>By continuing, I agree to the terms of use & privacy policy.</p>
                </div>

                <p>
                    {currState === "Login" 
                        ? "Create a new account? " 
                        : "Already have an account? "}
                    <span onClick={() => setCurrState(currState === "Login" ? "Sign Up" : "Login")}>
                        {currState === "Login" ? "Click here" : "Login here"}
                    </span>
                </p>
            </form>
        </div>
    );
};

export default SigninPopup;
