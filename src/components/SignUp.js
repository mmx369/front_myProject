import React, { useState } from "react";
import {
  TextField,
  Button,
} from "@material-ui/core";
import userServices from '../services/users'

const SignUp = (props) => {

  const [newName, setNewName] = useState("");
  const [newUsername, setNewUsername] = useState("");
  const [newEmail, setNewEmail] = useState("");
  const [newPassword, setNewPassword] = useState("");


  const handleNewName = (event) => {
    setNewName(event.target.value);
  };

  const handleNewUsername = (event) => {
    setNewUsername(event.target.value);
  };

  const handleNewEmail = (event) => {
    setNewEmail(event.target.value);
  };

  const handleNewPassword = (event) => {
    setNewPassword(event.target.value);
  };


  const addNewUser = (event) => {
    event.preventDefault();

    const newUser = {
      name: newName,
      username: newUsername,
      password: newPassword,
      email: newEmail
    }

    userServices.createNewUser(newUser).then((data) => console.log(2222, data)).catch((e) => console.log('Error: ', e))

  };

  return (
    <div>
      <h2>Sign Up</h2>
      <form onSubmit={addNewUser}>

        <div>
          <TextField value={newName} onChange={handleNewName} label="name" />
        </div>
        <div>
          <TextField value={newUsername} onChange={handleNewUsername} label="username" />
        </div>
        <div>
          <TextField value={newPassword} onChange={handleNewPassword} label="password" type="password" />
        </div>
        <div>
          <TextField value={newEmail} onChange={handleNewEmail} label="e-mail" />
        </div>

        <div>
          <Button variant="contained" color="primary" type="submit">
            Sign Up
            </Button>
        </div>
      </form>
    </div>
  );
};

export default SignUp