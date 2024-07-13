import React from 'react'
// import Header from '../components/Header'
import { FaFacebook } from "react-icons/fa";
import { FaSquareInstagram } from "react-icons/fa6";
// import Charts from '../components/Charts';
import userimg from '../../.././assets/user.png'
import { useContext, useEffect, useState } from 'react';
import myContext from '../../../context/myContext';
import { useNavigate } from 'react-router-dom';
import { collection, deleteDoc, doc, onSnapshot, orderBy, query } from 'firebase/firestore';
// import { fireDB } from '../../../firebase/FirebaseConfig';
import { fireDB } from '../../../firebase/FirebaseConfig';



function Main() {

  const context = useContext(myContext);
  const { loading, setLoading,getAllUser, } = context;

  const user = JSON.parse(localStorage.getItem('users'));
  console.log("user", user)
  // const context = useContext(myContext);
  // const { loading, setLoading } = context;
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
  const [getTotalSales, setGetTotalSales] = useState(0);

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
              setGetTotalSales(sale);
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
    <div className='w-4/5 bg-white overflow-y-auto flex grow flex-col justify-start items-center gap-2 p-4 h-screen'>
      {/* <Header /> */}

      {/* main section */}
      <div className="main-section grid grid-cols-1 lg:grid-cols-3 w-full h-scren mt-1 ">

        {/* left section */}
        <div className="left-section col-span-2 md:mt-6 ">
          <div className="w-full md:w-full grid-rows-2 lg:ml-10 md:mt-6">
            {/* item1 */}
            <div className="item1 bg-blue-200 flex flex-col items-center justify-center gap-4 hover:bg-blue-300 border-1 rounded-xl p-6 transition-transform transform hover:rotate-[-5deg] hover:scale-105 cursor-pointer mx-2 w-full lg:w-96">
              <svg xmlns="http://www.w3.org/2000/svg" width="50" height="50" viewBox="0 0 24 24" fill="none" stroke="blue" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-badge-indian-rupee">

                <path d="M3.85 8.62a4 4 0 0 1 4.78-4.77 4 4 0 0 1 6.74 0 4 4 0 0 1 4.78 4.78 4 4 0 0 1 0 6.74 4 4 0 0 1-4.77 4.78 4 4 0 0 1-6.75 0 4 4 0 0 1-4.78-4.77 4 4 0 0 1 0-6.76Z" /><path d="M8 8h8" /><path d="M8 12h8" /><path d="m13 17-5-1h1a4 4 0 0 0 0-8" />

              </svg>
              <h2 className="title-font font-bold text-3xl text-blue-900 fonts1 -mb-3" >₹{getTotalSales}</h2>
              <p className=" text-blue-900 text-xl  font-bold" >Total Sales</p>
            </div>
            {/* item2 */}
            <div className="item1 bg-red-200 hover:bg-red-300 border-1 flex flex-col items-center justify-center gap-4 rounded-xl p-5 m-2 transition-transform transform hover:rotate-[-5deg] hover:scale-105 cursor-pointer w-full lg:w-96 md:my-8">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width={50}
                height={50}
                viewBox="0 0 24 24"
                fill="none"
                stroke="red"
                strokeWidth={2}
                strokeLinecap="round"
                strokeLinejoin="round"
                className="lucide lucide-shopping-basket"
              >
                <path d="m5 11 4-7" />
                <path d="m19 11-4-7" />
                <path d="M2 11h20" />
                <path d="m3.5 11 1.6 7.4a2 2 0 0 0 2 1.6h9.8c.9 0 1.8-.7 2-1.6l1.7-7.4" />
                <path d="m9 11 1 9" />
                <path d="M4.5 15.5h15" />
                <path d="m15 11-1 9" />
              </svg>
              <h2 className="title-font font-bold text-3xl text-red-800 fonts1 -mb-3" >{getAllProduct.length}</h2>
              <p className=" text-red-800 text-xl  font-bold" >Total Products</p>
            </div>
            {/* item3 */}
            {/* <div className="item1 bg-green-200 hover:bg-green-300 border-1 flex flex-col items-center justify-center gap-4 rounded-xl m-2 p-5 transition-transform transform hover:rotate-[-5deg] hover:scale-105 cursor-pointer w-full lg:w-96">

              <svg
                xmlns="http://www.w3.org/2000/svg"
                width={50}
                height={50}
                viewBox="0 0 24 24"
                fill="none"
                stroke="green"
                strokeWidth={2}
                strokeLinecap="round"
                strokeLinejoin="round"
                className="lucide lucide-list-ordered"
              >
                <line x1={10} x2={21} y1={6} y2={6} />
                <line x1={10} x2={21} y1={12} y2={12} />
                <line x1={10} x2={21} y1={18} y2={18} />
                <path d="M4 6h1v4" />
                <path d="M4 10h2" />
                <path d="M6 18H4c0-1 2-2 2-3s-1-1.5-2-1" />
              </svg>
              <h2 className="title-font font-bold text-3xl text-green-900 fonts1 -mb-3" >{getAllUser.length}</h2>
              <p className=" text-green-900 text-xl  font-bold" >Total Users</p>
            </div> */}
            

          </div>
          {/* <Charts className="w-full h-full flex items-center justify-center"/> */}
        </div>

        {/* right section */}
        <div className="right-section flex flex-col h-full justify-start items-start w-full xl:-ml-20 ">
          <div className="profile bg-slate-200 p-5 rounded-xl flex flex-col items-center justify-between gap-2 w-full">
            <div className="image-box">
              <img src={userimg} alt="user" className='size-24' />
            </div>
            {/* <div className="title flex flex-col justify-between items-center w-full">
              <h1 className='text-2xl font-bold'>Admin</h1>
              <p className='text-lg'>@sds3</p>
            </div> */}
            {/* <div className="stats flex items-center justify-between gap-6">
              <div className="1st flex flex-col gap-2 items-start justify-center ">
                <h1 className='text-2xl font-bold'>735</h1>
                <p className='text-md'>Posts</p>
              </div>
              <div className="1st flex flex-col gap-2 items-start justify-center ">
                <h1 className='text-2xl font-bold'>10,735</h1>
                <p className='text-md'>Followers</p>
              </div>
              <div className="1st flex flex-col gap-2 items-start justify-center ">
                <h1 className='text-2xl font-bold'>500</h1>
                <p className='text-md'>Following</p>
              </div>
            </div> */}
          </div>
          <div className="fb-campaign  bg-black text-white p-4 rounded-xl flex flex-col items-center justify-center gap-6 w-full h-full -mt-10 z-10">
            <div className="top-title flex justify-center gap-4 items-center">
              <span className='font-bold text-2xl'>{user.role}</span>

            </div>
            <div className="info-of flex flex-col justify-center items-start gap-4 md:gap-6">
              <div className="ones flex flex-col items-start justify-center">
                <h1 className='text-md font-medium'>Name : {user.name}</h1>

              </div>
              <div className="ones flex flex-col items-start justify-center">
                <h1 className='text-md font-medium'>Email : {user.email}</h1>

              </div>
              <div className="ones flex flex-col items-start justify-center">
                <h1 className='text-md font-medium'>Date : {user.date}</h1>

              </div>
              <div className="ones flex flex-col items-start justify-center">
                <h1 className='text-md font-medium'>Role : {user.role}</h1>

              </div>
            </div>
            {/* <div className="photos flex flex-col md:flex-row items-center justify-center">
              <div className="nested-img flex -space-x-5 items-center justify-center">
                <img src={user} alt="" className='h-10 w-10 rounded-full border-2 border-white' />
                <img src={user} alt="" className='h-10 w-10 rounded-full border-2 border-white' />
                <img src={user} alt="" className='h-10 w-10 rounded-full border-2 border-white' />
                <img src={user} alt="" className='h-10 w-10 rounded-full border-2 border-white' />
                <img src={user} alt="" className='h-10 w-10 rounded-full border-2 border-white' />
                <img src={user} alt="" className='h-10 w-10 rounded-full border-2 border-white' />
                <img src={user} alt="" className='h-10 w-10 rounded-full border-2 border-white' />
                <img src={user} alt="" className='h-10 w-10 rounded-full border-2 border-white' />
                <img src={user} alt="" className='h-10 w-10 rounded-full border-2 border-white' />
                <img src={user} alt="" className='h-10 w-10 rounded-full border-2 border-white' />

              </div>
              <div className="flex flex-col items-center justify-center">
                <h1 className='text-xl font-semibold'>+7,129</h1>
                <p>All Time</p>
              </div>
            </div> */}

          </div>
        </div>
      </div>
    </div>
  )
}

export default Main