import React from 'react'
import Sidebar from './section/Sidebar'
import ProductDetailRt from '../../components/vendor/ProductDetailRt'

export default function ProductsV() {
  return (
    <div className='category flex justify-center'>
      {/* <Sidebar/> */}

      {/* //product page */}
      <div className="products w-full p-4 overflow-y-auto">
        <ProductDetailRt />
      </div>
    </div>
  )
}
