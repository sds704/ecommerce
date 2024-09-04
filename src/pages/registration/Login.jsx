/* eslint-disable react/no-unescaped-entities */
import { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import myContext from "../../context/myContext";
import toast from "react-hot-toast";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth, fireDB } from "../../firebase/FirebaseConfig";
import Loader from "../../components/loader/Loader";
import { collection, onSnapshot, query, where } from "firebase/firestore";
import './login.css'
import axios from 'axios'

const Login = () => {
    const context = useContext(myContext);
    const { loading, setLoading } = context;

    // navigate 
    const navigate = useNavigate();

    // User Signup State 
    const [userLogin, setUserLogin] = useState({
        email: "",
        password: ""
    });

    /**========================================================================
     *                          User Login Function 
    *========================================================================**/

    const userLoginFunction = async () => {
        // Validation 
        if (userLogin.email === "" || userLogin.password === "") {
            toast.error("All Fields are required");
            return; // Return early if validation fails
        }

        setLoading(true);
        try {
            // Send login data to the backend API
            const response = await axios.post('/api/users/login', {
                email: userLogin.email,
                password: userLogin.password
            });

            // Handle successful login
            const { token, name, email, role, _id } = response.data;

            // Store token and user data in localStorage or state
            localStorage.setItem('token', token);
            localStorage.setItem('users', JSON.stringify({ name, email, role, token, _id }));

            // Clear input fields
            setUserLogin({
                email: "",
                password: ""
            });

            // Show success message and navigate to the home page or dashboard
            toast.success("Login Successful");
            setLoading(false);

            // who will be logged in user or vendor or admin
            if (role === 'vendor') {
                navigate('/vendor/dashboard')
            } else if (role === 'admin') {
                navigate('/admin/dashboard')
            }else{
                navigate('/');
            }

        } catch (error) {
            console.log(error);
            setLoading(false);

            // Show error message
            if (error.response && error.response.data && error.response.data.message) {
                toast.error(error.response.data.message);
            } else {
                toast.error("Login Failed. Please check your credentials and try again.");
            }
        }
    };

    return (
        <div className='login flex justify-center items-center h-screen'>
            {loading && <Loader />}
            {/* Login Form  */}
            <div className="login_Form   px-8 py-6 border  rounded-xl shadow-md">

                {/* Top Heading  */}
                <div className="mb-5">
                    <h2 className='text-center text-2xl font-bold  '>
                        Login
                    </h2>
                </div>

                {/* Input One  */}
                <div className="mb-3">
                    <input
                        type="email"
                        name="email"
                        placeholder='Email Address'
                        value={userLogin.email}
                        onChange={(e) => {
                            setUserLogin({
                                ...userLogin,
                                email: e.target.value
                            })
                        }}
                        className=' border  px-2 py-2 w-60 md:w-96  rounded-md outline-none '
                    />
                </div>

                {/* Input Two  */}
                <div className="mb-5">
                    <input
                        type="password"
                        placeholder='Password'
                        value={userLogin.password}
                        onChange={(e) => {
                            setUserLogin({
                                ...userLogin,
                                password: e.target.value
                            })
                        }}
                        className=' border  px-2 py-2 w-60 md:w-96 rounded-md outline-none '
                    />
                </div>

                {/* Signup Button  */}
                <div className="mb-5">
                    <button
                        type='button'
                        onClick={userLoginFunction}
                        className='  w-full text-white text-center py-2 font-bold rounded-md '
                    >
                        Login
                    </button>
                </div>

                <div>
                    <h2 className=' text-center'>Don't Have an account ? <Link className=' font-bold' to={'/signup'}>Signup</Link></h2>
                </div>

            </div>
        </div>
    );
}

export default Login;

