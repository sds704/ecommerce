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
import VendorDashboard from "./pages/vendor/VendorDashboard";
import AddProductPage from "./pages/admin/AddProductPage";
import AddProductPageRt from "./pages/vendor/AddProductPageV";
import UpdateProductPage from "./pages/admin/UpdateProductPage";
import UpdateProductPageRt from "./pages/vendor/UpdateProductPageRt";
import MyState from "./context/myState";
import { Toaster } from "react-hot-toast";
import { ProtectedRouteForUser } from "./protectedRoute/ProtectedRouteForUser";
import { ProtectedRouteForAdmin } from "./protectedRoute/ProtectedRouteForAdmin";
import { ProtectedRouteForVendor } from "./protectedRoute/ProtectedRouteForVendor"
import CategoryPage from "./pages/category/CategoryPage";
import AdminDashboard from "./pages/admin/AdminDashboard";
import Category from "./pages/admin/Category";
import Products from "./pages/admin/Products";
import AddProduct from "./pages/admin/AddProduct";
import Users from "./pages/admin/Users";
import Orders from "./pages/admin/Orders";
import CategoryV from "./pages/vendor/CategoryV";
import AddProductPageV from "./pages/vendor/AddProductPageV";
import AddProductV from "./pages/vendor/AddProductV";
import ProductsV from "./pages/vendor/ProductsV";
import UsersV from "./pages/vendor/UsersV";
import OrdersV from "./pages/vendor/OrdersV";



const App = () => {
  return (
    <MyState>
      <Router>
        <ScrollTop />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/*" element={<NoPage />} />
          <Route path="/productinfo/:id" element={<ProductInfo />} />
          <Route path="/cart" element={<CartPage />} />
          <Route path="/allproduct" element={<AllProduct />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/login" element={<Login />} />
          <Route path="/category/:categoryname" element={<CategoryPage />} />  {/* category Page route  */}
          <Route path="/user-dashboard" element={
            <ProtectedRouteForUser>
              <UserDashboard />
            </ProtectedRouteForUser>
          } />
          <Route path="/vendor" element={
            <ProtectedRouteForVendor>
              <VendorDashboard />
            </ProtectedRouteForVendor>
          } />
          <Route path="/vendor/category" element={
            <ProtectedRouteForVendor>
              <CategoryV />
            </ProtectedRouteForVendor>
          } />
          <Route path="/vendor/products" element={
            <ProtectedRouteForVendor>
              <ProductsV />
            </ProtectedRouteForVendor>
          } />
          <Route path="/vendor/addproduct" element={
            <ProtectedRouteForVendor>
              <AddProductV />
            </ProtectedRouteForVendor>
          } />
          <Route path="/vendor/users" element={
            <ProtectedRouteForVendor>
              <UsersV />
            </ProtectedRouteForVendor>
          } />
          <Route path="/vendor/orders" element={
            <ProtectedRouteForVendor>
              <OrdersV />
            </ProtectedRouteForVendor>
          } />
          <Route path="/admin" element={
            <ProtectedRouteForAdmin>
              <AdminDashboard />
            </ProtectedRouteForAdmin>
          } />
          <Route path="/admin/category" element={
            <ProtectedRouteForAdmin>
              <Category />
            </ProtectedRouteForAdmin>
          } />
          <Route path="/admin/products" element={
            <ProtectedRouteForAdmin>
              <Products />
            </ProtectedRouteForAdmin>
          } />
          <Route path="/admin/addproduct" element={
            <ProtectedRouteForAdmin>
              <AddProduct />
            </ProtectedRouteForAdmin>
          } />
          <Route path="/admin/users" element={
            <ProtectedRouteForAdmin>
              <Users />
            </ProtectedRouteForAdmin>
          } />
          <Route path="/admin/orders" element={
            <ProtectedRouteForAdmin>
              <Orders />
            </ProtectedRouteForAdmin>
          } />
          <Route path="/updateproduct/:id" element={
            <ProtectedRouteForAdmin>
              <UpdateProductPage />
            </ProtectedRouteForAdmin>
          } />
          
          <Route path="/add-productrt" element={
            <ProtectedRouteForVendor>
              <AddProductPageRt />
            </ProtectedRouteForVendor>
          } />
          
          <Route path="/updateproduct-retailer/:id" element={
            <ProtectedRouteForVendor>
              <UpdateProductPageRt />
            </ProtectedRouteForVendor>
          } />
        </Routes>
        <Toaster />
      </Router>
    </MyState>
  );
}

export default App;
