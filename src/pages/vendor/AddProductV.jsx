import React from 'react'
import Sidebar from './section/Sidebar'
import AddProductPageV from './AddProductPageV'

function AddProductV() {
  return (
    <div className='category flex justify-between'>
      <Sidebar/>
      {/* //add product */}
      <div className="addproduct w-4/5 p-4">
        <AddProductPageV/>
      </div>
    </div>
  )
}

export default AddProductV