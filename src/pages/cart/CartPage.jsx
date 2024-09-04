import { useDispatch, useSelector } from "react-redux";
import Layout from "../../components/layout/Layout";
import { Trash } from 'lucide-react'
import { decrementQuantity, deleteFromCart, incrementQuantity, emptyCart, updateSize } from "../../redux/cartSlice";
import toast from "react-hot-toast";
import { useEffect, useState } from "react";
import BuyNowModal from "../../components/buyNowModal/BuyNowModal";
import { Navigate } from "react-router";
import { useNavigate } from "react-router-dom";
import axios from 'axios'

const CartPage = () => {
    const navigate = useNavigate()
    const cartItems = useSelector((state) => state.cart);
    const dispatch = useDispatch();

    const deleteCart = (item) => {
        dispatch(deleteFromCart(item));
        toast.success("Delete cart")
    }

    const handleIncrement = (id) => {
        dispatch(incrementQuantity(id));
    };

    const handleDecrement = (id) => {
        dispatch(decrementQuantity(id));
    };

    // const handleSizeChange = (id, size) => {
    //     dispatch(updateSize({ id, size }));
    // };

    // const cartQuantity = cartItems.length;

    const[productSize, setProductSize] = useState('')
    console.log("product size", productSize)

    const cartItemTotal = cartItems.map(item => item.quantity).reduce((prevValue, currValue) => parseInt(prevValue) + parseInt(currValue), 0);

    const cartTotal = cartItems.map(item => item.price * item.quantity).reduce((prevValue, currValue) => prevValue + currValue, 0);

    useEffect(() => {
        localStorage.setItem('cart', JSON.stringify(cartItems));
    }, [cartItems])

    // user
    const user = JSON.parse(localStorage.getItem('users'))

    // Buy Now Function
    const [addressInfo, setAddressInfo] = useState({
        address: "",
        city: "",
        state: "",
        postalCode: "",
        country: "",
        mobileNumber: "",
    });

    const buyNowFunction = async () => {
        // validation 
        if (addressInfo.city === "" || addressInfo.address === "" || addressInfo.postalCode === "" || addressInfo.mobileNumber === "") {
            return toast.error("All Fields are required");
        }
    
        // Order Info 
        const orderInfo = {
            user: user._id,
            products: cartItems.map(item => ({
                product: item._id,
                quantity: item.quantity,
                size: productSize || "M",  // Default size to "M" if not provided
            })),
            totalAmount: cartTotal,
            addressInfo: addressInfo,
            paymentMethod: "COD",  // Assuming payment method is Cash on Delivery for now
        };
    
        try {
            // Make the API call to create an order
            const response = await axios.post('/api/orders', orderInfo,
                {
                    headers:{
                        Authorization: `Bearer ${user.token}`
                    }
                }
            );
    
            if (response.status === 201) {
                // Clear the cart and reset address info after successful order placement
                dispatch(emptyCart());
                setAddressInfo({
                    address: "",
                    city: "",
                    state: "",
                    postalCode: "",
                    country: "",
                    mobileNumber: "",
                });
                toast.success("Order Placed Successfully");
                navigate('/');  // Navigate to an order success page or show a success modal
            }
        } catch (error) {
            console.log(error);
            toast.error("Failed to place the order. Please try again.");
        }
    }
    

    return (
        <Layout>
            <div className="container mx-auto md:mx-auto px-4 max-w-7xl lg:px-10">
                <div className="mx-auto max-w-2xl py-8 lg:max-w-7xl">
                    <h1 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl text-center">
                        Shopping Cart
                    </h1>
                    <form className="mt-12 lg:grid lg:grid-cols-12 lg:items-start lg:gap-x-12 xl:gap-x-16 drop-shadow-xl">
                        <section aria-labelledby="cart-heading" className="rounded-lg bg-white lg:col-span-8 mx-auto flex">
                            <h2 id="cart-heading" className="sr-only">
                                Items in your shopping cart
                            </h2>
                            <ul role="list" className="divide-y divide-gray-200 mx-auto">
                                {cartItems.length > 0 ?

                                    <>
                                        {cartItems.map((item, index) => {
                                            let { _id, title, price, productImageUrl, quantity, category, size } = item;
                                            // quantity = 1;
                                            return (
                                                <div key={index} className="mx-auto pl-2 hover:bg-gray-50">
                                                    <li className="flex py-6 sm:py-6 ">
                                                        <div className="flex-shrink-0">
                                                            <img
                                                                src={productImageUrl}
                                                                alt="img"
                                                                className="sm:h-38 sm:w-38 h-24 w-24  rounded-md object-contain object-center"
                                                            />
                                                        </div>

                                                        <div className="ml-4 flex flex-1 flex-col justify-between sm:ml-6">
                                                            <div className="relative pr-9 sm:grid sm:grid-cols-2 sm:gap-x-6 sm:pr-0">
                                                                <div>
                                                                    <div className="flex justify-between">
                                                                        <h3 className="text-sm">
                                                                            <div className="font-semibold text-black">
                                                                                {title}
                                                                            </div>
                                                                        </h3>
                                                                    </div>
                                                                    <div className="mt-1 flex text-sm">
                                                                        <p className="text-sm text-gray-500">{category}</p>
                                                                    </div>
                                                                    <div className="mt-1 flex text-sm">
                                                                        <div className="text-sm text-gray-900">size
                                                                            <select
                                                                                className="p-1 m-2 bg-gray-200"
                                                                                onChange={(e) => setProductSize(e.target.value)}
                                                                            >
                                                                                {size.map((item) => (
                                                                                    <option value={item}>{item}</option>
                                                                                ))
                                                                                }


                                                                            </select>
                                                                        </div>
                                                                    </div>
                                                                    <div className="mt-1 flex items-end">
                                                                        <p className="text-sm font-medium text-gray-900">
                                                                            ₹{price}
                                                                        </p>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </li>
                                                    <div className="mb-2 flex">
                                                        <div className="min-w-24 flex">
                                                            <button onClick={() => handleDecrement(_id)} type="button" className="h-7 w-7 border rounded-md hover:bg-gray-200" >
                                                                -
                                                            </button>
                                                            <input
                                                                type="text"
                                                                className="mx-1 h-7 w-9 rounded-md border text-center"
                                                                value={quantity}
                                                            />
                                                            <button onClick={() => handleIncrement(_id)} type="button" className="flex h-7 w-7 items-center justify-center
                                                            border rounded-md
                                                            hover:bg-gray-200">
                                                                +
                                                            </button>
                                                        </div>
                                                        <div className="ml-6 flex text-sm  hover:bg-red-100 hover:border hover:rounded-md p-1">
                                                            <button onClick={() => deleteCart(item)} type="button" className="flex items-center space-x-1 px-2 py-1 pl-0">
                                                                <Trash size={12} className="text-red-500" />
                                                                <span className="text-xs font-medium text-red-500">Remove</span>
                                                            </button>
                                                        </div>
                                                    </div>
                                                </div>
                                            )
                                        })}
                                    </>
                                    :

                                    <h1 className="p-4"> Products Not Found</h1>}
                            </ul>
                        </section>

                        {/* Order summary */}
                        <section
                            aria-labelledby="summary-heading"
                            className="mt-16 rounded-md bg-white lg:col-span-4 lg:mt-0 lg:p-0 drop-shadow-xl"
                        >
                            <h2
                                id="summary-heading"
                                className=" border-b border-gray-200 px-4 py-3 text-lg font-medium text-gray-900 sm:p-4"
                            >
                                Price Details
                            </h2>
                            <div>
                                <dl className=" space-y-1 px-2 py-4">
                                    <div className="flex items-center justify-between">
                                        <dt className="text-sm text-gray-800">Price ({cartItemTotal} item)</dt>
                                        <dd className="text-sm font-medium text-gray-900">₹ {cartTotal}</dd>
                                    </div>

                                    <div className="flex items-center justify-between py-4">
                                        <dt className="flex text-sm text-gray-800">
                                            <span>Delivery Charges</span>
                                        </dt>
                                        <dd className="text-sm font-medium text-green-700">Free</dd>
                                    </div>
                                    <div className="flex items-center justify-between border-y border-dashed  py-4 ">
                                        <dt className="text-base font-medium text-gray-900">Total Amount</dt>
                                        <dd className="text-base font-medium text-gray-900">₹ {cartTotal}</dd>
                                    </div>
                                </dl>
                                <div className="px-2 pb-4 font-medium text-green-700">
                                    <div className="flex gap-4 mb-6">
                                        {user
                                            ? <BuyNowModal
                                                addressInfo={addressInfo}
                                                setAddressInfo={setAddressInfo}
                                                buyNowFunction={buyNowFunction}

                                            /> : <Navigate to={'/login'} />
                                        }
                                    </div>
                                </div>
                            </div>
                        </section>
                    </form>
                </div>
            </div>
        </Layout>
    );
}

export default CartPage;


