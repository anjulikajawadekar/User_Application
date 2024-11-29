import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchUsers } from "../redux/userSlice";
import { Link } from "react-router-dom";
import SearchBar from "../components/SearchBar";

const UserList = () => {
  const dispatch = useDispatch();
  const { users, status, error } = useSelector((state) => state.users);

  const [searchTerm, setSearchTerm] = useState(""); // State for the search term
  const [filteredUsers, setFilteredUsers] = useState([]); // State for filtered users

  useEffect(() => {
    if (status === "idle") {
      dispatch(fetchUsers());
      // console.log(users);
    }
  }, [dispatch, status]);

  // Filter users based on search term
  // useEffect(() => {


  //   if (users?.data) {
  //     if (searchTerm.trim() === "") {
  //       setFilteredUsers(users.data);
  //     } else {

  //       const filtered = users.data.filter(
  //         (user) =>
  //           user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
  //           user.email.toLowerCase().includes(searchTerm.toLowerCase())
  //       );
  //       setFilteredUsers(filtered);

  //     }      
  //   }
  // }, [searchTerm, users]);


  // Log users when they are updated
  useEffect(() => {
    if (status === "succeeded") {
      console.log("Fetched Users:", users); // Assuming `users.data` contains the user list
    }
  }, [users, status]);

  if (status === "loading") return <p>Loading...</p>;
  if (status === "failed") return <p>Error: {error}</p>;

  return (

    <div className="container-fluid">
      <div className="navbar navbar-expand-lg navbar-light bg-light">
        <h4 className="navbar-title">Users List</h4>
      </div>
      {/* <h1>Users List</h1> */}
      {/* Search Input */}
      <div className="mb-3">
        <input
          type="text"
          className="form-control"
          placeholder="Search by name or email..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>
      <div>
        <table className="table table-striped table-bordered">
          <thead>
            <tr>
              <th>#</th>
              <th>User Name</th>
              <th>Email</th>
              <th>Phone</th>
              <th>Website</th>
              <th>View Details</th>
            </tr>
          </thead>

          <tbody>
            {(searchTerm.trim() === "" ? users : users?.filter(
              (user) =>
                user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
                user.phone.toLowerCase().includes(searchTerm.toLowerCase()) ||
                user.website.toLowerCase().includes(searchTerm.toLowerCase())
              )
            )?.map((user, index) => (
              <tr key={user.id}>
                <td>{index + 1}</td>
                <td>{user.name}</td>
                <td>{user.email}</td>
                <td>{user.phone}</td>
                <td>{user.website}</td>
                <td>
                  <Link to={`/user_info/${user.id}`} className="btn btn-primary btn-sm">
                    View
                  </Link>
                </td>
              </tr>
            ))}

            {/* {users?.map((user, index) => (
              <tr key={user.id}>
                <td>{index + 1}</td>
                <td>{user.name}</td>
                <td>{user.email}</td>
                <td>{user.phone}</td>
                <td>{user.website}</td>
                <td>
                  <Link to={`/users/${user.id}`} className="btn btn-primary btn-sm">
                    View
                  </Link>
                </td>
              </tr>
            ))} */}


          </tbody>
        </table>
      </div>
    </div>

    // <div className="container mx-auto p-4">
    //   <SearchBar />
    //   <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
    //     {users.map((user) => (
    //       <div key={user.id} className="p-4 bg-white shadow rounded">
    //         <h3 className="font-bold text-xl">{user.name}</h3>
    //         <p>{user.email}</p>
    //         <p>{user.phone}</p>
    //         <p>{user.company.name}</p>
    //         <Link to={`/users/${user.id}`} className="text-blue-500 underline">
    //           View Details
    //         </Link>
    //       </div>
    //     ))}
    //   </div>
    // </div>

  );
};

export default UserList;
