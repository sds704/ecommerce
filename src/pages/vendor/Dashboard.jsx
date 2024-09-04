import React, { useContext, useEffect, useState } from 'react';
import { FaRegListAlt, FaUser } from 'react-icons/fa';
import Sidebar from './Sidebar';
import { HiViewGridAdd } from 'react-icons/hi';
import axios from 'axios';
import myContext from '../../context/myContext';
// import { vendor } from '../../../../api/middleware/Auth';
import { FaCartPlus } from "react-icons/fa";




function Dashboard() {
  const user = JSON.parse(localStorage.getItem('users'))

  const { allUsers, allProducts, allCategories, allOrders } = useContext(myContext)

  // Filter orders to include only those where the vendor (ownerId) matches the logged-in user
  const vendorOrders = allOrders.filter(order =>
    order.products.some(product => product.product.ownerId === user._id)
  );

  // Filter products and categories specific to the logged-in vendor
  const vendorProducts = allProducts.filter((product) => product.ownerId === user._id);
  const vendorCategories = allCategories.filter((category) => (
            category.ownerId === user._id
  )
    // vendorProducts.some((product) => product.category === category.type)
  );

  console.log( vendorProducts)

  const onlyUsers = allUsers.filter((item) => item.role === 'user')

  // data
  const DashboardData = [
    {
      bg: "bg-orange-600",
      icon: FaRegListAlt,
      title: "Total Products",
      total: vendorProducts.length || 20,
    },
    {
      bg: "bg-blue-700",
      icon: HiViewGridAdd,
      title: "Total Categories",
      total: vendorCategories.length || 8,
    },
    {
      bg: "bg-green-600",
      icon: FaCartPlus,
      title: "Total Orders",
      total: vendorOrders.length || 9,
    },
  ];

  return (
    <Sidebar>
      <div className="w-full min-h-screen bg-dry p-4">
        <h2 className="text-xl font-bold text-white">Dashboard</h2>

        {/* vendor Info Section */}
        <div className="flex items-center gap-4 mt-4 w-60 mx-auto bg-main p-4 rounded">
          {
            // user?.image ?
            //   (<img
            //     src={user.image} // Replace with a default image if not available
            //     alt="Admin Avatar"
            //     className="w-16 h-16 rounded-full object-cover"
            //   />)
            //   :
            (<FaUser className='w-16 h-16 text-white' />)
          }

          <div>
            <h3 className="text-lg font-bold capitalize text-white">{user.name}</h3>
            <p className="text-sm text-gray-500">{user.email}</p>
          </div>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-6 lg:mt-10">
          {DashboardData.map((data, index) => (
            <div key={index} className="p-4 rounded bg-main border border-border grid grid-cols-4 gap-2">
              <div className={`col-span-1 rounded-full h-12 w-12 flex-colo ${data.bg}`}>
                <data.icon />
              </div>
              <div className="col-span-3 ">
                <h2 className='text-text'>{data.title}</h2>
                <p className='text-sm mt-2 text-white font-bold'>{data.total}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </Sidebar>
  );
}

export default Dashboard;
