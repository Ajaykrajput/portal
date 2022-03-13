import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const Home = () => {
  const [users, setUser] = useState([]);

  useEffect(() => {
    loadUsers();
  }, []);

  const loadUsers = async () => {
    const result = await axios.get("http://localhost:3003/users");
    setUser(result.data.reverse());
  };

  const deleteUser = async (id) => {
    await axios.delete(`http://localhost:3003/users/${id}`);
    loadUsers();
  };

  return (
    <div className="container">
      <div className="py-4 table-responsive-sm">
        <h1>Raise Your issue here.</h1>
        <table className="table border shadow ">
          <thead className="thead-dark">
            <tr>
              <th scope="col">#</th>
              <th scope="col">Name</th>
              <th scope="col">User Issue</th>
              <th scope="col">Email</th>
              <th className="d-none d-md-block">Action</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user, index) => (
              <tr key={index}>
                <th scope="row">{index + 1}</th>
                <td>{user.name}</td>
                <td className="panel-heading">{user.issue}</td>
                <td>{user.email}</td>
                <td className="d-none d-md-block d-inline-flex">
                  <div className="d-inline-flex">
                    <Link
                      className="btn btn-primary mr-2"
                      to={`/users/${user.id}`}
                    >
                      View
                    </Link>
                    &nbsp;&nbsp;
                    <Link
                      className="btn btn-outline-success mr-2"
                      to={`/users/edit/${user.id}`}
                    >
                      Edit
                    </Link>
                    &nbsp;&nbsp;
                    <Link
                      className="btn btn-danger"
                      onClick={() => deleteUser(user.id)}
                    >
                      Delete
                    </Link>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Home;
