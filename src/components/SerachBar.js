import React from "react";
import "../styles/SearchBar.css"
const SearchBar = ({ setData, searchApiData, setSearchQuery, searchQuery,data }) => {
  const handleSearch = (e) => {
    const searchQuery = e.target.value;
    if (searchQuery === "") {
      setData(searchApiData);
    } else {
      const filteredData = searchApiData.filter(
        (item) =>
          item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          item.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
          item.role.toLowerCase().includes(searchQuery.toLowerCase())
      );
      setData(filteredData); //returning the data after performing search funtion.
    }
    setSearchQuery(searchQuery);
  };

  return (
    <section className="search-bar-container">
      <input
        className="searchbar" //returning the search funtinality
        type="text"
        placeholder="Search by Role, ID, or Email"
        value={searchQuery} //filterVal
        onChange={(e) => handleSearch(e)}
      />
      {data.length===0 && <h3>No Data Found</h3>}
    </section>
  );
};

export default SearchBar;
