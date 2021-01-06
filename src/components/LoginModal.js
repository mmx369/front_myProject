import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';
import {
  TextField,
  Button,
} from "@material-ui/core";
import loginService from '../services/login'


const useStyles = makeStyles(theme => ({
  modal: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  paper: {
    backgroundColor: theme.palette.background.paper,
    border: '2px solid #000',
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },
}));

export default function TransitionsModal({ user, setUser }) {
  const classes = useStyles();
  
  const [open, setOpen] = React.useState(true);

  const [loginName, setLoginName] = useState("");
  const [loginPassword, setLoginPassword] = useState("");

  const handleChangeName = (event) => {
    setLoginName(event.target.value);
  };

  const handleChangePassword = (event) => {
    setLoginPassword(event.target.value);
  };


  const handleLogin = async (event) => {
    event.preventDefault();

    console.log("logging in with", loginName, loginPassword);

    try {
      user = await loginService.login({
        username: loginName,
        password: loginPassword
      });

      window.localStorage.setItem("loggedUser", JSON.stringify(user));

      setUser(user);
      setLoginName("");
      setLoginPassword("");
      setOpen(false)
    } catch (e) { console.log(e) }
  };

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>
      {/* <button type="button" onClick={handleOpen}>
        react-transition-group
      </button> */}
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        className={classes.modal}
        open={open}
        onClose={handleClose}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={open}>
          <div className={classes.paper}>
            <form onSubmit={handleLogin}>
              <div>
                <TextField value={loginName} onChange={handleChangeName} label="username" />
              </div>
              <div>
                <TextField value={loginPassword} onChange={handleChangePassword} label="password" type="password" />
              </div>
              <div>
                <Button variant="contained" color="primary" type="submit">
                  Login
            </Button>
              </div>
            </form>
          </div>
        </Fade>
      </Modal>
    </div>
  );
}