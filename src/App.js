import React, { useState, useEffect } from "react";
import {
  Container,
  Button,
  AppBar,
  Toolbar,
  IconButton,
} from "@material-ui/core";
import {
  Switch,
  Route,
  Link
} from "react-router-dom";
import Home from './components/Home'
import Work from './components/Work'
import Blog from './components/Blog'
import Shop from './components/Shop'
import Contacts from './components/Contacts'
import Login from './components/Login'
import SignUp from './components/SignUp'
import AddNewItem from './components/AddNewItem'
import { makeStyles } from '@material-ui/core/styles';
import MenuIcon from '@material-ui/icons/Menu';
import CartTest from "./components/CartTest";
import CheckOut from './components/CheckOut'

const App = () => {

  const [user, setUser] = useState("");

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
    }
  }, [])

  const handleSignOut = () => {
    window.localStorage.removeItem('cart')
    window.localStorage.removeItem('loggedUser')
    setUser("")
  }

  const useStyles = makeStyles((theme) => ({
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

  const classes = useStyles();

  return (
    <>
      <Container>
        <div className={classes.root}>
          <AppBar position="static">
            <Toolbar>
              <IconButton edge="start" className={classes.menuButton} color="inherit" aria-label="menu">
                <MenuIcon />
              </IconButton>
              <Button color="inherit" component={Link} to="/">
                home
              </Button>
              <Button color="inherit" component={Link} to="/cart">
                cart
              </Button>
              <Button color="inherit" component={Link} to="/work">
                work
              </Button>
              <Button color="inherit" component={Link} to="/shop">
                shop
              </Button>
              <Button color="inherit" component={Link} to="/blog">
                blog
              </Button>
              <Button color="inherit" component={Link} to="/_addingItem">
                add item to shop
              </Button>
              <Button color="inherit" component={Link} to="/contacts">
                contacts
              </Button>
              {!user &&
                (<Button color="inherit" component={Link} to="/signup">
                  SignUp
                </Button>)}
              {user && (<Button onClick={handleSignOut} color="inherit" component={Link} to="/signout">
                Sign out
              </Button>)}
              {user && (
                <div> {user.name} logged in </div>
              )}
              {!user && (<Button color="inherit" component={Link} to="/login">
                login
              </Button>)}
            </Toolbar>
          </AppBar>

          <Switch>
            <Route exact path="/work">
              <Work />
            </Route>
            <Route exact path="/shop">
              <Shop />
            </Route>
            <Route exact path="/blog">
              <Blog />
            </Route>
            <Route exact path="/cart">
              <CartTest />
            </Route>
            <Route exact path="/contacts">
              <Contacts />
            </Route>
            <Route exact path="/signup">
              <SignUp />
            </Route>
            <Route exact path="/_addingItem">
              <AddNewItem />
            </Route>
            <Route exact path="/login">
              <Login user={user} setUser={setUser} />
            </Route>
            <Route exact path="/checkout" component={CheckOut} />

            <Route exact path="/">
              <Home />
            </Route>
          </Switch>

          <div>
            <br />
          </div>
        </div>
      </Container>
    </>
  );
};

export default App;
