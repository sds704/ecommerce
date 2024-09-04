/* eslint-disable react/prop-types */
import { useEffect, useState } from 'react';
import MyContext from './myContext';
import { collection, deleteDoc, doc, onSnapshot, orderBy, query } from 'firebase/firestore';
import { fireDB } from '../firebase/FirebaseConfig';
import toast from 'react-hot-toast';
import axios from 'axios'

function MyState({ children }) {
    // Loading State 
    const [loading, setLoading] = useState(false);
    const user = JSON.parse(localStorage.getItem('users'));
    const token = localStorage.getItem('token');

    // console.log("my context users is : ", user, token)

    /**========================================================================
     *                          VENDOR
     *========================================================================**/

    useEffect(() => {
        getAllUsers();
        getAllCategories();
        getAllProducts();
        getAllOrders()
    }, []);


    const [allUsers, setAllUsers] = useState([])
    const [allCategories, setAllCategories] = useState([]);
    const [allProducts, setAllProducts] = useState([]); // State for products
    const [allOrders, setAllOrders] = useState([])

    // Fetch all users
    const getAllUsers = async () => {
        try {
            const res = await axios.get(`/api/users`);
            console.log("all users ", res.data)
            setAllUsers(res.data);
        } catch (error) {
            console.error("Failed to fetch users:", error);
        }
    };

    // Fetch all categories
    const getAllCategories = async () => {
        try {
            const res = await axios.get(`/api/category`);
            console.log(res.data)
            setAllCategories(res.data);
        } catch (error) {
            console.error("Failed to fetch categories:", error);
        }
    };

    // Fetch all products
    const getAllProducts = async () => {
        try {
            const res = await axios.get(`/api/products`);
            console.log("all products", res.data);
            setAllProducts(res.data);
        } catch (error) {
            console.error("Failed to fetch products:", error);
        }
    };


     // Fetch all orders
     const getAllOrders = async () => {
        try {
            const res = await axios.get(`/api/orders`);
            // console.log("all orders are ", res)
            setAllOrders(res.data);
        } catch (error) {
            console.error("Failed to fetch orders:", error);
        }
    };




    /**========================================================================
     *                           ADMIN
     *========================================================================**/

    return (
        <MyContext.Provider value={{
            loading,
            setLoading,
            getAllUsers,
            getAllCategories,
            getAllProducts,
            getAllOrders,
            allUsers,
            allProducts,
            allCategories,
            allOrders,

        }}>
            {children}
        </MyContext.Provider>
    )
}

export default MyState