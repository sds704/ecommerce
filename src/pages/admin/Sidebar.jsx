import React from 'react';
import { BsFillGridFill } from 'react-icons/bs';
import { TbCategoryPlus } from 'react-icons/tb';
import { MdOutlineProductionQuantityLimits, MdAddToPhotos, MdLogout } from 'react-icons/md';
import { FaUsers } from 'react-icons/fa6';
import { LuListOrdered } from 'react-icons/lu';
import { NavLink, useNavigate } from 'react-router-dom';
import { LuFileEdit } from "react-icons/lu";


const navItems = [
  { name: "Dashboard", icon: BsFillGridFill, link: "/admin/dashboard" },
  { name: "Category", icon: TbCategoryPlus, link: "/admin/category" },
  { name: "Products", icon: MdOutlineProductionQuantityLimits, link: "/admin/products" },
  // { name: "Add Products", icon: MdAddToPhotos, link: "/admin/addproduct" },
  { name: "Vendors", icon: FaUsers, link: "/admin/users" },
  // { name: "Orders", icon: LuListOrdered, link: "/admin/orders" },
];

function Sidebar({ children }) {
  const user = JSON.parse(localStorage.getItem('users'));
  const navigate = useNavigate();

  const active = 'bg-dryGray text-subMain';
  const hover = 'hover:text-white hover:bg-main';
  const inActive = 'rounded font-medium text-sm transitions flex gap-3 items-center p-4 ';

  // const Hover = ({ isActive }) => (isActive ? ` ${active} ${inActive} ` : `${inActive} ${hover} text-white`);

  const handleLogout = () => {
    localStorage.removeItem('users')
    localStorage.removeItem('token')
    navigate('/login')
  }

  return (
    <div className="min-height-screen mx-auto px-2 bg-main">
      <div className="lg:grid grid-cols-8 gap-10 items-start md:py-12 p-6">
        <div className="hidden lg:block col-span-2 sticky bg-dry border border-gray-800 p-6 rounded-md">
          {navItems.map((item, index) => (
            <NavLink to={item.link}
            className={({ isActive }) =>
              `rounded font-medium text-sm transitions flex gap-3 items-center p-4 ${
                isActive ? 'bg-dryGray text-subMain' : 'hover:text-white hover:bg-main text-white'
              }`
            }
             key={index}>
              <item.icon /> {item.name}
            </NavLink>
          ))}

          <button
            onClick={handleLogout}
            className={`${inActive} ${hover} text-white`}>
            <MdLogout /> Logout
          </button>
        </div>
        
        <div className="col-span-6 border border-border rounded">
          {children}
        </div>
      </div>
    </div>
  );
}

export default Sidebar




