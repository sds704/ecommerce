import { useContext, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import myContext from "../../context/myContext";
import Loader from "../loader/Loader";
import { deleteDoc, doc } from "firebase/firestore";
import { fireDB } from "../../firebase/FirebaseConfig";
import toast from "react-hot-toast";

const ProductDetail = () => {
    const context = useContext(myContext);
    const { loading, setLoading, getAllProduct, getAllProductFunction, deleteProduct, getAllUser } = context;
    // console.log(getAllProduct)

    // navigate 
    const navigate = useNavigate();

    //filters
    const [categoryFilter, setCategoryFilter] = useState("");
    const [vendorFilter, setVendorFilter] = useState("");
    const [priceFilter, setPriceFilter] = useState("");
    const [searchTerm, setSearchTerm] = useState("");


    // Pagination
    const [currentPage, setCurrentPage] = useState(1);
    const productsPerPage = 10;

    // filteration logic
    const filteredProducts = getAllProduct.filter((item) => {
        console.log("all product item : ", item)
        return (
            (categoryFilter ? item.category === categoryFilter : true) &&
            (vendorFilter ? item.owner === vendorFilter : true) &&
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
        <div>
            <div className="filter-main p-2">
                {/* Filters */}
                <div className="flex flex-col md:flex-row md:justify-center md:mb-1  gap-1 md:py-2">

                    <input
                        type="text"
                        placeholder="Search Products"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="border rounded p-2 mb-4 md:mb-0 mr-2 outline-none shadow-lg"
                    />

                    <select
                        value={categoryFilter}
                        onChange={(e) => setCategoryFilter(e.target.value)}
                        className="border rounded p-2 mr-2 outline-none shadow-lg"
                    >
                        <option value="" disabled>Categories</option>
                        {/* Add your categories here */}
                        <option value="shirt">Shirt</option>
                        <option value="jacket">Jacket</option>
                        <option value="jeans">Jeans</option>
                        <option value="T-shirt">T-shirt</option>
                        <option value="lehenga">Lehenga</option>
                        <option value="frock">Frock</option>
                        <option value="saree">Saree</option>
                        {/* ... other categories */}
                    </select>

                    <select
                        value={vendorFilter}
                        onChange={(e) => setVendorFilter(e.target.value)}
                        className="border rounded p-2 mr-2 outline-none shadow-lg"
                    >
                        {/* add your vendors here ..... */}
                        <option value="" disabled>Vendors</option>
                        {getAllUser.map((user) => {
                            if (user.role === "vendor") {
                                return <option key={user.id} value={user.uid}>{user.name}</option>;
                            }
                            return null;
                        })}
                    </select>

                    <select
                        value={priceFilter}
                        onChange={(e) => setPriceFilter(e.target.value)}
                        className="border rounded p-2 outline-none shadow-lg"
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
            </div>


            {/* Loading  */}
            <div className="flex justify-center relative top-20">
                {loading && <Loader />}
            </div>

            {/* table  */}
            <div className="w-full  my-5 p-4">

                <table className="w-full text-left border border-collapse sm:border-separate border-blue-100 text-blue-400" >

                    <tbody>
                        <tr>
                            <th scope="col" className="h-12 px-6 text-md border-l first:border-l-0 border-blue-100 text-slate-700 bg-slate-100 font-bold fontPara">S.No.</th>
                            <th scope="col" className="h-12 px-6 text-md border-l first:border-l-0 border-blue-100 text-slate-700 bg-slate-100 font-bold fontPara">Image</th>
                            <th scope="col" className="h-12 px-6 text-md font-bold fontPara border-l first:border-l-0 border-blue-100 text-slate-700 bg-slate-100">Title</th>
                            <th scope="col" className="h-12 px-6 text-md font-bold fontPara border-l first:border-l-0 border-blue-100 text-slate-700 bg-slate-100">Quantity</th>
                            <th scope="col" className="h-12 px-6 text-md font-bold fontPara border-l first:border-l-0 border-blue-100 text-slate-700 bg-slate-100">Price</th>
                            <th scope="col" className="h-12 px-6 text-md font-bold fontPara border-l first:border-l-0 border-blue-100 text-slate-700 bg-slate-100">Category</th>
                            <th scope="col" className="h-12 px-6 text-md font-bold fontPara border-l first:border-l-0 border-blue-100 text-slate-700 bg-slate-100"> Date</th>
                            <th scope="col" className="h-12 px-6 text-md font-bold fontPara border-l first:border-l-0 border-blue-100 text-slate-700 bg-slate-100">Action</th>
                            <th scope="col" className="h-12 px-6 text-md font-bold fontPara border-l first:border-l-0 border-blue-100 text-slate-700 bg-slate-100">Action</th>
                        </tr>
                        {currentProducts.map((item, index) => {
                            const { id, title, quantity, price, category, date, productImageUrl } = item;
                            return (
                                <tr key={index} className="text-blue-300">
                                    <td className="h-12 px-6 text-md transition duration-300 border-t border-l first:border-l-0 border-blue-100 stroke-slate-500 text-slate-500">
                                        {index + 1}.
                                    </td>
                                    <td className="h-12 px-6 text-md transition duration-300 border-t border-l first:border-l-0 border-blue-100 stroke-slate-500 text-slate-500 first-letter:uppercase">
                                        <div className="flex justify-center">
                                            <img className="w-20" src={productImageUrl} alt="" />
                                        </div>
                                    </td>
                                    <td className="h-12 px-6 text-md transition duration-300 border-t border-l first:border-l-0 border-blue-100 stroke-slate-500 text-slate-500 first-letter:uppercase">
                                        {truncateTitle(title,16)}
                                    </td>
                                    <td className="h-12 px-6 text-md transition duration-300 border-t border-l first:border-l-0 border-blue-100 stroke-slate-500 text-slate-500 text-center">
                                        {quantity}
                                    </td>
                                    <td className="h-12 px-6 text-md transition duration-300 border-t border-l first:border-l-0 border-blue-100 stroke-slate-500 text-slate-500 first-letter:uppercase">
                                        ₹{price}
                                    </td>
                                    <td className="h-12 px-6 text-md transition duration-300 border-t border-l first:border-l-0 border-blue-100 stroke-slate-500 text-slate-500 first-letter:uppercase">
                                        {category}
                                    </td>
                                    <td className="h-12 px-6 text-md transition duration-300 border-t border-l first:border-l-0 border-blue-100 stroke-slate-500 text-slate-500 first-letter:uppercase">
                                        {date}
                                    </td>
                                    <td onClick={() => navigate(`/updateproduct/${id}`)} className="h-12 px-6 text-md transition duration-300 border-t border-l first:border-l-0 border-blue-100 stroke-slate-500 text-slate-500 text-green-500 cursor-pointer">
                                        Edit
                                    </td>
                                    <td onClick={() => deleteProduct(id)} className="h-12 px-6 text-md transition duration-300 border-t border-l first:border-l-0 border-blue-100 stroke-slate-500 text-slate-500 text-red-500 cursor-pointer">
                                        Delete
                                    </td>
                                </tr>
                            );
                        })}
                    </tbody>
                </table>
            </div>

            {/* Pagination */}
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
        </div>
    );
}

export default ProductDetail;
