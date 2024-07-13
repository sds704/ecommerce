import React, { useState, useEffect } from 'react';
import { collection, addDoc, getDocs, deleteDoc, doc, query, where } from 'firebase/firestore';
import { fireDB } from "../../firebase/FirebaseConfig";
import Sidebar from './section/Sidebar';

function Category() {
  const [categoryName, setCategoryName] = useState('');
  const [categories, setCategories] = useState([]);
  const user = JSON.parse(localStorage.getItem('users'));

  console.log("categories :",categories)

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

  const handleAddCategory = async () => {
    if (categoryName.trim() === '') return;

    try {
      const docRef = await addDoc(collection(fireDB, 'categories'), {
        name: categoryName,
        owner:user.uid
      });
      setCategories([...categories, { id: docRef.id, name: categoryName, owner:user.uid }]);
      setCategoryName('');
    } catch (error) {
      console.error('Error adding category: ', error);
    }
  };

  const handleDeleteCategory = async (id) => {
    try {
      await deleteDoc(doc(fireDB, 'categories', id));
      setCategories(categories.filter((category) => category.id !== id));
    } catch (error) {
      console.error('Error deleting category: ', error);
    }
  };

  return (
    <div className='category flex justify-between'>
      <Sidebar />
      <div className="category w-4/5 p-4 overflow-y-auto ">
        <div className="category flex flex-col justify-start gap-10 items-center mt-10 ">
          <span className='font-bold text-xl'>Add Category</span>
          <div className="inpt flex flex-col md:flex-row gap-4">
            <input 
              type="text" 
              className='border-2 border-gray-400 rounded-md px-4' 
              value={categoryName}
              onChange={(e) => setCategoryName(e.target.value)}
            />
            <button 
              className='rounded-lg px-4 py-2 text-center border bg-blue-400 font-semibold md:w-60'
              onClick={handleAddCategory}
            >
              Add
            </button>
          </div>
          {/* show category */}
          <div className="w-full border-2 flex flex-col gap-1 justify-center items-center p-8 m-2  rounded-lg">
            {categories.map((category) => (
              <table className='flex item-center justify-center w-full'>
                <tr key={category.id} className='w-full flex gap-10 items-center justify-between hover:bg-blue-50 '>
                  <th className='text-lg font-medium '>{category.name}</th>
                  <th><button 
                    className='p-1 rounded border-none bg-red-800 text-white md:w-40'
                    onClick={() => handleDeleteCategory(category.id)}
                  >
                    Delete
                  </button></th>
                </tr>
              </table>
              
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Category;
