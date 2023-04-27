import React, { useState } from "react";
import { nanoid } from "nanoid";
import "./App.css";
import { Modal, message } from 'antd';
import data from "./data.json";

const App = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [contacts, setContacts] = useState(data);
  const [addFormData, setAddFormData] = useState({
    firstName: "",
    lastName: "",
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
        contact.fullName === `${addFormData.firstName} ${addFormData.lastName}` &&
        contact.phoneNumber === addFormData.phoneNumber
    );
  
    if (isDuplicate) {
      message.error("Name already exists!", [0.7]);
      return;
    }
  
    const newContact = {
      id: nanoid(),
      fullName: `${addFormData.firstName} ${addFormData.lastName}`,
      phoneNumber: addFormData.phoneNumber,
    };
  
    const newContacts = [...contacts, newContact];
    setContacts(newContacts);
    setAddFormData({ firstName: "", lastName: "", phoneNumber: "" });
  };

  const handleDeleteClick = (contactId) => {
    Modal.confirm({
      title: 'Are you sure you want to delete this contact?',
      onOk() {
        const newContacts = [...contacts];
  
    const index = contacts.findIndex((contact) => contact.id === contactId);
  
    newContacts.splice(index, 1);
  
    setContacts(newContacts);
  
    message.success("Contact deleted successfully!",[1]);
      },
      onCancel() {
      },
    });
  };
  
  const sortContacts = () => {
    const sortedContacts = [...contacts].sort((a, b) =>
      a.fullName.localeCompare(b.fullName)
    );
    setContacts(sortedContacts);
  };
  
  return (
    <div>
      <div className="hello">
      <form onSubmit={handleAddFormSubmit} className="add-form">
  <div className="form-row">
    <div className="form-column">
      <label htmlFor="firstName" className="form-label">First Name</label>
      <input
        type="text"
        id="firstName"
        name="firstName"
        required="required"
        placeholder="Enter a first name..."
        onChange={handleAddFormChange}
        className="form-input"
      />
    </div>
    <div className="form-column">
      <label htmlFor="lastName" className="form-label">Last Name</label>
      <input
        type="text"
        id="lastName"
        name="lastName"
        required="required"
        placeholder="Enter a last name..."
        onChange={handleAddFormChange}
        className="form-inputt"
      />
    </div>
  </div>
    <label htmlFor="phoneNumber" className="form-labell" >
      Phone Number
    </label>
    <input
      type="text"
      id="phoneNumber"
      name="phoneNumber"
      required="required"
      placeholder="Enter a phone number..."
      onChange={handleAddFormChange}
      className="form-inputtt"
    />
  <div className="form-row">
    <button type="submit" className="form-btn">
      Save
    </button>
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
              <th>S.N</th>
              <th><button type="button" onClick={sortContacts}>Name</button></th>
              <th>Phone Number</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {
              contacts.map((data, index) => {
                return (
                  <tr key={index}>
                    <td>{index + 1}</td>
                    <td>{data.fullName}</td>
                    <td>{data.phoneNumber}</td>
                    <div className="jj">
                    <button type="button"  className="form-btnn" onClick={handleDeleteClick}>Delete</button>
                    </div>
                  </tr>
                )
              })
            }
          </tbody>
        </table>

      </div>
    </div>
  );
};

export default App;
