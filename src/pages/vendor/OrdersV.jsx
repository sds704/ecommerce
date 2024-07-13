import React from 'react'
import Sidebar from './section/Sidebar'
import OrderDetailRt from '../../components/vendor/OrderDetailRt'
function OrdersV() {
  return (
    <div className='category flex justify-between overflow-y-auto'>
      <Sidebar />

      {/* orders */}
      <div className="w-4/5 p-4 overflow-y-auto">
        <OrderDetailRt />
      </div>
    </div>
  )
}

export default OrdersV