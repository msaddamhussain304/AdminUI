import React, { useState } from "react";

const EditUserRow = ({
  data,
  setData,
  item,
  setSearchApiData,
  setEditingId,
  searchApiData,
}) => {
  //saveEditData is a state variable to save the edited data
  const [saveEditData, setSaveEditData] = useState(item);

  //Funtinality to perform dynamic updates of user details by modifying the corresponding field value for a specific user.
  const handleInputChange = (id, field, value) => {
    setSaveEditData((data) => {
      return { ...data, [field]: value };
    });
  };

  const validateInput = () => {
    for (let keys in saveEditData) {
      if (saveEditData[keys] === "") {
        return false;
      }
    }
    return true;
  };

  //Funtinality to update the data after editing.
  const handleUpdate = (id) => {
    if (validateInput() === false) {
      alert("input field should not be empty");
    } else {
      const updatedData = data.map((item) => {
        if (item.id === id) {
          return {
            ...saveEditData,
          };
        }
        return item;
      });

      const updateSearchApiData = searchApiData.map((item) => {
        if (item.id === id) {
          return {
            ...saveEditData,
          };
        }
        return item;
      });
      setData(updatedData);
      setSearchApiData(updateSearchApiData);
    }

    setEditingId(null);
    // Perform the update logic, such as making API calls or updating the state.
  };

  return (
    <>
      <td>
        <input
          type="text"
          value={saveEditData.name}
          onChange={
            (e) => handleInputChange(item.id, "name", e.target.value) // calling handleInputChange funtion to change name
          }
        />
      </td>
      <td>
        <input
          type="text"
          value={saveEditData.email}
          onChange={
            (e) => handleInputChange(item.id, "email", e.target.value) //calling handleInputChange funtion to change email
          }
        />
      </td>
      <td>
        <input
          type="text"
          value={saveEditData.role}
          onChange={
            (e) => handleInputChange(item.id, "role", e.target.value) //calling handleInputChange funtion to change role
          }
        />
      </td>
      <td>
        <button className="check-mark" onClick={() => handleUpdate(item.id)}>
          {String.fromCharCode(10003)}
        </button>
      </td>
    </>
  );
};

export default EditUserRow;
