import React from 'react'
import Sidebar from './section/Sidebar'
import OrderDetail from '../../components/admin/OrderDetail'
function Orders() {
  return (
    <div className='category flex justify-between overflow-y-auto'>
      <Sidebar />

      {/* orders */}
      <div className="w-4/5 p-4 overflow-y-auto">
        <OrderDetail />
      </div>
    </div>
  )
}

export default Orders