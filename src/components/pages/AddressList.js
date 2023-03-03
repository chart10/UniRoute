import React from 'react';
import { useState } from 'react';
import { useOutletContext } from 'react-router-dom';
import axios from 'axios';

const AddressList = (props) => {
  const [newAddress, setNewAddress] = useState('');
  const [addressData, setAddressData] = useOutletContext();
  const [errorMessage, setErrorMessage] = useState('');

  const onAddressChange = (event) => {
    setNewAddress(event.target.value);
  };

  const onSubmitAddress = (event) => {
    if (newAddress !== '') {
      //send newAddress string to backend with '/save_address'
      axios({
        method: 'POST',
        url: '/save_address',
        headers: {
          // checks if user is authorized to get data
          Authorization: 'Bearer ' + localStorage.getItem('token'),
        },
        data: {
          address: newAddress,
        },
      })
        .then((response) => {
          console.log(response);
          setErrorMessage("SUCCESSFULLY ADDED ADDRESS!!");
        })
        .catch((error) => {
          if (error.response) {
            setErrorMessage("FAILED TO SAVE ADDRESS! TRY AGAIN.");
            console.log(error.response);
            console.log(error.response.status);
            console.log(error.response.headers);
          }
        });
    }
  };
  return (
    <section>
      <h2>Address Book</h2>
      <ul className='addressList'></ul>
      {props.addressData === null ? (
        <p>When you save addresses to your profile they will show up here. </p>
      ) : (
        <ul className='addressList'>
          {props.addressData.map((address) => (
            <li>{address}</li>
          ))}
        </ul>
      )}
      {/* {props.addressData !== null && <></>} */}

      <p>Add a location to your address book: </p>
      <input
        type='text'
        id='addressField'
        placeholder='enter an address'
        value={newAddress}
        onChange={onAddressChange}
      ></input>
      <button onClick={onSubmitAddress}>Save</button>
      {errorMessage && (
        <p className='error'> {errorMessage} </p>
      )}
    </section>
  );
};

export default AddressList;