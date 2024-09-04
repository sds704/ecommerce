import { useContext, useEffect, useState } from "react";
import myContext from "../../context/myContext";
import Sidebar from "./Sidebar";
import { TiEdit } from "react-icons/ti";
import { MdDelete } from "react-icons/md";
import toast from "react-hot-toast";
import axios from 'axios'

const Users = () => {
  const context = useContext(myContext);
  const { loading, setLoading, allUsers, getAllUsers } = context;
  const user = JSON.parse(localStorage.getItem('users'))


// only get users data from users not admin and vendor
const onlyUsers = allUsers.filter((item)=>item.role === 'user')

  // Function to delete a user by ID
  const deleteUser = async (id) => {
    try {
      setLoading(true);
     const response =  await axios.delete(`/api/users/${id}`, {
        headers: {
          Authorization: `Bearer ${user.token}`
        }
      });
      if (response.status === 200) {
        toast.success("User deleted successfully");
        getAllUsers(); // Refresh the list of users after deletion
      }
    } catch (error) {
      toast.error("Error deleting user");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Sidebar>
      <div className="w-full min-h-screen bg-dry p-4">
        <div className="py-5 flex justify-between items-center">
          {/* text  */}
          <h1 className="text-xl text-white font-bold text-center">All Users who have placed Ordered</h1>
        </div>

        {/* table  */}
        <div className="w-full overflow-x-auto">
          <table className=" bg-main w-full text-left border border-collapse border-border text-text" >
            <tbody>
              <tr>
                <th scope="col"
                  className="h-12 px-2 border-l first:border-l-0 border-border text-white bg-main">
                  Id
                </th>

                <th scope="col"
                  className="h-12 px-2 border-l first:border-l-0 border-border text-white bg-main">
                  Name
                </th>

                <th scope="col"
                  className="h-12 px-2 border-l first:border-l-0 border-border text-white bg-main">
                  Email
                </th>

                {/* <th scope="col"
                    className="h-12 px-2 border-l first:border-l-0 border-border text-white bg-dry">
                    Uid
                  </th> */}

                {/* <th scope="col"
                    className="h-12 px-2 border-l first:border-l-0 border-border text-white bg-dry">
                    Role
                  </th> */}

                <th scope="col"
                  className="h-12 px-2 border-l first:border-l-0 border-border text-white bg-main">
                  Date
                </th>

                <th scope="col"
                  className="h-12 px-2 border-l first:border-l-0 border-border text-white bg-main">
                  Action
                </th>

              </tr>
              {
                onlyUsers.map((value, index) => {
                  return (
                    <tr key={index} className="text-text">
                      <td
                        className="h-12 px-2 text-md transition duration-300 border-t border-l first:border-l-0 border-border  text-text ">
                        {index + 1}
                      </td>

                      <td
                        className="h-12 px-2 text-md transition duration-300 border-t border-l first:border-l-0 border-border text-text first-letter:uppercase ">
                        {value.name}
                      </td>

                      <td className="h-12 px-2 text-md transition duration-300 border-t border-l first:border-l-0 border-border text-text cursor-pointer ">
                        {value.email}
                      </td>

                      {/* <td className="h-12 px-2 text-md transition duration-300 border-t border-l first:border-l-0 border-border text-text  cursor-pointer ">
                          {value.uid}
                        </td> */}

                      {/* <td className="h-12 px-2 text-md transition duration-300 border-t border-l first:border-l-0 border-border  text-text  cursor-pointer ">
                          {value.role}
                        </td> */}

                      <td className="h-12 px-2 text-md transition duration-300 border-t border-l first:border-l-0 border-border  text-text cursor-pointer ">
                        {value.createdAt.slice(0, 10)}
                      </td>

                      <td className="h-12 px-2 text-md transition duration-300 border-t border-l first:border-l-0 border-border  text-text cursor-pointer ">

                        <button
                          onClick={() => deleteUser(value._id)}
                          className="bg-subMain p-2 rounded m-1"><MdDelete /></button>
                      </td>
                    </tr>
                  )
                })
              }

            </tbody>
          </table>
        </div>
      </div>
    </Sidebar>
  );
}

export default Users;
