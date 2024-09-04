import { useNavigate } from "react-router";
import Layout from "../../components/layout/Layout";
import { useContext, useEffect, useState } from "react";
import myContext from "../../context/myContext";
import { useDispatch, useSelector } from "react-redux";
import toast from "react-hot-toast";
import { addToCart, deleteFromCart } from "../../redux/cartSlice";
import Loader from "../../components/loader/Loader";

const AllProduct = () => {
    const navigate = useNavigate();

    const context = useContext(myContext);
    const { loading, allCategories, allUsers, allProducts } = context;

    const allVendors = allUsers.filter((item) => item.role === "vendor")
    const cartItems = useSelector((state) => state.cart);
    const dispatch = useDispatch();

    //filters
    const [categoryFilter, setCategoryFilter] = useState("");
    const [vendorFilter, setVendorFilter] = useState("");
    const [priceFilter, setPriceFilter] = useState("");
    const [searchTerm, setSearchTerm] = useState("");

    // Pagination
    const [currentPage, setCurrentPage] = useState(1);
    const productsPerPage = 12;

    const addCart = (item) => {
        // console.log(item)
        dispatch(addToCart(item));
        toast.success("Added to cart")
    }

    const deleteCart = (item) => {
        dispatch(deleteFromCart(item));
        toast.success("Deleted from cart")
    }

    const handleCategoryChange = (e) => {
        setCategoryFilter(e.target.value);
    };

    const handleVendorChange = (e) => {
        setVendorFilter(e.target.value);
    };

    const handlePriceChange = (e) => {
        setPriceFilter(e.target.value);
    };

    // filteration logic
    const filteredProducts = allProducts.filter((item) => {
        console.log("all product item : ", item)
        return (
            (categoryFilter ? item.category === categoryFilter : true) &&
            (vendorFilter ? item.ownerId === vendorFilter : true) &&
            (priceFilter ? item.price <= parseFloat(priceFilter) : true) &&
            (searchTerm ? item.title.toLowerCase().includes(searchTerm.toLowerCase()) : true)
        );
    });

    // Pagination logic
    const indexOfLastProduct = currentPage * productsPerPage;
    const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
    const currentProducts = filteredProducts.slice(indexOfFirstProduct, indexOfLastProduct);
    const totalPages = Math.ceil(filteredProducts.length / productsPerPage);

    const handlePageChange = (pageNumber) => {
        setCurrentPage(pageNumber);
    };

    const handleNextPage = () => {
        if (currentPage < totalPages) {
            setCurrentPage(currentPage + 1);
        }
    };

    const handlePrevPage = () => {
        if (currentPage > 1) {
            setCurrentPage(currentPage - 1);
        }
    };

    // Pagination tab range
    const paginationRange = () => {
        const totalVisibleTabs = 6;
        const start = Math.max(1, currentPage - Math.floor(totalVisibleTabs / 2));
        const end = Math.min(totalPages, start + totalVisibleTabs - 1);
        return Array.from({ length: end - start + 1 }, (_, index) => start + index);
    };

    //title max limit
    const truncateTitle = (title, maxLength) => {
        if (title.length <= maxLength) {
            return title;
        }
        return title.substring(0, maxLength) + '...';
    };

    return (
        <Layout>
            <div className="py-8">
                {/* Heading  */}
                <div className="">
                    <h1 className=" text-center mb-5 text-lg text-gray-400 font-semibold">Filter</h1>
                </div>

                {/* Filters */}
                <div className="flex flex-col md:flex-row md:justify-center md:mb-5 m-4 gap-1">

                    <input
                        type="text"
                        placeholder="Search Products..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="border bg-blue-50 rounded p-2 mb-4 md:mb-0 mr-2 outline-none shadow-md"
                    />

                    <select
                        value={categoryFilter}
                        onChange={handleCategoryChange}
                        className="border shadow-md bg-blue-50 rounded p-2 mr-2 outline-none"
                    >
                        <option value="" disabled>Categories</option>
                        {
                            allCategories.map((item) => (
                                <option key={item._id} value={item.type}>{item.type}</option>
                            ))
                        }
                    </select>

                    <select
                        value={vendorFilter}
                        onChange={handleVendorChange}
                        className="border shadow-md bg-blue-50 rounded p-2 mr-2 outline-none"
                    >
                        {/* add your vendors here ..... */}
                        <option value="" disabled>Vendors</option>
                        {allVendors.map((user) => {
                            return <option key={user._id} value={user._id}>{user.name}</option>;
                        })}
                    </select>

                    <select
                        value={priceFilter}
                        onChange={handlePriceChange}
                        className="border shadow-md bg-blue-50 rounded p-2 outline-none"
                    >
                        <option value="" disabled>Price</option>
                        <option value="500">Under ₹500</option>
                        <option value="1000">Under ₹1000</option>
                        <option value="2000">Under ₹2000</option>
                        <option value="3000">Under ₹3000</option>
                        <option value="4000">Under ₹4000</option>
                        <option value="5000">Under ₹5000</option>
                        <option value="10000">Under ₹10000</option>
                        {/* ... other price ranges */}
                    </select>
                </div>

                {/* main  */}
                <section className="text-gray-600 body-font">
                    <div className="container px-5 lg:px-0 py-5 mx-auto">
                        <div className="flex justify-center">
                            {loading && <Loader />}
                        </div>
                        <div className="flex flex-wrap -m-4">
                            {currentProducts.map((item, index) => {
                                const { id, title, price, productImageUrl } = item
                                return (
                                    <div key={index} className="p-4 w-full md:w-1/4">
                                        <div className="h-full border border-gray-300 rounded-xl overflow-hidden shadow-md cursor-pointer">
                                            <img
                                                onClick={() => navigate(`/productinfo/${id}`)}
                                                className="lg:h-80  h-96 w-full"
                                                src={productImageUrl}
                                                alt="blog"
                                            />
                                            <div className="p-6">
                                                <h2 className="tracking-widest text-xs title-font font-medium text-gray-400 mb-1">
                                                    E-bharat
                                                </h2>
                                                <h1 className="title-font text-lg font-medium text-gray-900 mb-3">
                                                    {truncateTitle(title, 20)}
                                                </h1>
                                                <h1 className="title-font text-lg font-medium text-gray-900 mb-3">
                                                    ₹{price}
                                                </h1>

                                                <div
                                                    className="flex justify-center ">
                                                    {cartItems.some((p) => p._id === item._id)

                                                        ?
                                                        <button
                                                            onClick={() => deleteCart(item)}
                                                            className=" bg-red-800 hover:bg-red-900 w-full text-white py-[4px] rounded-lg font-bold">
                                                            Delete From Cart
                                                        </button>

                                                        :

                                                        <button
                                                            onClick={() => addCart(item)}
                                                            className=" bg-green-800 hover:bg-green-900 w-full text-white py-[4px] rounded-lg font-bold">
                                                            Add To Cart
                                                        </button>
                                                    }
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                )
                            })}
                        </div>
                    </div>
                </section>

                {/* Pagination */}
                {filteredProducts.length > 0 &&
                    (
                        <div className="flex justify-center my-4">
                            <button
                                onClick={handlePrevPage}
                                disabled={currentPage === 1}
                                className="px-4 py-2 mx-1 border rounded bg-blue-50"
                            >
                                Prev
                            </button>
                            {paginationRange().map((pageNumber) => (
                                <button
                                    key={pageNumber}
                                    onClick={() => handlePageChange(pageNumber)}
                                    className={`px-4 py-2 mx-1 border rounded ${currentPage === pageNumber ? 'bg-blue-100' : 'bg-blue-50'}`}
                                >
                                    {pageNumber}
                                </button>
                            ))}
                            <button
                                onClick={handleNextPage}
                                disabled={currentPage === totalPages}
                                className="px-4 py-2 mx-1 border rounded bg-blue-50"
                            >
                                Next
                            </button>
                        </div>
                    )}

            </div>
        </Layout >
    );
}

export default AllProduct;