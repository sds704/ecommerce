import {
  BrowserRouter as Router,
  Route,
  Routes,
} from "react-router-dom";
import HomePage from "./pages/home/HomePage";
import NoPage from "./pages/noPage/NoPage";
import ProductInfo from "./pages/productInfo/ProductInfo";
import ScrollTop from "./components/scrollTop/ScrollTop";
import CartPage from "./pages/cart/CartPage";
import AllProduct from "./pages/allProduct/AllProduct";
import Signup from "./pages/registration/Signup";
import Login from "./pages/registration/Login";
import UserDashboard from "./pages/user/UserDashboard";
// import VendorDashboard from "./pages/vendor/VendorDashboard";
// import AddProductPage from "./pages/admin/AddProductPage";
// import AddProductPageRt from "./pages/vendor/AddProductPageV";
// import UpdateProductPage from "./pages/admin/UpdateProductPage";
import MyState from "./context/myState";
import { Toaster } from "react-hot-toast";
import { ProtectedRouteForUser } from "./protectedRoute/ProtectedRouteForUser";
import { ProtectedRouteForAdmin } from "./protectedRoute/ProtectedRouteForAdmin";
import { ProtectedRouteForVendor } from "./protectedRoute/ProtectedRouteForVendor"
import CategoryPage from "./pages/category/CategoryPage";
// import AdminDashboard from "./pages/admin/AdminDashboard";
// import Category from "./pages/admin/Category";
// import Products from "./pages/admin/Products";
// import AddProduct from "./pages/admin/AddProduct";
// import Users from "./pages/admin/Users";
// import Orders from "./pages/admin/Orders";
// import AddProductPageV from "./pages/vendor/AddProductPageV";
import UpdateProduct from "./pages/vendor/UpdateProduct";
import AddProduct from "./pages/vendor/AddProduct";
import Products from "./pages/vendor/Products";
import Users from "./pages/vendor/Users";
import Orders from "./pages/vendor/Orders";
import Dashboard from "./pages/vendor/Dashboard";
import Category from "./pages/vendor/Category";
import AdminDashboard from "./pages/admin/AdminDashboard";
import AdminCategory from "./pages/admin/AdminCategory";
import AdminUser from "./pages/admin/AdminUser";
import AdminProducts from "./pages/admin/AdminProducts";


const App = () => {
  return (
    <MyState>
      <Router>
        <ScrollTop />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/allproduct" element={<AllProduct />} />
          <Route path="/productinfo/:id" element={<ProductInfo />} />
          <Route path="/cart" element={<CartPage />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/login" element={<Login />} />
          <Route path="/category/:categoryname" element={<CategoryPage />} />
          <Route path="/*" element={<NoPage />} />

          {/* USER */}
          <Route path="/user-dashboard" element={
            <ProtectedRouteForUser>
              <UserDashboard />
            </ProtectedRouteForUser>
          } />

          {/* VENDOR */}
          <Route path="/vendor/dashboard" element={
            <ProtectedRouteForVendor>
              <Dashboard />
            </ProtectedRouteForVendor>
          } />
          <Route path="/vendor/category" element={
            <ProtectedRouteForVendor>
              <Category />
            </ProtectedRouteForVendor>
          } />
          <Route path="/vendor/products" element={
            <ProtectedRouteForVendor>
              <Products />
            </ProtectedRouteForVendor>
          } />
          <Route path="/vendor/addproduct" element={
            <ProtectedRouteForVendor>
              <AddProduct />
            </ProtectedRouteForVendor>
          } />
          <Route path="/vendor/users" element={
            <ProtectedRouteForVendor>
              <Users />
            </ProtectedRouteForVendor>
          } />
          <Route path="/vendor/orders" element={
            <ProtectedRouteForVendor>
              <Orders />
            </ProtectedRouteForVendor>
          } />
          <Route path="/vendor/update-product/:id" element={
            <ProtectedRouteForVendor>
              <UpdateProduct />
            </ProtectedRouteForVendor>
          } />

          {/* ADMIN */}
          <Route path="/admin/dashboard" element={
            <ProtectedRouteForAdmin>
              <AdminDashboard />
            </ProtectedRouteForAdmin>
          } />
          <Route path="/admin/category" element={
            <ProtectedRouteForAdmin>
              <AdminCategory />
            </ProtectedRouteForAdmin>
          } />
          <Route path="/admin/products" element={
            <ProtectedRouteForAdmin>
              <AdminProducts />
            </ProtectedRouteForAdmin>
          } />
          {/* <Route path="/admin/addproduct" element={
            <ProtectedRouteForAdmin>
              <AddProduct />
            </ProtectedRouteForAdmin>
          } /> */}
          <Route path="/admin/users" element={
            <ProtectedRouteForAdmin>
              <AdminUser />
            </ProtectedRouteForAdmin>
          } />
          {/*
          <Route path="/admin/orders" element={
            <ProtectedRouteForAdmin>
              <Orders />
            </ProtectedRouteForAdmin>
          } />
          <Route path="/admin/updateproduct/:id" element={
            <ProtectedRouteForAdmin>
              <UpdateProductPage />
            </ProtectedRouteForAdmin>
          } />
          
          <Route path="/admin/add-productrt" element={
            <ProtectedRouteForVendor>
              <AddProductPageRt />
            </ProtectedRouteForVendor>
          } />
          
           */}
        </Routes>
        <Toaster />
      </Router>
    </MyState>
  );
}

export default App;
