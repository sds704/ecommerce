import React, { useState, useContext } from 'react';
import Sidebar from './Sidebar';
import myContext from '../../context/myContext';
import axios from 'axios';
import toast from 'react-hot-toast';
import { TiEdit } from "react-icons/ti";
import { MdDelete } from "react-icons/md";

function Category() {
  const [categoryName, setCategoryName] = useState('');
  const [editCategoryName, setEditCategoryName] = useState('');
  const [editingCategoryId, setEditingCategoryId] = useState(null);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const { allCategories, getAllCategories } = useContext(myContext);
  const user = JSON.parse(localStorage.getItem('users'));
  const token = localStorage.getItem('token');

 // Filter categories specific to the logged-in vendor

 const vendorCategories = allCategories.filter((category) => ( category.ownerId === user._id
 )
 );

  // handle Add category
  const handleAddCategory = async () => {
    if (!categoryName.trim()) {
      alert("Please enter a category name.");
      return;
    }

    try {
      const response = await axios.post('/api/category', {
        type: categoryName,
        ownerId: user?._id
      }, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });

      if (response.status === 201) {
        toast.success('Category added successfully!');
        setCategoryName('');
        await getAllCategories();
      }
    } catch (error) {
      console.error("Error adding category:", error);
      toast.error('Failed to add category. Please try again.');
    }
  };

  // handle Delete category
  const handleDeleteCategory = async (id) => {
    try {
      const response = await axios.delete(`/api/category/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });

      if (response.status === 200) {
        toast.success('Category deleted successfully!');
        await getAllCategories();
      }
    } catch (error) {
      console.error("Error deleting category:", error);
      toast.error('Failed to delete category. Please try again.');
    }
  };

  // Open the edit modal and set the current category
  const openEditModal = (category) => {
    setEditCategoryName(category.type);
    setEditingCategoryId(category._id);
    setIsEditModalOpen(true);
  };

  // handle Update category
  const handleUpdateCategory = async () => {
    if (!editCategoryName.trim()) {
      alert("Please enter a category name.");
      return;
    }

    try {
      const response = await axios.put(`/api/category/${editingCategoryId}`, {
        type: editCategoryName,
      }, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });

      if (response.status === 200) {
        toast.success('Category updated successfully!');
        setIsEditModalOpen(false); // Close the modal
        setEditingCategoryId(null); // Reset editing state
        setEditCategoryName(''); // Clear the input field
        await getAllCategories();
      }
    } catch (error) {
      console.error("Error updating category:", error);
      toast.error('Failed to update category. Please try again.');
    }
  };

  return (
    <Sidebar>
      <div className="category w-full min-h-screen p-4 overflow-y-auto bg-dry ">
        <h2 className="text-xl font-bold text-white">Category</h2>

        <div className="category flex flex-col justify-start gap-10 items-center mt-10 ">
          <span className='font-semibold text-lg text-white'> Create Category</span>
          <div className="inpt flex flex-col md:flex-row gap-4">
            <input
              type="text"
              placeholder='Add Category'
              className='border text-white border-gray-400 rounded px-4 py-2 bg-main'
              value={categoryName}
              onChange={(e) => setCategoryName(e.target.value)}
            />
            <button
              className='rounded px-4 py-2 text-center text-white bg-subMain font-semibold md:w-60'
              onClick={handleAddCategory}
            >
              Create
            </button>
          </div>

          {/* show category */}
          <div className="w-full flex flex-col gap-4 justify-center items-center p-2 lg:p-8 m-2 rounded bg-main">
            <table className="w-full text-left ">
              <thead>
                <tr className="text-white border border-border">
                  <th className="px-2 lg:px-6 py-4 border border-border">Id</th>
                  <th className="px-2 lg:px-6 py-4 border border-border">Category</th>
                  <th className="px-2 lg:px-6 py-4 text-center border border-border">Action</th>
                </tr>
              </thead>
              <tbody>
                {vendorCategories.map((category, index) => (
                  <tr key={category._id} className="hover:bg-dry border border-border">
                    <td className="px-2 lg:px-6 text-text border border-border">{index+1}</td>
                    <td className="px-2 lg:px-6 text-text border border-border">{category.type}</td>
                    <td className="px-2 lg:px-6 py-2 flex gap-2 lg:gap-6 items-center justify-center text-center border border-border">
                      <button
                        className="py-2 px-4 rounded text-green-600 border border-border"
                        onClick={() => openEditModal(category)}
                      >
                        <TiEdit />
                      </button>
                      <button
                        className="py-2 px-4 rounded bg-subMain text-white"
                        onClick={() => handleDeleteCategory(category._id)}
                      >
                        <MdDelete />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Edit Modal */}
        {isEditModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black  bg-opacity-70">
            <div className="bg-dry rounded p-6 w-60 lg:w-96 border border-border">
              <h2 className="text-xl font-bold mb-4 text-white text-center">Update Category</h2>
              <input
                type="text"
                placeholder='Edit Category'
                className='border w-full border-border bg-main text-white rounded px-4 py-2 mb-4'
                value={editCategoryName}
                onChange={(e) => setEditCategoryName(e.target.value)}
              />
              <div className="flex justify-end gap-4">
                <button
                  className='rounded px-4 py-2 text-white bg-border'
                  onClick={() => setIsEditModalOpen(false)}
                >
                  Cancel
                </button>
                <button
                  className='rounded px-4 py-2 text-white bg-subMain'
                  onClick={handleUpdateCategory}
                >
                  Update
                </button>
              </div>
            </div>
          </div>
        )}

      </div>
    </Sidebar>
  );
}

export default Category;
