import { useContext, useState } from "react";
import myContext from "../../context/myContext";

const UserDetail = () => {
    const context = useContext(myContext);
    const { getAllUser, deleteUser } = context;


    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage] = useState(5);

     // Pagination logic
     const indexOfLastItem = currentPage * itemsPerPage;
     const indexOfFirstItem = indexOfLastItem - itemsPerPage;
     const currentItems = getAllUser.slice(indexOfFirstItem, indexOfLastItem);
     const totalPages = Math.ceil(getAllUser.length / itemsPerPage);
 
     const handleNextPage = () => {
         if (currentPage < totalPages) {
             setCurrentPage(currentPage + 1);
         }
     };
 
     const handlePrevPage = () => {
         if (currentPage > 1) {
             setCurrentPage(currentPage - 1);
         }
     };
 
     const handlePageChange = (page) => {
         setCurrentPage(page);
     };




    return (
        <div>
            <div>
                <div className="py-5 flex justify-center items-center">
                    {/* text  */}
                    <h1 className=" text-xl text-blue-300 font-bold text-center">All User</h1>
                </div>

                {/* table  */}
                <div className="w-full overflow-x-auto">
                    <table className="w-full text-left border border-collapse sm:border-separate border-blue-100 text-blue-400" >
                        <tbody>
                            <tr>
                                <th scope="col"
                                    className="h-12 px-6 text-md border-l first:border-l-0 border-blue-100 text-slate-700 bg-slate-100 font-bold fontPara">
                                    S.No.
                                </th>

                                <th scope="col"
                                    className="h-12 px-6 text-md border-l first:border-l-0 border-blue-100 text-slate-700 bg-slate-100 font-bold fontPara">
                                    Name
                                </th>

                                <th scope="col"
                                    className="h-12 px-6 text-md border-l first:border-l-0 border-blue-100 text-slate-700 bg-slate-100 font-bold fontPara">
                                    Email
                                </th>

                                {/* <th scope="col"
                                    className="h-12 px-6 text-md border-l first:border-l-0 border-blue-100 text-slate-700 bg-slate-100 font-bold fontPara">
                                    Uid
                                </th> */}

                                <th scope="col"
                                    className="h-12 px-6 text-md border-l first:border-l-0 border-blue-100 text-slate-700 bg-slate-100 font-bold fontPara">
                                   Role
                                </th>

                                <th scope="col"
                                    className="h-12 px-6 text-md border-l first:border-l-0 border-blue-100 text-slate-700 bg-slate-100 font-bold fontPara">
                                    Date
                                </th>
                                <th scope="col"
                                    className="h-12 px-6 text-md border-l first:border-l-0 border-blue-100 text-slate-700 bg-slate-100 font-bold fontPara">
                                    Action
                                </th>

                            </tr>
                            {
                                getAllUser.map((value, index) => {
                                    return (
                                        <tr key={index} className="text-blue-300">
                                            <td
                                                className="h-12 px-6 text-md transition duration-300 border-t border-l first:border-l-0 border-blue-100 stroke-slate-500 text-slate-500 ">
                                                {index + 1}
                                            </td>

                                            <td
                                                className="h-12 px-6 text-md transition duration-300 border-t border-l first:border-l-0 border-blue-100 stroke-slate-500 text-slate-500 first-letter:uppercase ">
                                                {value.name}
                                            </td>

                                            <td className="h-12 px-6 text-md transition duration-300 border-t border-l first:border-l-0 border-blue-100 stroke-slate-500 text-slate-500 cursor-pointer ">
                                                {value.email}
                                            </td>

                                            {/* <td className="h-12 px-6 text-md transition duration-300 border-t border-l first:border-l-0 border-blue-100 stroke-slate-500 text-slate-500  cursor-pointer ">
                                                {value.uid}
                                            </td> */}

                                            <td className="h-12 px-6 text-md transition duration-300 border-t border-l first:border-l-0 border-blue-100 stroke-slate-500 text-slate-500  cursor-pointer ">
                                                {value.role}
                                            </td>

                                            <td className="h-12 px-6 text-md transition duration-300 border-t border-l first:border-l-0 border-blue-100 stroke-slate-500 text-slate-500 cursor-pointer ">
                                                {value.date}
                                            </td>
                                            <td   onClick={()=>deleteUser(value.id)} className="h-12 px-6 text-md transition duration-300 border-t border-l first:border-l-0 border-blue-100 stroke-slate-500 text-slate-500 cursor-pointer ">
                                                Delete
                                            </td>
                                        </tr>
                                    )
                                })
                            }

                        </tbody>
                    </table>
                </div>
                 {/* Pagination Controls */}
            <div className="pagination-controls my-4 flex justify-center">
                <button onClick={handlePrevPage} disabled={currentPage === 1} className="mx-2 p-2 bg-blue-500 text-white rounded">
                    Prev
                </button>
                {[...Array(totalPages)].map((_, index) => (
                    <button
                        key={index}
                        onClick={() => handlePageChange(index + 1)}
                        className={`mx-1 p-2 ${currentPage === index + 1 ? "bg-blue-800" : "bg-blue-500"} text-white rounded`}
                    >
                        {index + 1}
                    </button>
                ))}
                <button onClick={handleNextPage} disabled={currentPage === totalPages} className="mx-2 p-2 bg-blue-500 text-white rounded">
                    Next
                </button>
            </div>
            </div>
        </div>
    );
}

export default UserDetail;
