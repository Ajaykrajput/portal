import React, { useState, useEffect } from "react";
import { Link, useParams, useHistory } from "react-router-dom";
import axios from "axios";
// import EditUser from "./EditUser";

const User = () => {
  let history = useHistory();

  const [user, setUser] = useState({
    name: "",
    issue: "",
    email: "",
    phone: "",
    webiste: "",
    address: "",
  });
  const { id } = useParams();
  useEffect(() => {
    const loadUser = async () => {
      const res = await axios.get(`http://localhost:3003/users/${id}`);
      setUser(res.data);
    };
    loadUser();
  }, []);

  const edit = () => {
    history.push(`/users/edit/${id}`);
  };
  return (
    <div className="container py-4">
      <div className="d-flex justify-content-end m-2">
        <Link className="btn btn-primary" to="/">
          back to Home
        </Link>
        &nbsp;
        <button onClick={() => edit()} className="btn btn-success">
          Edit
        </button>
      </div>

      <h1 className="display-4">User Id: {id}</h1>
      <hr />
      <ul className="list-group">
        <li className="list-group-item">name: {user.name}</li>
        <li className="list-group-item">user issue: {user.issue}</li>
        <li className="list-group-item">email: {user.email}</li>
        <li className="list-group-item">phone: {user.phone}</li>
        <li className="list-group-item">website: {user.website}</li>
      </ul>
    </div>
  );
};

export default User;
