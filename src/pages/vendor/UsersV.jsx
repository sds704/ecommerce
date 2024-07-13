import React from 'react'
import UserDetailRt from '../../components/vendor/UserDetailRt'
import Sidebar from './section/Sidebar'


function UsersV() {
  return (
    <div className='category flex justify-between'>
      <Sidebar/>
      <div className="users w-4/5 p-4">
      <UserDetailRt/>
      </div>
    </div>
  )
}

export default UsersV