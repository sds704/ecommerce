import { useContext, useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import myContext from "../../context/myContext";
import Loader from "../../components/loader/Loader";
import toast from "react-hot-toast";
import Sidebar from "./Sidebar";
import { TiEdit } from "react-icons/ti";
import { MdDelete } from "react-icons/md";
import axios from 'axios'

const Products = () => {

    const context = useContext(myContext);
    const { loading, setLoading, allProducts, getAllProducts } = context;

    const user = JSON.parse(localStorage.getItem('users'));

    const navigate = useNavigate();

    //filters
    const [categoryFilter, setCategoryFilter] = useState("");
    const [priceFilter, setPriceFilter] = useState("");
    const [searchTerm, setSearchTerm] = useState("");

    const vendorProducts = allProducts.filter((product) => product.ownerId === user._id);


    // Delete product by ID
    const deleteProduct = async (id) => {
        setLoading(true);
        try {
            await axios.delete(`/api/products/${id}`, {
                headers: {
                    Authorization: `Bearer ${user?.token}`
                }
            });
            toast.success("Product deleted Successfully");
            // Refresh the products list
            getAllProducts();
            setLoading(false)
        } catch (error) {
            toast.error("Failed to delete the product.");
            setLoading(false)
        }
    };

    // filteration logic
    const filteredProducts = vendorProducts.filter((item) => {
        console.log("all product item : ", item)
        return (
            (categoryFilter ? item.category.toLowerCase() === categoryFilter.toLowerCase() : true) &&
            (priceFilter ? item.price <= parseFloat(priceFilter) : true) &&
            (searchTerm ? item.title.toLowerCase().includes(searchTerm.toLowerCase()) : true)
        );
    });

    // Pagination
    const [currentPage, setCurrentPage] = useState(1);
    const productsPerPage = 10;

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
        <Sidebar>
            <div className="w-full min-h-screen bg-dry px-6 py-5">
                {/* Filters */}
                <div className="flex flex-col md:flex-row md:justify-center items-center md:mb-5 m-4 gap-2">

                    <input
                        type="text"
                        placeholder="Search Products"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="border rounded p-2 outline-none w-60 bg-main text-text"
                    />

                    <select
                        value={categoryFilter}
                        onChange={(e) => setCategoryFilter(e.target.value)}
                        className="border rounded p-2 outline-none w-60 bg-main text-text"
                    >
                        <option value="" disabled>Categories</option>
                        <option value="shirt">Shirt</option>
                        <option value="jacket">Jacket</option>
                        <option value="jeans">Jeans</option>
                        <option value="t-shirt">T-shirt</option>
                        <option value="lehenga">Lehenga</option>
                        <option value="frock">Frock</option>
                        <option value="saree">Saree</option>
                    </select>

                    <select
                        value={priceFilter}
                        onChange={(e) => setPriceFilter(e.target.value)}
                        className="border rounded p-2 outline-none w-60 bg-main text-text"
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

                {/* Loading  */}
                <div className="flex justify-center relative top-20">
                    {loading && <Loader />}
                </div>

                {/*product table */}
                <div className="w-full overflow-x-auto mb-5">
                    <table className="w-full text-left border border-collapse border-border text-text bg-main">
                        <tbody>
                            <tr>
                                <th scope="col" className="h-12 px-2 text-sm md:text-md border-l first:border-l-0 border-border text-text">Id</th>
                                <th scope="col" className="h-12 px-2 text-sm md:text-md border-l first:border-l-0 border-border text-text">Image</th>
                                <th scope="col" className="h-12 px-2 text-sm md:text-md border-l first:border-l-0 border-border text-text">Title</th>
                                <th scope="col" className="h-12 px-2 text-sm md:text-md border-l first:border-l-0 border-border text-text">Quantity</th>
                                <th scope="col" className="h-12 px-2 text-sm md:text-md border-l first:border-l-0 border-border text-text">Price</th>
                                <th scope="col" className="h-12 px-2 text-sm md:text-md border-l first:border-l-0 border-border text-text">Category</th>
                                {/* <th scope="col" className="h-12 px-2 text-sm md:text-md border-l first:border-l-0 border-border text-text bg-dry">Date</th> */}
                                <th scope="col" className="h-12 px-2 text-sm md:text-md border-l first:border-l-0 border-border text-center text-text">Action</th>
                            </tr>
                            {filteredProducts.map((item, index) => {
                                // console.log(item)
                                const { _id, title, quantity, price, category, productImageUrl } = item;
                                return (
                                    <tr key={index} className="text-text">
                                        <td className="h-12 px-2 text-sm md:text-md transition duration-300 border-t border-l first:border-l-0 border-border text-text">{index + 1}</td>
                                        <td className="h-12 px-2 text-sm md:text-md transition duration-300 border-t border-l first:border-l-0 border-border  text-text py-1">
                                            <div className="flex justify-center">
                                                <img className="w-16 md:w-18" src={productImageUrl} alt={title} />
                                            </div>
                                        </td>
                                        <td className="h-12 px-2 text-sm md:text-md transition duration-300 border-t border-l first:border-l-0 border-border stroke-slate-500 text-text first-letter:uppercase">
                                            {truncateTitle(title, 8)}
                                        </td>
                                        <td className="h-12 px-2 text-sm md:text-md transition duration-300 border-t border-l first:border-l-0 border-border text-text text-center">{quantity}</td>
                                        <td className="h-12 px-2 text-sm md:text-md transition duration-300 border-t border-l first:border-l-0 border-border  text-text">₹{price}</td>
                                        <td className="h-12 px-2 text-sm md:text-md transition duration-300 border-t border-l first:border-l-0 border-border  text-text first-letter:uppercase">{category}</td>
                                        {/* <td className="h-12 px-2 text-sm md:text-md transition duration-300 border-t border-l first:border-l-0 border-border  text-text first-letter:uppercase">{date}</td> */}
                                        <td className="h-12 px-2  text-sm md:text-md transition duration-300 border border-border  text-text first-letter:uppercase text-center">
                                            <button
                                                onClick={() => navigate(`/vendor/update-product/${_id}`)}
                                                className="text-green-800 border border-border p-2 rounded m-1"><TiEdit /></button>
                                            <button
                                                onClick={() => deleteProduct(_id)}
                                                className="bg-subMain p-2 rounded m-1"><MdDelete /></button>
                                        </td>
                                    </tr>
                                );
                            })}
                        </tbody>
                    </table>
                </div>


                {/* Pagination */}
                {/* <div className="flex justify-center my-4">
                <button
                    onClick={handlePrevPage}
                    disabled={currentPage === 1}
                    className="px-4 py-2 mx-1 border rounded bg-blue-200"
                >
                    Prev
                </button>
                {paginationRange().map((pageNumber) => (
                    <button
                        key={pageNumber}
                        onClick={() => handlePageChange(pageNumber)}
                        className={`px-4 py-2 mx-1 border rounded ${currentPage === pageNumber ? 'bg-blue-400' : 'bg-blue-200'}`}
                    >
                        {pageNumber}
                    </button>
                ))}
                <button
                    onClick={handleNextPage}
                    disabled={currentPage === totalPages}
                    className="px-4 py-2 mx-1 border rounded bg-blue-200"
                >
                    Next
                </button>
            </div> */}
            </div>
        </Sidebar>
    );
}

export default Products;
