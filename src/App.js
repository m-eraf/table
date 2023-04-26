import React, { useState } from "react";
import { nanoid } from "nanoid";
import "./App.css";
import data from "./data.json";
import Read from "./Read";

const App = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [contacts, setContacts] = useState(data);
  const [addFormData, setAddFormData] = useState({
    fullName: "",
    phoneNumber: "",
  });
  const handleAddFormChange = (event) => {
    event.preventDefault();

    const fieldName = event.target.getAttribute("name");
    const fieldValue = event.target.value;

    const newFormData = { ...addFormData };
    newFormData[fieldName] = fieldValue;

    setAddFormData(newFormData);
  };

  const handleAddFormSubmit = (event) => {
    event.preventDefault();

    const isDuplicate = contacts.some(
      (contact) =>
        contact.fullName === addFormData.fullName &&
        contact.phoneNumber === addFormData.phoneNumber
    );

    if (isDuplicate) {
      alert("Contact already exists!");
      return;
    }
    const newContact = {
      id: nanoid(),
      fullName: addFormData.fullName,
      phoneNumber: addFormData.phoneNumber,
    };

    const newContacts = [...contacts, newContact];
    setContacts(newContacts);
    setAddFormData({ fullName: "", phoneNumber: "" });
  };

  const handleDeleteClick = (contactId) => {
    const newContacts = [...contacts];

    const index = contacts.findIndex((contact) => contact.id === contactId);

    newContacts.splice(index, 1);

    setContacts(newContacts);
  };

  const sortedContacts = contacts
    .filter((contact) =>
      contact.fullName.toLowerCase().includes(searchTerm.toLowerCase())
    )
    .sort((a, b) => a.fullName.localeCompare(b.fullName));

  return (
    <div>
      <div className="hello">
        <form onSubmit={handleAddFormSubmit} className="add-form">
          <div className="form-row">
            <label htmlFor="fullName" className="form-label">Contact:</label>
            <input
              type="text"
              id="fullName"
              name="fullName"
              required="required"
              placeholder="Enter a name..."
              onChange={handleAddFormChange}
              className="form-input"
            />
          </div>
          <div className="form-row">
            <label htmlFor="phoneNumber" className="form-label">Phone Number:</label>
            <input
              type="text"
              id="phoneNumber"
              name="phoneNumber"
              required="required"
              placeholder="Enter a phone number..."
              onChange={handleAddFormChange}
              className="form-input"
            />
          </div>
          <div className="form-row">
            <button type="submit" className="form-btn">save</button>
          </div>
        </form>
      </div>

      <div className="helloo">
        <input
          type="text"
          placeholder="Search contacts..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="search-input"
        />
      </div>
<div className="helo">
<table class="contacts-table">
          <thead>
            <tr>
              <th>Name</th>
              <th>Phone Number</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {sortedContacts.map((contact) => (
              <Read
                contact={contact}
                handleDeleteClick={handleDeleteClick}
              />
            ))}
          </tbody>
        </table>
</div>
       

    </div>
  );
};

export default App;
