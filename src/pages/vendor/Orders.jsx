import { useContext, useState } from "react";
import myContext from "../../context/myContext";
import Sidebar from "./Sidebar";

const Orders = () => {
  const context = useContext(myContext);
  const { loading, allOrders, allProducts } = context;
  const user = JSON.parse(localStorage.getItem('users'));

  // Filter orders to include only those where the vendor (ownerId) matches the logged-in user
  const vendorOrders = allOrders.filter(order =>
    order.products.some(product => product.product.ownerId === user._id)
  );

  // Pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 3;

  // Pagination logic
  const totalPages = Math.ceil(vendorOrders.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const paginatedOrders = vendorOrders.slice(startIndex, endIndex);

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
    <Sidebar>
      <div className="w-full min-h-screen bg-dry p-4">
        <div className="py-5 px-6">
          <h1 className="text-xl text-text font-bold text-left">Vendor Orders</h1>
        </div>

        {/* Orders List */}
        {!loading && paginatedOrders.map((order, index) => {
          const { _id, products, totalAmount, addressInfo, orderStatus, orderDate } = order;

          return (
            <div key={index} className="mt-5 grid lg:grid-cols-4 rounded-xl border border-blue-100">
              {/* Order Summary */}
              <div className="border-r border-blue-100 bg-main rounded-xl w-full">
                <div className="p-8">
                  <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-1">
                    <div className="mb-4">
                      <div className="text-sm text-text font-semibold">User Name</div>
                      <div className="text-sm font-medium text-white"> {user.name}</div>
                    </div>
                    <div className="mb-4">
                      <div className="text-sm text-text font-semibold">User Email</div>
                      <div className="text-sm font-medium text-white"> {user.email}</div>
                    </div>
                    <div className="mb-4">
                      <div className="text-sm font-semibold text-text">Order Id</div>
                      <div className="text-sm font-medium text-white">#{_id.slice(0, 10)}</div>
                    </div>
                    <div className="mb-4">
                      <div className="text-sm font-semibold text-text">Date</div>
                      <div className="text-sm font-medium text-white">{orderDate.slice(0, 10)}</div>
                    </div>
                    <div className="mb-4">
                      <div className="text-sm font-semibold text-text">Total Amount</div>
                      <div className="text-sm font-medium text-white">₹ {totalAmount}</div>
                    </div>
                    <div className="mb-4">
                      <div className="text-sm font-semibold text-text">Order Status</div>
                      {orderStatus === 'pending' ?
                        <div className="text-sm font-medium text-red-800 first-letter:uppercase">{orderStatus}</div>
                        : <div className="text-sm font-medium text-subMain first-letter:uppercase">{orderStatus}</div>
                      }
                    </div>
                  </div>
                </div>
              </div>

              {/* Ordered Products */}
              <div className="lg:col-span-2">
                <div className="p-8">
                  <ul className="-my-7 divide-y divide-gray-200">
                    {products.map((product, i) => {
                      // Find the corresponding product details from allProducts
                      const matchedProduct = allProducts.find(p => p._id === product.product._id);

                      if (matchedProduct) {
                        const { title, category, price, productImageUrl } = matchedProduct;

                        return (
                          <li key={i} className="flex flex-col justify-between space-x-5 py-7 md:flex-row">
                            <div className="flex flex-1 items-stretch">
                              <div className="flex-shrink-0">
                                <img
                                  className="h-40 w-40 rounded-lg border bg-white border-gray-200 object-contain"
                                  src={productImageUrl}
                                  alt={title}
                                />
                              </div>
                              <div className="ml-5 flex flex-col justify-between">
                                <div className="flex-1">
                                  <p className="text-sm font-bold text-white">{title}</p>
                                  <p className="mt-1.5 text-sm font-medium text-text">{category}</p>
                                  <p className="mt-1.5 text-sm font-medium text-text">{product.size || "L"}</p>
                                </div>
                                <p className="mt-4 text-sm font-medium text-text">x {product.quantity}</p>
                              </div>
                            </div>
                            <div className="ml-auto flex flex-col items-end justify-between">
                              <p className="text-right text-sm font-bold text-white">₹ {price}</p>
                            </div>
                          </li>
                        );
                      } else {
                        return null;
                      }
                    })}
                  </ul>
                </div>
              </div>

              {/* Address Information */}
              <div className="border-l border-blue-gray-100 my-6 px-6 py-2">
                <h1 className="text-sm text-white font-bold">Delivery Address:</h1>
                <div className="text-sm text-text py-2">
                  <p>{addressInfo.address}</p>
                  <p>{addressInfo.postalCode}</p>
                  <p>{addressInfo.city}</p>
                  <p>{addressInfo.state}</p>
                  <p>{addressInfo.country}</p>
                  <p>{addressInfo.mobileNumber}</p>
                </div>
              </div>
            </div>
          );
        })}

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
    </Sidebar>
  );
}

export default Orders;
