import React from 'react'
import Sidebar from './section/Sidebar'
import ProductDetail from '../../components/admin/ProductDetail'

export default function Products() {
  return (
    <div className='category flex justify-center'>
      {/* <Sidebar/> */}

      {/* //product page */}
      <div className="products w-full p-4 overflow-y-auto">
        <ProductDetail />
      </div>
    </div>
  )
}
