/* eslint-disable react/prop-types */
import {
    Button,
    Dialog,
    DialogBody,
} from "@material-tailwind/react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { emptyCart } from "../../redux/cartSlice";
import { useDispatch } from "react-redux";

const BuyNowModal = ({ addressInfo, setAddressInfo, buyNowFunction }) => {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const [open, setOpen] = useState(false);

    const handleOpen = () => setOpen(!open);
    return (
        <>
            <Button
                type="button"
                onClick={handleOpen}
                className="w-full px-4 py-3 text-center text-gray-100 bg-green-800 border border-transparent dark:border-gray-700 hover:border-green-900 hover:text-white-700 hover:bg-green-600 rounded-xl"
            >
                Buy now
            </Button>
            <Dialog open={open} handler={handleOpen} className=" bg-blue-50">
                <DialogBody className="">
                    <div className="mb-3">
                        <input
                            type="text"
                            name="address"
                            value={addressInfo.address}
                            onChange={(e) => {
                                setAddressInfo({
                                    ...addressInfo,
                                    address: e.target.value
                                })
                            }}
                            placeholder='Enter your address'
                            className='bg-blue-50 border border-blue-200 px-2 py-2 w-full rounded-md outline-none text-blue-600 placeholder-blue-300'
                        />
                    </div>
                    <div className="mb-3">
                        <input
                            type="text"
                            name="city"
                            value={addressInfo.city}
                            onChange={(e) => {
                                setAddressInfo({
                                    ...addressInfo,
                                    city: e.target.value
                                })
                            }}
                            placeholder='Enter your city'
                            className='bg-blue-50 border border-blue-200 px-2 py-2 w-full rounded-md outline-none text-blue-600 placeholder-blue-300'
                        />
                    </div>

                    <div className="mb-3">
                        <input
                            type="text"
                            name="state"
                            value={addressInfo.state}
                            onChange={(e) => {
                                setAddressInfo({
                                    ...addressInfo,
                                    state: e.target.value
                                })
                            }}
                            placeholder='Enter your state'
                            className='bg-blue-50 border border-blue-200 px-2 py-2 w-full rounded-md outline-none text-blue-600 text-blue-600 placeholder-blue-300'
                        />
                    </div>
                    <div className="mb-3">
                        <input
                            type="text"
                            name="postalCode"
                            value={addressInfo.postalCode}
                            onChange={(e) => {
                                setAddressInfo({
                                    ...addressInfo,
                                    postalCode: e.target.value
                                })
                            }}
                            placeholder='Enter your Postal Code'
                            className='bg-blue-50 border border-blue-200 px-2 py-2 w-full rounded-md outline-none text-blue-600 text-blue-600 placeholder-blue-300'
                        />
                    </div>
                    <div className="mb-3">
                        <input
                            type="text"
                            name="country"
                            value={addressInfo.country}
                            onChange={(e) => {
                                setAddressInfo({
                                    ...addressInfo,
                                    country: e.target.value
                                })
                            }}
                            placeholder='Enter your country'
                            className='bg-blue-50 border border-blue-200 px-2 py-2 w-full rounded-md outline-none text-blue-600 text-blue-600 placeholder-blue-300'
                        />
                    </div>

                    <div className="mb-3">
                        <input
                            type="number"
                            name="mobileNumber"
                            value={addressInfo.mobileNumber}
                            onChange={(e) => {
                                setAddressInfo({
                                    ...addressInfo,
                                    mobileNumber: e.target.value
                                })
                            }}
                            placeholder='Enter your mobile number'
                            className='bg-blue-50 border border-blue-200 px-2 py-2 w-full rounded-md outline-none text-blue-600 placeholder-blue-300'
                        />
                    </div>

                    <div className="">
                        <Button

                            type="button"
                            onClick={() => {
                                handleOpen();
                                buyNowFunction();
                                dispatch(emptyCart())
                                // navigate("/")
                            }}
                            className="w-full px-4 py-3 text-center text-gray-100 bg-blue-600 border border-transparent dark:border-gray-700 rounded-lg"
                        >
                            Buy now
                        </Button>
                    </div>

                </DialogBody>
            </Dialog>
        </>
    );
}

export default BuyNowModal;
