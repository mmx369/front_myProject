import React, { useState } from "react";
import { useSelector } from 'react-redux'
import {
  TextField,
  Button,
} from "@material-ui/core";
import cartServices from '../services/cart'
import Select from '../components/Select'

const CheckOut = () => {

  const [country, setNewCountry] = useState("");
  const [firstName, setNewFirstName] = useState("");
  const [secondName, setNewSecondName] = useState("");
  const [address, setNewAddress] = useState("");
  const [city, setNewCity] = useState("");
  const [state, setNewState] = useState("");
  const [zip, setNewZip] = useState("");
  const [phone, setNewPhone] = useState("");

  const handleFirstName = (event) => {
    setNewFirstName(event.target.value);
  };
  const handleSecondName = (event) => {
    setNewSecondName(event.target.value);
  };
  const handleAddress = (event) => {
    setNewAddress(event.target.value);
  };
  const handleCity = (event) => {
    setNewCity(event.target.value);
  };
  const handleState = (event) => {
    setNewState(event.target.value);
  };
  const handleZipCode = (event) => {
    setNewZip(event.target.value);
  };
  const handlePhone = (event) => {
    setNewPhone(event.target.value);
  };

  const order = useSelector(state => state.cartR)

  const makeNewOder = (event) => {
    event.preventDefault();

    const newOrder = {
      order,
      country,
      firstName,
      secondName,
      address,
      city,
      state,
      zip,
      phone
    }

    cartServices.createNewOrder(newOrder).then((data) => console.log(2222, data)).catch((e) => console.log('Error: ', e))

  };

  return (
    <div>
      <h1>shipping address</h1>
      <form onSubmit={makeNewOder}>

        <Select country={country} setNewCountry={setNewCountry} />

        <div>
          <TextField value={firstName} onChange={handleFirstName} label="first name" />
        </div>
        <div>
          <TextField value={secondName} onChange={handleSecondName} label="first name" />
        </div>
        <div>
          <TextField value={address} onChange={handleAddress} label="address" />
        </div>
        <div>
          <TextField value={city} onChange={handleCity} label="city" />
        </div>
        <div>
          <TextField value={state} onChange={handleState} label="state" />
        </div>
        <div>
          <TextField value={zip} onChange={handleZipCode} label="zip code" />
        </div>
        <div>
          <TextField value={phone} onChange={handlePhone} label="phone number" />
        </div>
        <br />
        <div>
          <Button variant="contained" color="primary" type="submit">
            Sign Up
            </Button>
        </div>
      </form>

    </div>
  )
}

export default CheckOut
