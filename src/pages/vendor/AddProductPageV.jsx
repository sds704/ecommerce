import { Timestamp, addDoc, collection, where, doc, query, getDocs } from "firebase/firestore";
import { useContext, useState, useEffect } from "react";
import myContext from "../../context/myContext";
import toast from "react-hot-toast";
import { fireDB } from "../../firebase/FirebaseConfig";
import { useNavigate } from "react-router";
import Loader from "../../components/loader/Loader";


const AddProductPageV = () => {

     // navigate 
     const navigate = useNavigate();

    const user = JSON.parse(localStorage.getItem('users'));
    console.log(user)
    const context = useContext(myContext);
    const { loading, setLoading } = context;

    //categories
    const [categories, setCategories] = useState([]);

    //getting category 
    useEffect(() => {
        const fetchCategories = async () => {
            const q = query(collection(fireDB, 'categories'), where('owner', '==', user.uid));
            const querySnapshot = await getDocs(q);
            const categoriesList = querySnapshot.docs.map((doc) => ({
                id: doc.id,
                ...doc.data()
            }));
            setCategories(categoriesList);
        };

        fetchCategories();
    }, []);

   
    // product state
    const [product, setProduct] = useState({
        title: "",
        price: "",
        productImageUrl: "",
        category: "",
        description: "",
        owner: user.uid,
        quantity: "",
        time: Timestamp.now(),
        date: new Date().toLocaleString(
            "en-US",
            {
                month: "short",
                day: "2-digit",
                year: "numeric",
            }
        )
    });


    // Add Product Function
    const addProductFunction = async () => {
        if (product.title == "" || product.price == "" || product.productImageUrl == "" || product.category == "" || product.description == "") {
            return toast.error("all fields are required")
        }

        setLoading(true);
        try {
            const productRef = collection(fireDB, 'products');
            await addDoc(productRef, product)
            toast.success("Added product successfully");
            navigate('/vendor')
            setLoading(false)
        } catch (error) {
            console.log(error);
            setLoading(false)
            toast.error("Added product failed");
        }

    }
    return (
        <div>
            <div className='flex justify-center items-center h-screen'>
                {loading && <Loader />}
                {/* Login Form  */}
                <div className="login_Form bg-blue-50 px-8 py-6 border border-blue-100 rounded-xl shadow-md">

                    {/* Top Heading  */}
                    <div className="mb-5">
                        <h2 className='text-center text-2xl font-bold text-blue-500 '>
                            Add Product
                        </h2>
                    </div>

                    {/* owner type */}
                    <div className="mb-3">
                        <input
                            type="hidden"
                            name="owner"
                            value={user.uid}
                            onChange={(e) => {
                                setProduct({
                                    ...product,
                                    owner: e.target.value
                                })
                            }}
                            placeholder='owner'
                            className='bg-blue-50 border text-blue-300 border-blue-200 px-2 py-2 w-60 md:w-96 rounded-md outline-none placeholder-blue-300'
                        />
                    </div>

                    {/* Input One  */}
                    <div className="mb-3">
                        <input
                            type="text"
                            name="title"
                            value={product.title}
                            onChange={(e) => {
                                setProduct({
                                    ...product,
                                    title: e.target.value
                                })
                            }}
                            placeholder='Product Title'
                            className='bg-blue-50 border text-blue-300 border-blue-200 px-2 py-2 w-60 md:w-96 rounded-md outline-none placeholder-blue-300'
                        />
                    </div>

                    {/* Input Two  */}
                    <div className="mb-3">
                        <input
                            type="number"
                            name="price"
                            value={product.price}
                            onChange={(e) => {
                                setProduct({
                                    ...product,
                                    price: e.target.value
                                })
                            }}
                            placeholder='Product Price'
                            className='bg-blue-50 border text-blue-300 border-blue-200 px-2 py-2 w-60 md:w-96 rounded-md outline-none placeholder-blue-300'
                        />
                    </div>
                    {/* quantity */}
                    <div className="mb-3">
                        <input
                            type="number"
                            name="quantity"
                            value={product.quantity}
                            onChange={(e) => {
                                setProduct({
                                    ...product,
                                    quantity: e.target.value
                                })
                            }}
                            placeholder='Product Quantity'
                            className='bg-blue-50 border text-blue-300 border-blue-200 px-2 py-2 w-60 md:w-96 rounded-md outline-none placeholder-blue-300'
                        />
                    </div>

                    {/* Input Three  */}
                    <div className="mb-3">
                        <input
                            type="text"
                            name="productImageUrl"
                            value={product.productImageUrl}
                            onChange={(e) => {
                                setProduct({
                                    ...product,
                                    productImageUrl: e.target.value
                                })
                            }}
                            placeholder='Product Image Url'
                            className='bg-blue-50 border text-blue-300 border-blue-200 px-2 py-2 w-60 md:w-96 rounded-md outline-none placeholder-blue-300'
                        />
                    </div>

                    {/* Input Four  */}
                    <div className="mb-3">
                        <select
                            value={product.category}
                            onChange={(e) => {
                                setProduct({
                                    ...product,
                                    category: e.target.value
                                })
                            }}
                            className="w-full px-1 py-2 text-blue-300 bg-blue-50 border border-blue-200 rounded-md outline-none  ">
                            <option disabled>Select Product Category</option>
                            {categories.map((value, index) => {
                                const { name } = value
                                return (
                                    <option className=" first-letter:uppercase" key={index} value={name}>{name}</option>
                                )
                            })}
                        </select>
                    </div>

                    {/* Input Five  */}
                    <div className="mb-3">
                        <textarea
                            value={product.description}
                            onChange={(e) => {
                                setProduct({
                                    ...product,
                                    description: e.target.value
                                })
                            }} name="description" placeholder="Product Description" rows="5" className=" w-full px-2 py-1 text-blue-300 bg-blue-50 border border-blue-200 rounded-md outline-none placeholder-blue-300 ">

                        </textarea>
                    </div>

                    {/* Add Product Button  */}
                    <div className="mb-3">
                        <button
                            onClick={addProductFunction}
                            type='button'
                            className='bg-blue-500 hover:bg-blue-600 w-full text-white text-center py-2 font-bold rounded-md '
                        >
                            Add Product
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default AddProductPageV;
