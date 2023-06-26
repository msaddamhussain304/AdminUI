import React, { useEffect, useState } from "react";
import SearchBar from "./SerachBar";
import Table from "./Table";
import PaginationUI from "./PaginationUI";
import "../styles/AdminUI.css";
import config from "../config/config";

const AdminUI = () => {
  const [data, setData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [usersPerPage] = useState(10);
  const [searchQuery, setSearchQuery] = useState("");
  const [searchApiData, setSearchApiData] = useState([]);
  const [editingId, setEditingId] = useState(null);

  //   Definition of Data Structures used

  //  @typedef {Object} User - Data of all the users

  //  @property {string} name - The name of user
  //  @property {string} Email - The email id of user
  //  @property {string} Role - role of the user

  // Array of objects with complete data of all the users
  //    *
  //    * API endpoint - "GET /users"
  //    *
  //    * Example for successful response from backend:
  //    * HTTP 200
  //    * [
  // //    *      {
  //         "id": "1",
  //         "name": "Aaron Miles",
  //         "email": "aaron@mailinator.com",
  //         "role": "member"
  //     },
  //     {
  //         "id": "2",
  //         "name": "Aishwarya Naik",
  //         "email": "aishwarya@mailinator.com",
  //         "role": "member"
  //     }
  //  Example for failed response from backend:
  //   HTTP 500
  //   {
  //          "success": false,
  //          "message": "Something went wrong. Check the backend console for moren details"
  //     }
  // //

  //making API call using useEffect.
  const fetchData = () => {
    fetch(config.apiEndPoint)
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((dataRecieved) => {
        setData(dataRecieved);
        setSearchApiData(dataRecieved);
      })
      .catch((error) => {
        alert("Error fetching data:", error);
        // Handle the error or display an error message
      });
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <section className="adminui-container">
      <SearchBar
        searchApiData={searchApiData}
        setData={setData}
        setSearchQuery={setSearchQuery}
        searchQuery={searchQuery}
        data={data}
      />

      <Table
        data={data}
        setData={setData}
        currentPage={currentPage}
        usersPerPage={usersPerPage}
        setEditingId={setEditingId}
        editingId={editingId}
        setSearchApiData={setSearchApiData}
        searchApiData={searchApiData}
      />

      <PaginationUI
        setCurrentPage={setCurrentPage}
        usersPerPage={usersPerPage}
        setData={setData}
        currentPage={currentPage}
        data={data}
        setSearchApiData={setSearchApiData}
        searchApiData={searchApiData}
      />
    </section>
  );
};

export default AdminUI;
