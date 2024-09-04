import { useNavigate, useParams } from "react-router";
import myContext from "../../context/myContext";
import { useContext, useEffect, useState } from "react";
import { Timestamp, doc, getDoc, setDoc } from "firebase/firestore";
import { fireDB } from "../../firebase/FirebaseConfig";
import toast from "react-hot-toast";
import Loader from "../../components/loader/Loader";
import Sidebar from "./Sidebar";
import axios from 'axios';

const UpdateProduct = () => {

    const { id } = useParams()
    const navigate = useNavigate();
    const user = JSON.parse(localStorage.getItem('users'));
    const context = useContext(myContext);
    const { loading, setLoading, getAllProducts, allCategories } = context;

    // Initialize product state
    const [product, setProduct] = useState({
        ownerId: user?._id,
        title: '',
        price: '',
        quantity: '',
        productImageUrl: '',
        category: '',
        description: ''
    });

    // Handle form submission
    const handleUpdateProduct = async () => {
        try {
            setLoading(true);
            const response = await axios.put(`/api/products/${id}`, product, {
                headers: {
                    Authorization: `Bearer ${user?.token}`
                }
            });
            toast.success('Product Updated successfully!');
            setLoading(false);
            setProduct({ // Reset the product state
                ownerId: user?._id,
                title: '',
                price: '',
                quantity: '',
                productImageUrl: '',
                category: '',
                description: '',
            });
            navigate('/vendor/products');  // Redirect to the products page after adding
            getAllProducts();  // Optionally, refresh the products list
        } catch (error) {
            setLoading(false);
            toast.error('Failed to Update product.');
            console.error(error);
        }
    };

    return (
        <Sidebar>
            <div className='w-full min-h-screen bg-dry p-4 flex justify-center items-center'>
                {loading && <Loader />}
                {/* Login Form  */}
                <div className=" bg-main px-8 py-6 border border-border rounded-xl shadow-md ">

                    {/* Top Heading  */}
                    <div className="mb-5">
                        <h2 className='text-center text-2xl font-bold text-white '>
                            Update Product
                        </h2>
                    </div>

                    {/* Form Fields */}
                    <div className="mb-2">
                        <input
                            type="hidden"
                            name="owner"
                            value={product.ownerId}
                            readOnly
                            className='bg-main border text-white border-border px-2 py-2 w-60 md:w-96 rounded-md outline-none placeholder-text'
                        />
                    </div>
                    <div className="mb-2">
                        <input
                            type="text"
                            name="title"
                            value={product.title}
                            onChange={(e) => setProduct({ ...product, title: e.target.value })}
                            placeholder='Product Title'
                            className='bg-main border text-white border-border px-2 py-2 w-60 md:w-96 rounded-md outline-none placeholder-text'
                        />
                    </div>
                    <div className="mb-2">
                        <input
                            type="number"
                            name="price"
                            value={product.price}
                            onChange={(e) => setProduct({ ...product, price: e.target.value })}
                            placeholder='Product Price'
                            className='bg-main border text-white border-border px-2 py-2 w-60 md:w-96 rounded-md outline-none placeholder-text'
                        />
                    </div>
                    <div className="mb-2">
                        <input
                            type="number"
                            name="quantity"
                            value={product.quantity}
                            onChange={(e) => setProduct({ ...product, quantity: e.target.value })}
                            placeholder='Product Quantity'
                            className='bg-main border text-white border-border px-2 py-2 w-60 md:w-96 rounded-md outline-none placeholder-text'
                        />
                    </div>
                    <div className="mb-2">
                        <input
                            type="text"
                            name="productImageUrl"
                            value={product.productImageUrl}
                            onChange={(e) => setProduct({ ...product, productImageUrl: e.target.value })}
                            placeholder='Product Image Url'
                            className='bg-main border text-white border-border px-2 py-2 w-60 md:w-96 rounded-md outline-none placeholder-text'
                        />
                    </div>
                    <div className="mb-2">
                        <select
                            value={product.category}
                            onChange={(e) => setProduct({ ...product, category: e.target.value })}
                            className="w-full px-1 py-2 text-text bg-main border border-border rounded-md outline-none">
                            <option value="" disabled>Categories</option>
                            <option value="shirt">Shirt</option>
                            <option value="jacket">Jacket</option>
                            <option value="jeans">Jeans</option>
                            <option value="t-shirt">T-shirt</option>
                            <option value="lehenga">Lehenga</option>
                            <option value="frock">Frock</option>
                            <option value="saree">Saree</option>
                        </select>
                    </div>
                    <div className="mb-2">
                        <textarea
                            value={product.description}
                            onChange={(e) => setProduct({ ...product, description: e.target.value })}
                            name="description"
                            placeholder="Product Description"
                            rows="2"
                            className="w-full px-2 py-1 text-white bg-main border border-border rounded-md outline-none placeholder-text">
                        </textarea>
                    </div>

                    {/* Update Product Button  */}
                    <div className="mb-3">
                        <button
                            onClick={handleUpdateProduct}
                            type='button'
                            className='bg-subMain w-full text-white text-center py-2 font-bold rounded-md '
                        >
                            Update Product
                        </button>
                    </div>
                </div>
            </div>
        </Sidebar>
    );
}

export default UpdateProduct;
