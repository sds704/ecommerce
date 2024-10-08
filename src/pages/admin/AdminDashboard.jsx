import React, { useContext, useEffect, useState } from 'react';
import { FaRegListAlt, FaUser } from 'react-icons/fa';
import Sidebar from './Sidebar';
import { HiViewGridAdd } from 'react-icons/hi';
import axios from 'axios';
import myContext from '../../context/myContext';



function AdminDashboard() {
  
  const user = JSON.parse(localStorage.getItem('users'))

  const { allProducts, allCategories, allUsers } = useContext(myContext)

  const allVendors = allUsers.filter((item) => item.role === "vendor")


  // data
  const DashboardData = [
    {
      bg: "bg-orange-600",
      icon: FaRegListAlt,
      title: "Total Products",
      total: allProducts.length || 20,
    },
    {
      bg: "bg-blue-700",
      icon: HiViewGridAdd,
      title: "Total Categories",
      total: allCategories.length || 8,
    },
    {
      bg: "bg-green-600",
      icon: FaUser,
      title: "Total Vendors",
      total: allVendors.length || 7,
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

export default AdminDashboard;
