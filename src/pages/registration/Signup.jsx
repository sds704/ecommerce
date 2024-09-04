/* eslint-disable react/no-unescaped-entities */
import { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import myContext from "../../context/myContext";
import { Timestamp, addDoc, collection } from "firebase/firestore";
import { auth, fireDB } from "../../firebase/FirebaseConfig";
import { createUserWithEmailAndPassword } from "firebase/auth";
import toast from "react-hot-toast";
import Loader from "../../components/loader/Loader";
import './signup.css'
import axios from 'axios'

const roleType = [
    { role: "user" },
    { role: "vendor" }
]

const Signup = () => {

    const context = useContext(myContext);
    const { loading, setLoading } = context;

    // navigate 
    const navigate = useNavigate();

    // User Signup State 
    const [userSignup, setUserSignup] = useState({
        name: "",
        email: "",
        password: "",
        role: ""
    });

    console.log(userSignup)
    /**========================================================================
     *                          User Signup Function 
    *========================================================================**/

    const userSignupFunction = async () => {
        // validation 
        if (userSignup.name === "" || userSignup.email === "" || userSignup.password === "" || userSignup.role === "") {
            toast.error("All Fields are required");
            return; // Return early if validation fails
        }
    
        setLoading(true);
        try {
            // Send signup data to the backend API
            const response = await axios.post('/api/users/register', {
                name: userSignup.name,
                email: userSignup.email,
                password: userSignup.password,
                role: userSignup.role
            });
    
            console.log("Registered successfully", response)
            // Clear the input fields
            setUserSignup({
                name: "",
                email: "",
                password: "",
                role: ""
            });
    
            // Show success message and navigate to login page
            toast.success("User Registered Successfully");
            setLoading(false);
            navigate('/login');
        } catch (error) {
            console.log(error);
            // Show error message if registration fails
            if (error.response && error.response.data && error.response.data.message) {
                toast.error(error.response.data.message);
            } else {
                toast.error("Something went wrong. Please try again.");
            }
            setLoading(false);
        }
    };
    
    return (
        <div className='signup flex justify-center items-center h-screen'>
            {loading && <Loader />}
            {/* Login Form  */}

            {/* <div className="img">
                <img src="../../../img/register.jpg" alt="registe" className="h-96 w-96 "/>
            </div> */}

            <div className="signup_Form  px-8 py-6 border  rounded-xl shadow-xl">

                {/* Top Heading  */}
                <div className="mb-5">
                    <h2 className='text-center text-2xl font-bold  '>
                        Signup
                    </h2>
                </div>

                {/* Input One  */}
                <div className="mb-3">
                    <input
                        type="text"
                        placeholder='Full Name'
                        value={userSignup.name}
                        onChange={(e) => {
                            setUserSignup({
                                ...userSignup,
                                name: e.target.value
                            })
                        }}
                        className=' border  px-2 py-2 w-60 md:w-96 rounded-md outline-none '
                    />
                </div>

                {/* Input Two  */}
                <div className="mb-3">
                    <input
                        type="email"
                        placeholder='Email Address'
                        value={userSignup.email}
                        onChange={(e) => {
                            setUserSignup({
                                ...userSignup,
                                email: e.target.value
                            })
                        }}
                        className=' border  px-2 py-2 w-60 md:w-96  rounded-md outline-none '
                    />
                </div>
                {/* role */}
                {/* //user or vendor */}
                <div className="mb-3">
                    <select
                        value={userSignup.role}
                        onChange={(e) => {
                            setUserSignup({
                                ...userSignup,
                                role: e.target.value
                            })
                        }}
                        className=" border  px-2 py-2 w-full rounded-md outline-none  "
                    >
                        <option disabled>Select Your Role</option>
                        {roleType.map((item, index) => {
                            const { role } = item;
                            return (
                                <option key={index} value={role}>
                                    {role}
                                </option>
                            );
                        })}
                    </select>
                </div>

                {/* Input Three  */}
                <div className="mb-5">
                    <input
                        type="password"
                        placeholder='Password'
                        value={userSignup.password}
                        onChange={(e) => {
                            setUserSignup({
                                ...userSignup,
                                password: e.target.value
                            })
                        }}
                        className=' border px-2 py-2 w-60 md:w-96 rounded-md outline-none '
                    />
                </div>

                {/* Signup Button  */}
                <div className="mb-5">
                    <button
                        type='button'
                        onClick={userSignupFunction}
                        className='  w-full  text-center py-2 font-bold rounded-md '
                    >
                        Signup
                    </button>
                </div>

                <div>
                    <h2 className=' text-center'>Have an account ? <Link className='  font-bold' to={'/login'}>Login</Link></h2>
                </div>

            </div>
        </div>
    );
}

export default Signup;
