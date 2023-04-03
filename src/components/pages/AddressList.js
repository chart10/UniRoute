import React, { useState } from 'react';
import { useOutletContext } from 'react-router-dom';
import PropTypes from 'prop-types';
import axios from 'axios';

const AddressList = (props) => {
  const { addressData, setAddressData } = useOutletContext()[0];
  const [newAddress, setNewAddress] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const onAddressChange = (event) => {
    setNewAddress(event.target.value);
  };

  const onSubmitAddress = () => {
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
          setErrorMessage('SUCCESSFULLY ADDED ADDRESS!!');
        })
        .catch((error) => {
          if (error.response) {
            setErrorMessage('FAILED TO SAVE ADDRESS! TRY AGAIN.');
            console.log(error.response);
            console.log(error.response.status);
            console.log(error.response.headers);
          }
        });
      setAddressData([...addressData, newAddress]);
    }
  };

  const removeAddress = (address) => {
    axios({
      method: 'POST',
      url: '/remove_address',
      headers: {
        Authorization: 'Bearer ' + localStorage.getItem('token'),
      },
      data: {
        address: address,
      },
    })
      .then((response) => {
        setErrorMessage('SUCCESSFULLY REMOVED ADDRESS!!');
      })
      .catch((error) => {
        if (error.response) {
          setErrorMessage('FAILED TO REMOVE ADDRESS! TRY AGAIN.');
          console.log(error.response);
          console.log(error.response.status);
          console.log(error.response.headers);
        }
      });
    const updatedList = addressData.filter((item) => item !== address);
    setAddressData(updatedList);
  };

  return (
    <section>
      <h2>Address Book</h2>
      <ul className='addressList'></ul>
      {addressData === null ? (
        <p>When you save addresses to your profile they will show up here. </p>
      ) : (
        <ul className='addressList'>
          {addressData.map((address, index) => (
            <li key={'address_' + index} className='userAddress'>
              <p>{address}</p>
              <button onClick={() => removeAddress(address)}>Remove</button>
            </li>
          ))}
        </ul>
      )}
      <p>Add a location to your address book: </p>
      <input
        type='text'
        id='addressField'
        placeholder='enter an address'
        value={newAddress}
        onChange={onAddressChange}
      ></input>
      <button onClick={onSubmitAddress}>Save</button>
      {errorMessage && <p className='error'> {errorMessage} </p>}
    </section>
  );
};

AddressList.propTypes = {
  addressData: PropTypes.array,
};

export default AddressList;
