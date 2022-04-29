import React from 'react';
import logo from './logo.svg';
import './App.css';
import { tabelData } from "./utils";
import Modal from 'react-modal';

const customStyles = {
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    minWidth: '500px',
    minHeight: '300px',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)',
  },
};

function App() {
  const [modalIsOpen, setIsOpen] = React.useState(false);

  const [firstName, setFirstName] = React.useState("");
  const [lastName, setLastName] = React.useState("");
  const [gender, setGender] = React.useState("");
  const [selectedInsurancePackage, setselectedInsurancePackage] = React.useState("");

  function openModal() {
    setIsOpen(true);
  }

  function afterOpenModal() {
    // references are now sync'd and can be accessed.
    // subtitle.style.color = '#f00';
  }

  function closeModal() {
    setIsOpen(false);
  }

  async function submitFrom(e) {
    e.preventDefault();
    try {
      await fetch('www.example.com.', {
        selectedInsurancePackage,
        firstName,
        lastName,
        gender
      })
      closeModal();
      setFirstName("");
      setLastName("");
      setGender("");
    } catch (e) {
      closeModal();
    }
  }

  return (
    <div className="App">
      <h1>YouSet - Technical Assignment</h1>
      <table>
        <thead>
          <th>Package</th>
          <th>Insurer Name</th>
          <th>Description</th>
          <th>Price / month</th>
          <th>Action</th>
        </thead>
        <tbody>
          {tabelData.map((insurance) => <tr>
            <td>{insurance.packageName}</td>
            <td>{insurance.insuranceName}</td>
            <td>{insurance.description}</td>
            <td>{insurance.price}</td>
            <td><button onClick={() => {
              setselectedInsurancePackage(insurance.packageName)
              openModal()
            }}>Buy</button></td>
          </tr>)}
        </tbody>
      </table>
      <Modal
        isOpen={modalIsOpen}
        onAfterOpen={afterOpenModal}
        onRequestClose={closeModal}
        style={customStyles}
        contentLabel="Example Modal"
      >
        <h2>Buy Insurance</h2>
        {/* <button onClick={closeModal}>X</button> */}
        <form onSubmit={(e) => submitFrom(e)}>
          <label for="fname">First Name</label>
          <input value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
            type="text" id="fname" name="firstname" placeholder="Your name.." />

          <label for="lname">Last Name</label>
          <input value={lastName}
            onChange={(e) => setLastName(e.target.value)}
            type="text" id="lname" name="lastname" placeholder="Your last name.." />

          <label for="gender">Gender</label>
          <select value={gender} onChange={(e) => {
            setGender(e.target.value);
          }} id="gender" name="gender">
            <option value="male">Male</option>
            <option value="female">Female</option>
          </select>

          <input disabled={!firstName || !lastName || !gender} type="submit" value="Submit" />
        </form>
      </Modal>
    </div>
  );
}

export default App;
