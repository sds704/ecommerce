import React from 'react'
import Sidebar from './section/Sidebar'
import AddProductPage from './AddProductPage'

function AddProduct() {
  return (
    <div className='category flex justify-between'>
      <Sidebar/>
      {/* //add product */}
      <div className="addproduct w-4/5 p-4">
        <AddProductPage/>
      </div>
    </div>
  )
}

export default AddProduct