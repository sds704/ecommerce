/* eslint-disable react/prop-types */
import { useEffect, useState } from 'react';
import MyContext from './myContext';
import { collection, deleteDoc, doc, onSnapshot, orderBy, query } from 'firebase/firestore';
import { fireDB } from '../firebase/FirebaseConfig';
import toast from 'react-hot-toast';

function MyState({ children }) {
    // Loading State 
    const [loading, setLoading] = useState(false);


    const user = JSON.parse(localStorage.getItem('users'));
    // console.log("my state users is : " + user)

    /**========================================================================
     *                          GET All Product Function form admin
     *========================================================================**/

    // get all product for admin
    const [getAllProduct, setGetAllProduct] = useState([]);

    const getAllProductFunction = async () => {
        setLoading(true);
        try {
            const q = query(
                collection(fireDB, "products"),
                orderBy('time')
            );
            const data = onSnapshot(q, (QuerySnapshot) => {
                let productArray = [];
                QuerySnapshot.forEach((doc) => {
                    productArray.push({ ...doc.data(), id: doc.id });
                });
                setGetAllProduct(productArray);
                setLoading(false);
            });
            return () => data;
        } catch (error) {
            console.log(error);
            setLoading(false);
        }
    }

    // delete product for admin
    const deleteProduct = async (id) => {
        setLoading(true)
        try {
            await deleteDoc(doc(fireDB, 'products', id))
            toast.success('Product Deleted successfully')
            getAllProductFunction();
            setLoading(false)
        } catch (error) {
            console.log(error)
            setLoading(false)
        }
    }




    /**========================================================================
     *                           GET All Order Function for admin
     *========================================================================**/

    // get all order for admin
    const [getAllOrder, setGetAllOrder] = useState([]);

    // Total Sales for admin
    const [getTotalSales, setGetTotalSales] = useState(0);

    const getAllOrderFunction = async () => {
        setLoading(true);
        try {
            const q = query(
                collection(fireDB, "order"),
                orderBy('time')
            );
            let sale = 0
            const data = onSnapshot(q, (QuerySnapshot) => {
                let orderArray = [];
                QuerySnapshot.forEach((doc) => {
                    orderArray.push({ ...doc.data(), id: doc.id });

                    // 
                    doc.data().cartItems.map((item, index) => {
                        sale = sale + parseInt(item.price) * parseInt(item.quantity)
                    })
                });
                setGetAllOrder(orderArray);
                setGetTotalSales(sale);

                setLoading(false);
            });
            return () => data;
        } catch (error) {
            console.log(error);
            setLoading(false);
        }
    }


    // Delete order Function for admin
    const orderDelete = async (id) => {
        setLoading(true)
        try {
            await deleteDoc(doc(fireDB, 'order', id))
            toast.success('Order Deleted successfully')
            getAllOrderFunction();
            setLoading(false)
        } catch (error) {
            console.log(error)
            setLoading(false)
        }
    }





    /*=======================================================================
                                GET All User Function for admin
     =======================================================================*/

    // get all user for admin
    const [getAllUser, setGetAllUser] = useState([]);

    const getAllUserFunction = async () => {
        setLoading(true);
        try {
            const q = query(
                collection(fireDB, "user"),
                orderBy('time')
            );
            const data = onSnapshot(q, (QuerySnapshot) => {
                let userArray = [];
                QuerySnapshot.forEach((doc) => {
                    userArray.push({ ...doc.data(), id: doc.id });
                });
                setGetAllUser(userArray);
                setLoading(false);
            });
            return () => data;
        } catch (error) {
            console.log(error);
            setLoading(false);
        }
    }

    // delete user for admin
    const deleteUser = async (id) => {
        setLoading(true)
        try {
            await deleteDoc(doc(fireDB, 'user', id))
            toast.success('Order Deleted successfully')
            getAllUserFunction();
            setLoading(false)
        } catch (error) {
            console.log(error)
            setLoading(false)
        }
    }


    useEffect(() => {
        getAllProductFunction();
        getAllOrderFunction();
        getAllUserFunction();
    }, []);

    return (
        <MyContext.Provider value={{
            loading,
            setLoading,
            getAllProduct,
            getAllProductFunction,
            deleteProduct,
            getAllOrder,
            getTotalSales,
            orderDelete,
            getAllUser,
            deleteUser,

        }}>
            {children}
        </MyContext.Provider>
    )
}

export default MyState