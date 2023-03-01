import { useState } from 'react';
import axios from 'axios';

const AddressList = (props) => {
  const [newAddress, setNewAddress] = useState('');

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
        })
        .catch((error) => {
          if (error.response) {
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
      {props.addressData === null && (
        <p>When you save addresses to your profile they will show up here. </p>
      )}
      <ul className='addressList'></ul>
      <p>Add a location to your address book: </p>
      <input
        type='text'
        id='addressField'
        placeholder='enter an address'
        value={newAddress}
        onChange={onAddressChange}
      ></input>
      <button onClick={onSubmitAddress}>Save</button>
    </section>
  );
};

export default AddressList;
