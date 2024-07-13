import UserDetail from '../../components/admin/UserDetail'
import Sidebar from './section/Sidebar'
import React from 'react'

function Users() {
  return (
    <div className='category flex justify-between'>
      <Sidebar/>
      <div className="users w-4/5 p-4">
      <UserDetail/>
      </div>
    </div>
  )
}

export default Users