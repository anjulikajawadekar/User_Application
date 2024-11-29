import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import { fetchUsers } from "../redux/userSlice";
import { Link } from "react-router-dom";

const UserInfo = () => {
    const { id } = useParams(); // Get the user ID from the URL
    const dispatch = useDispatch();
    const { users, status } = useSelector((state) => state.users);

    useEffect(() => {
        if (status === "idle") {
            dispatch(fetchUsers());
        }
    }, [dispatch, status]);

    useEffect(() => {
        if (status === "succeeded") {
            console.log("Fetched Users:", users); // Assuming `users.data` contains the user list
        }
    }, [users, status]);


    // Find the selected user by ID
    const selectedUser = users?.find((user) => user.id.toString() === id);
    console.log(selectedUser)

    if (status === "loading") return <p>Loading...</p>;
    if (status === "failed") return <p>Error fetching user details.</p>;

    if (!selectedUser) {
        return <p>User not found!</p>;
    }

    return (

        <div className="container mt-4">
            <div className="card">
                <div className="card-header home-back">User Profile 
                    <span> 
                    <Link to={`/`} className="btn btn-primary btn-sm">
                    Home
                  </Link>
                    </span>
                </div>
                <div className="row">
                    <div className="col-6">
                        <div className="card-body">
                            {/* Personal Information */}
                            <h5>Personal Information</h5>
                            <ul className="list-group mb-3">
                                <li className="list-group-item">
                                    <strong>Name:</strong> {selectedUser.name}
                                </li>
                                <li className="list-group-item">
                                    <strong>Email:</strong> {selectedUser.email}
                                </li>
                                <li className="list-group-item">
                                    <strong>Phone:</strong> {selectedUser.phone}
                                </li>
                                <li className="list-group-item">
                                    <strong>Website:</strong>{" "}{selectedUser.website}
                                </li>
                            </ul>
                        </div>

                    </div>
                    <div className="col-6">
                        <div className="card-body">
                            {/* Address */}
                            <h5>Address</h5>
                            <ul className="list-group mb-3">
                                <li className="list-group-item">
                                    <strong>Street:</strong> {selectedUser.address.street}
                                </li>
                                <li className="list-group-item">
                                    <strong>Suite:</strong> {selectedUser.address.suite}
                                </li>
                                <li className="list-group-item">
                                    <strong>City:</strong> {selectedUser.address.city}
                                </li>
                                <li className="list-group-item">
                                    <strong>Zipcode:</strong> {selectedUser.address.zipcode}
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>


                <div className="card-body">
                    
                    {/* Company */}
                    <h5>Company Details</h5>
                    <ul className="list-group">
                        <li className="list-group-item">
                            <strong>Name:</strong> {selectedUser.company.name}
                        </li>
                        <li className="list-group-item">
                            <strong>Catchphrase:</strong> {selectedUser.company.catchPhrase}
                        </li>
                        <li className="list-group-item">
                            <strong>Business:</strong> {selectedUser.company.bs}
                        </li>
                    </ul>

                    {/* <p>
                        <strong>Name : </strong> {selectedUser.name}
                    </p>
                    <p>
                        <strong>Email:</strong> {selectedUser.email}
                    </p>
                    <p>
                        <strong>Phone:</strong> {selectedUser.phone}
                    </p>
                    <p>
                        <strong>Email:</strong> {selectedUser.addres}
                    </p>
                    <p>
                        <strong>Email:</strong> {selectedUser.website}
                    </p> */}
                    {/* Add more fields as necessary */}
                </div>
            </div>
        </div>
    );
};

export default UserInfo;
