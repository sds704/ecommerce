import { useContext } from "react";
import Layout from "../../components/layout/Layout";
import myContext from "../../context/myContext";
import Loader from "../../components/loader/Loader";

const UserDashboard = () => {
    // Get user from localStorage
    const user = JSON.parse(localStorage.getItem('users'));

    const context = useContext(myContext);
    const { loading, allOrders, allProducts } = context;

    // Filter orders by user ID
    const userOrders = allOrders.filter((order) => {
        console.log("equal", order.user._id, user._id);
        return order.user._id === user._id;
    });

    console.log("users order", userOrders);
    console.log("all orders", allOrders);

    return (
        <Layout>
            <div className="container mx-auto px-4 py-5">
                {/* Top */}
                <div className="top">
                    <div className="bg-blue-50 py-5 rounded-xl border border-blue-100">
                        {/* User Image */}
                        <div className="flex justify-center">
                            <img src="https://cdn-icons-png.flaticon.com/128/2202/2202112.png" alt="User Avatar" />
                        </div>
                        {/* User Details */}
                        <div className="">
                            <h1 className="text-center text-lg">
                                <span className="font-bold">Name: </span>
                                {user?.name}
                            </h1>
                            <h1 className="text-center text-lg">
                                <span className="font-bold">Email: </span>
                                {user?.email}
                            </h1>
                            <h1 className="text-center text-lg">
                                <span className="font-bold">Role: </span>
                                {user?.role}
                            </h1>
                        </div>
                    </div>
                </div>

                {/* Bottom */}
                <div className="bottom">
                    <div className="mx-auto my-4 max-w-6xl px-2 md:my-6 md:px-0">
                        {/* Order Details Title */}
                        <h2 className="text-2xl lg:text-3xl font-bold">Order Details</h2>

                        {/* Loader */}
                        <div className="flex justify-center relative top-10">
                            {loading && <Loader />}
                        </div>

                        {/* Orders List */}
                        {!loading && userOrders.map((order, index) => {
                            const { _id, products, totalAmount, addressInfo, paymentMethod, orderStatus, orderDate } = order;

                            return (
                                <div key={index} className="mt-5 grid lg:grid-cols-4  rounded-xl border border-blue-100">
                                    {/* Order Summary */}
                                    <div className=" border-r border-blue-100 bg-blue-50 rounded-xl w-full">
                                        <div className="p-8">
                                            <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-1">
                                                <div className="mb-4">
                                                    <div className="text-sm font-semibold text-black">Order Id</div>
                                                    <div className="text-sm font-medium text-gray-900">#{_id.slice(0, 10)}</div>
                                                </div>
                                                <div className="mb-4">
                                                    <div className="text-sm font-semibold">Date</div>
                                                    <div className="text-sm font-medium text-gray-900">{orderDate.slice(0, 10)}</div>
                                                </div>
                                                <div className="mb-4">
                                                    <div className="text-sm font-semibold">Total Amount</div>
                                                    <div className="text-sm font-medium text-gray-900">₹ {totalAmount}</div>
                                                </div>
                                                <div className="mb-4">
                                                    <div className="text-sm font-semibold">Order Status</div>
                                                    {orderStatus === 'pending' ?
                                                        <div className="text-sm font-medium text-red-800 first-letter:uppercase">{orderStatus}</div>
                                                        : <div className="text-sm font-medium text-green-800 first-letter:uppercase">{orderStatus}</div>
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
                                                                            className="h-40 w-40 rounded-lg border border-gray-200 object-contain"
                                                                            src={productImageUrl}
                                                                            alt={title}
                                                                        />
                                                                    </div>
                                                                    <div className="ml-5 flex flex-col justify-between">
                                                                        <div className="flex-1">
                                                                            <p className="text-sm font-bold text-gray-900">{title}</p>
                                                                            <p className="mt-1.5 text-sm font-medium text-gray-500">{category}</p>
                                                                            <p className="mt-1.5 text-sm font-medium text-gray-700">{product.size || "L"}</p>
                                                                        </div>
                                                                        <p className="mt-4 text-sm font-medium text-gray-500">x {product.quantity}</p>
                                                                    </div>
                                                                </div>
                                                                <div className="ml-auto flex flex-col items-end justify-between">
                                                                    <p className="text-right text-sm font-bold text-gray-900">₹ {price}</p>
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

                                    {/* address info here */}
                                    <div className="border-l border-blue-gray-100 my-6 px-6 py-2">
                                        <h1 className="text-sm text-main font-bold">Delivery Address :</h1>
                                        <div className="text-sm text-border py-2">
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
                    </div>
                </div>
            </div>
        </Layout>
    );
}

export default UserDashboard;
