import React from 'react'
import Sidebar from './section/Sidebar'
import Main from './section/Main'

function AdminDashboard() {
  return (
    <div className='flex justify-between'>
      <Sidebar/>
      <Main />
    </div>
  )
}

export default AdminDashboard