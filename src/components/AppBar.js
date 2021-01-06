import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import AccountCircle from '@material-ui/icons/AccountCircle';
import Switch from '@material-ui/core/Switch';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormGroup from '@material-ui/core/FormGroup';
import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';
import Button from '@material-ui/core/Button'
import { Link, useHistory } from "react-router-dom";
import ShoppingCartRoundedIcon from '@material-ui/icons/ShoppingCartRounded';
import LoginModal from './LoginModal'

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
}));

export default function MenuAppBar({ user, setUser }) {

  const classes = useStyles();

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
    }
  }, [setUser])

  const [auth, setAuth] = React.useState({ checked: (user) ? false : true });
  const [showLogin, setShowLogin] = useState(false)

  const [anchorEl, setAnchorEl] = React.useState(null);

  const history = useHistory()

  const open = Boolean(anchorEl);

  const handleChange = () => {
    if (!auth.checked) {
      console.log('checked');
      setShowLogin(true)
      setAuth({ checked: true })
    } else {
      console.log('unchecked');
      window.localStorage.removeItem('cart')
      window.localStorage.removeItem('loggedUser')
      setUser("")
      setAuth({ checked: false })
      setShowLogin(false)
    }
  };

  const handleSignOut = () => {
    window.localStorage.removeItem('cart')
    window.localStorage.removeItem('loggedUser')
    setUser("")
    setAuth({ checked: false })
    setShowLogin(false)
    setAnchorEl(null)
  }

  const handleMenu = event => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuCart = () => {
    history.push("/cart");
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <div className={classes.root}>
      {showLogin && <LoginModal user={user} setUser={setUser} />}
      <FormGroup>
        <FormControlLabel
          control={<Switch checked={auth.checked} onChange={handleChange} aria-label="login switch" />}
          label={user ? `${user.name} logged in` : 'Login'}
        />
      </FormGroup>

      <AppBar position="static">
        <Toolbar>
          <IconButton edge="start" className={classes.menuButton} color="inherit" aria-label="menu">
            <MenuIcon />
          </IconButton>
          <Button color="inherit" component={Link} to="/">
            Home
          </Button>
          <Button color="inherit" component={Link} to="/shop">
            Shop
            </Button>

          <Button color="inherit" component={Link} to="/blog">
            Blog
          </Button>

          {(user.username === 'qwerty') && (<>
            < Button color="inherit" component={Link} to="/_addingItem">
              add item to shop
                </Button>
            < Button color="inherit" component={Link} to="/_addingNewBlog">
              add new blog
                </Button>
          </>
          )}

          {(!user.username) && (
            < Button color="inherit" component={Link} to="/signup">
              Sign up
            </Button>
          )}

          {window.localStorage.getItem('cart') && (
            <div>
              <IconButton
                color='inherit'
                onClick={handleMenuCart}
              >
                <ShoppingCartRoundedIcon />
              </IconButton>
            </div>
          )}

          {user && (
            <div>
              <IconButton
                aria-label="account of current user"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                onClick={handleMenu}
                color="inherit"
              >
                <AccountCircle />
              </IconButton>
              <Menu
                id="menu-appbar"
                anchorEl={anchorEl}
                anchorOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                keepMounted
                transformOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                open={open}
                onClose={handleClose}
              >
                <MenuItem onClick={handleSignOut}>Sign out</MenuItem>
              </Menu>
            </div>
          )}
        </Toolbar>
      </AppBar>
    </div>
  );
}