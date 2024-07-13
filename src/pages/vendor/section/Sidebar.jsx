import React, { useEffect, useState } from 'react'
import { MdDashboard } from "react-icons/md";
import { SiSimpleanalytics } from "react-icons/si";
import { MdOutlineMessage } from "react-icons/md";
import { IoSettingsSharp } from "react-icons/io5";
import { FaArrowRight } from "react-icons/fa";
import { motion } from "framer-motion"
import { MdLogout } from "react-icons/md";
import { TbCategoryPlus } from "react-icons/tb";
import { MdOutlineProductionQuantityLimits } from "react-icons/md";
import { FaUsers } from "react-icons/fa6";
import { LuListOrdered } from "react-icons/lu";
import { linkWithCredential } from 'firebase/auth';
import { Link, useNavigate } from 'react-router-dom';
import { MdAddToPhotos } from "react-icons/md";



const navItems = [
  {
    name: "Dashboard",
    icon: MdDashboard,
    link: "/vendor"
  },
  {
    name: "Category",
    icon: TbCategoryPlus,
    link: "/vendor/category"
  },
  {
    name: "Products",
    icon: MdOutlineProductionQuantityLimits,
    link: "/vendor/products"
  },
  {
    name: "Products",
    icon: MdAddToPhotos,
    link: "/vendor/addproduct"
  },
  // {
  //   name: "Users",
  //   icon: FaUsers,
  //   link: "/vendor/users"
  // },
  {
    name: "Orders",
    icon: LuListOrdered,
    link: "/vendor/orders"
  }
];

const variants = {
  expanded: {
    width: "20%"
  },
  notExpanded: {
    width: '5%'
  }
}


function Sidebar() {
  const [isExpanded, setIsExpanded] = useState(true)
  const [activeNavIndex, setActiveNavIndex] = useState(() => {
    const savedIndex = localStorage.getItem('activeNavIndex');
    return savedIndex !== null ? Number(savedIndex) : 0;
  });

  const navigate = useNavigate();

  console.log("activeIndex ", activeNavIndex)

  useEffect(() => {
    const handleResize = () => {
      const width = window.innerWidth;
      if (width <= 760) {
        setIsExpanded(false)
      } else {
        setIsExpanded(true)
      }
    }
    handleResize();

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize)
    }
  }, [])


  useEffect(() => {
    localStorage.setItem('activeNavIndex', activeNavIndex);
  }, [activeNavIndex]);

  




  return (
    <motion.div
      animate={isExpanded ? 'expanded' : 'notExpanded'}
      variants={variants}
      className={" w-1/5 bg-gray-900 h-screen flex flex-col justify-between sticky top-0 items-center gap-8 " + (isExpanded ? "py-6 px-6" : "py-4 px-8")}>

      {/* logo */}
      <div className="logo" >
        {
          isExpanded ? <div className='logo-box '>
            <h1 className='text-4xl font-extrabold text-red-500'>STORE</h1>
          </div> :
            <div className="small-logo">
              <h1 className='text-4xl font-extrabold text-yellow-500'>SE</h1>
            </div>
        }
      </div>

      {/* nav items */}


      {/* // */}

      <div className="navlist flex flex-col justify-center items-start gap-4 h-screen">
        {navItems.map((item, index) => (
          <Link to={item.link}>
         
          <div
            key={index}
            className={`flex items-center justify-start rounded-xl w-full gap-4 cursor-pointer ${activeNavIndex === index ? 'bg-yellow-500 text-black' : 'text-white'} ${isExpanded ? 'px-6 py-1' : 'py-2 px-2'}`}
            onClick={() => setActiveNavIndex(index)}
          >
            <div className="p-2 bg-yellow-300 text-black rounded-full">
              {React.createElement(item.icon, { className: 'w-4 h-4 md:w-5 md:h-5' })}
            </div>
            <div className={`text-lg ${isExpanded ? 'flex' : 'hidden'}`}>
              <div>{item.name}</div>
            </div>
          </div>
          </Link>
        ))}
      </div>


      {/* expanded-arrow */}
      <div className="expanded-icons bg-yellow-500 absolute rounded-full -right-4 bottom-20 cursor-pointer p-2 text-black md:flex hidden" onClick={() => setIsExpanded(!isExpanded)}>
        <FaArrowRight />
      </div>

      {/* logout */}
      <div className="log-out w-full flex flex-col justify-center items-center gap-4 cursor-pointer">
        <div className="line h-[0.5px] bg-slate-700 w-full">
        </div>
        <Link to='/login'><div className="wrap-logout flex items-center justify-center gap-2 " >
          <div className="logout-icons text-white">
            <MdLogout className='h-6 w-6' />
          </div>
          <span className={"logout-title text-white text-lg" + (isExpanded ? " flex " : " hidden ")}>
            Logout
          </span>
        </div></Link>

      </div>



    </motion.div>
  )
}

export default Sidebar





