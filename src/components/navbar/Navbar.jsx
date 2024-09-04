import { Link, NavLink, useNavigate } from "react-router-dom";
import SearchBar from "../searchBar/SearchBar";
import { useSelector } from "react-redux";
import { FaShoppingCart } from "react-icons/fa";


const Navbar = () => {
    // Get user from localStorage 
    const token = localStorage.getItem('token');
    const user = JSON.parse(localStorage.getItem('users'));

    // console.log(token, user);
    // Navigate 
    const navigate = useNavigate();

    // Logout function 
    const logout = () => {
        localStorage.removeItem('users');
        localStorage.removeItem('token');
        navigate("/login");
    };

    // CartItems
    const cartItems = useSelector((state) => state.cart);

    const active = 'text-subMain bg-blue-800';
    const hover = 'hover:text-white hover:bg-main';
    const inActive = 'rounded font-medium text-sm transitions flex gap-3 items-center p-2 ';

    const Hover = ({ isActive }) => (isActive ? ` ${active} ${inActive} ` : `${inActive} ${hover} `);

    // NavList Data
    const navList = (
        <ul className="flex space-x-3 lg:space-x-5 text-white font-medium text-md">
            {/* Home */}
            <li>
                <NavLink to={'/'} className={Hover}>Home</NavLink>
            </li>

            {/* All Products */}
            <li>
                <NavLink to={'/allproduct'} className={Hover}>Products</NavLink>
            </li>

            {/* Signup */}
            {!user && (
                <li>
                    <NavLink to={'/signup'} className={Hover}>Signup</NavLink>
                </li>
            )}

            {/* Login */}
            {!user && (
                <li>
                    <NavLink to={'/login'} className={Hover}>Login</NavLink>
                </li>
            )}

            {/* User Dashboard */}
            {user?.role === "user" && (
                <li>
                    <NavLink to={'/user-dashboard'} className={Hover}>User</NavLink>
                </li>
            )}

            {/* Vendor Dashboard */}
            {/* {user?.role === "vendor" && (
                <li>
                    <Link to={'/vendor'}>Vendor</Link>
                </li>
            )} */}

            {/* Admin Dashboard */}
            {/* {user?.role === "admin" && (
                <li>
                    <Link to={'/admin'}>Admin</Link>
                </li>
            )} */}

            {/* Logout */}
            {user && (
                <li>
                    <NavLink to={''} className={inActive} onClick={logout}>
                        Logout
                    </NavLink>
                </li>
            )}

            {/* Cart */}
            <li>
                <NavLink to={'/cart'} className={Hover}>
                    <FaShoppingCart/>[{cartItems.length}]
                </NavLink>
            </li>
        </ul>
    );

    return (
        <nav className="bg-blue-900 sticky top-0 z-50 hidden lg:block px-6 py-4">
            {/* Main Container */}
            <div className="lg:grid grid-cols-7 gap-8 items-center">

                {/* Left Section */}
                <div className="text-center">
                    <Link to={'/'}>
                        <h2 className="font-bold text-white text-2xl">Store</h2>
                    </Link>
                </div>

                {/* Center Section (Nav Links) */}
                <div className="col-span-4 flex justify-center">
                    {navList}
                </div>

                {/* Right Section (Search Bar) */}
                <div className="col-span-2 flex justify-end">
                    <SearchBar />
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
