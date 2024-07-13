import { useContext, useEffect, useState } from 'react';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import ProductDetailRt from '../../components/vendor/ProductDetailRt';
import OrderDetailRt from '../../components/vendor/OrderDetailRt';
import UserDetailRt from '../../components/vendor/UserDetailRt';
import myContext from '../../context/myContext';
import { FaHome } from "react-icons/fa";
import { useNavigate } from 'react-router-dom';
import { collection, deleteDoc, doc, onSnapshot, orderBy, query } from 'firebase/firestore';
import { fireDB } from '../../firebase/FirebaseConfig';
import Sidebar from './section/Sidebar';
import Main from './section/Main';



const VendorDashboard = () => {
    const user = JSON.parse(localStorage.getItem('users'));
    const context = useContext(myContext);
    const { loading, setLoading } = context;
    const navigate = useNavigate()


    useEffect(() => {
        getAllProductFunction()
        getAllOrderFunction()
        // getTotalSales()
    }, []);


    // get all products
    const [getAllProduct, setGetAllProduct] = useState([])

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
                    // console.log("doc is : "+doc.owner)
                    if (doc.data().owner == user.uid) {
                        productArray.push({ ...doc.data(), id: doc.id });
                    }
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


    // get all orders
    const [getAllOrder, setGetAllOrder] = useState([]);

    //total sales
    const [totalSales, setTotalSales] = useState(0);

    const getAllOrderFunction = async () => {
        setLoading(true);
        try {
            const q = query(
                collection(fireDB, "order"),
                orderBy('time')
            );
            const data = onSnapshot(q, (QuerySnapshot) => {
                let orderArray = [];
                let sale = 0;
                QuerySnapshot.forEach((doc) => {
                    const data = doc.data();
                    // console.log("data are : " + data.cartItems.owner)
                    if (data.cartItems[0].owner == user.uid) {
                        orderArray.push({ ...data, id: doc.id });
                    }
                    // to calculate total Sales

                    data.cartItems.map((item, index) => {
                        if (item.owner == user.uid) {
                            sale = sale + parseInt(item.price) * parseInt(item.quantity)
                        }
                    })
                    // 
                });
                setGetAllOrder(orderArray);
                setTotalSales(sale);
                // getTotalSales()
                setLoading(false);
            });
            return () => data;
        } catch (error) {
            console.log(error);
            setLoading(false);
        }
    }

    


    return (
        <div className='flex justify-between'>
        <Sidebar/>
        <Main />
      </div>
    );
}

export default VendorDashboard;
