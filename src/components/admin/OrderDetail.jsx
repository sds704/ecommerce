import { useContext, useState } from "react";
import myContext from "../../context/myContext";

const OrderDetail = () => {
    const context = useContext(myContext);
    const { getAllOrder, orderDelete } = context;

    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 10;

    const flattenedOrders = getAllOrder.flatMap(order => order.cartItems.map(item => ({
        ...item,
        orderId: order.id,
        status: order.status,
        name: order.addressInfo.name,
        address: order.addressInfo.address,
        pincode: order.addressInfo.pincode,
        phoneNumber: order.addressInfo.mobileNumber,
        email: order.email,
        date: order.date
    })));

    const totalPages = Math.ceil(flattenedOrders.length / itemsPerPage);
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    const paginatedOrders = flattenedOrders.slice(startIndex, endIndex);

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

    const handlePageChange = (page) => {
        setCurrentPage(page);
    };

    return (
        <div>
            <div>
                <div className="py-5">
                    <h1 className="text-xl text-blue-300 font-bold text-center">All Orders</h1>
                </div>
                <div className="w-full overflow-x-auto">
                    <table className="w-full text-left border border-collapse sm:border-separate border-blue-100 text-blue-400">
                        <thead>
                            <tr>
                                <th className="h-12 px-6 text-md border-l first:border-l-0 border-blue-100 text-slate-700 bg-slate-100 font-bold">S.No.</th>
                                <th className="h-12 px-6 text-md border-l first:border-l-0 border-blue-100 text-slate-700 bg-slate-100 font-bold">Order Id</th>
                                <th className="h-12 px-6 text-md border-l first:border-l-0 border-blue-100 text-slate-700 bg-slate-100 font-bold">Image</th>
                                <th className="h-12 px-6 text-md border-l first:border-l-0 border-blue-100 text-slate-700 bg-slate-100 font-bold">Title</th>
                                <th className="h-12 px-6 text-md border-l first:border-l-0 border-blue-100 text-slate-700 bg-slate-100 font-bold">Category</th>
                                <th className="h-12 px-6 text-md border-l first:border-l-0 border-blue-100 text-slate-700 bg-slate-100 font-bold">Price</th>
                                <th className="h-12 px-6 text-md border-l first:border-l-0 border-blue-100 text-slate-700 bg-slate-100 font-bold">Quantity</th>
                                <th className="h-12 px-6 text-md border-l first:border-l-0 border-blue-100 text-slate-700 bg-slate-100 font-bold">Total Price</th>
                                <th className="h-12 px-6 text-md border-l first:border-l-0 border-blue-100 text-slate-700 bg-slate-100 font-bold">Status</th>
                                <th className="h-12 px-6 text-md border-l first:border-l-0 border-blue-100 text-slate-700 bg-slate-100 font-bold">Name</th>
                                <th className="h-12 px-6 text-md border-l first:border-l-0 border-blue-100 text-slate-700 bg-slate-100 font-bold">Address</th>
                                <th className="h-12 px-6 text-md border-l first:border-l-0 border-blue-100 text-slate-700 bg-slate-100 font-bold">Pincode</th>
                                <th className="h-12 px-6 text-md border-l first:border-l-0 border-blue-100 text-slate-700 bg-slate-100 font-bold">Phone Number</th>
                                <th className="h-12 px-6 text-md border-l first:border-l-0 border-blue-100 text-slate-700 bg-slate-100 font-bold">Email</th>
                                <th className="h-12 px-6 text-md border-l first:border-l-0 border-blue-100 text-slate-700 bg-slate-100 font-bold">Date</th>
                                <th className="h-12 px-6 text-md border-l first:border-l-0 border-blue-100 text-slate-700 bg-slate-100 font-bold">Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {paginatedOrders.map((item, index) => (
                                <tr key={index} className="text-blue-300">
                                    <td className="h-12 px-6 text-md border-t border-l first:border-l-0 border-blue-100 text-slate-500">{startIndex + index + 1}</td>
                                    <td className="h-12 px-6 text-md border-t border-l first:border-l-0 border-blue-100 text-slate-500">{item.orderId}</td>
                                    <td className="h-12 px-6 text-md border-t border-l first:border-l-0 border-blue-100 text-slate-500"><img src={item.productImageUrl} alt="img" /></td>
                                    <td className="h-12 px-6 text-md border-t border-l first:border-l-0 border-blue-100 text-slate-500">{item.title}</td>
                                    <td className="h-12 px-6 text-md border-t border-l first:border-l-0 border-blue-100 text-slate-500">{item.category}</td>
                                    <td className="h-12 px-6 text-md border-t border-l first:border-l-0 border-blue-100 text-slate-500">₹{item.price}</td>
                                    <td className="h-12 px-6 text-md border-t border-l first:border-l-0 border-blue-100 text-slate-500">{item.quantity}</td>
                                    <td className="h-12 px-6 text-md border-t border-l first:border-l-0 border-blue-100 text-slate-500">₹{item.price * item.quantity}</td>
                                    <td className="h-12 px-6 text-md border-t border-l first:border-l-0 border-blue-100 text-slate-500">{item.status}</td>
                                    <td className="h-12 px-6 text-md border-t border-l first:border-l-0 border-blue-100 text-slate-500">{item.name}</td>
                                    <td className="h-12 px-6 text-md border-t border-l first:border-l-0 border-blue-100 text-slate-500">{item.address}</td>
                                    <td className="h-12 px-6 text-md border-t border-l first:border-l-0 border-blue-100 text-slate-500">{item.pincode}</td>
                                    <td className="h-12 px-6 text-md border-t border-l first:border-l-0 border-blue-100 text-slate-500">{item.phoneNumber}</td>
                                    <td className="h-12 px-6 text-md border-t border-l first:border-l-0 border-blue-100 text-slate-500">{item.email}</td>
                                    <td className="h-12 px-6 text-md border-t border-l first:border-l-0 border-blue-100 text-slate-500">{item.date}</td>
                                    <td onClick={() => orderDelete(item.orderId)} className="h-12 px-6 text-md border-t border-l first:border-l-0 border-blue-100 text-red-500 cursor-pointer">Delete</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
                {/* Pagination Controls */}
            <div className="pagination-controls my-4 flex justify-center">
                <button onClick={handlePrevPage} disabled={currentPage === 1} className="mx-2 p-2 bg-blue-500 text-white rounded">
                    Prev
                </button>
                {[...Array(totalPages)].map((_, index) => (
                    <button
                        key={index}
                        onClick={() => handlePageChange(index + 1)}
                        className={`mx-1 p-2 ${currentPage === index + 1 ? "bg-blue-800" : "bg-blue-500"} text-white rounded`}
                    >
                        {index + 1}
                    </button>
                ))}
                <button onClick={handleNextPage} disabled={currentPage === totalPages} className="mx-2 p-2 bg-blue-500 text-white rounded">
                    Next
                </button>
            </div>
            </div>
        </div>
    );
}

export default OrderDetail;
