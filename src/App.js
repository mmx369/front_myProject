import React, { useState, useEffect } from "react";
import { Container } from "@material-ui/core";
import {
  Switch,
  Route
} from "react-router-dom";
import Home from './components/Home'
import Work from './components/Work'
import BlogList from './components/BlogList'
import Shop from './components/Shop'
import SignUp from './components/SignUp'
import AddNewItem from './components/AddNewItem'
import CartTest from "./components/CartTest";
import CheckOut from './components/CheckOut'
import AddNewBlog from './components/AddNewBlog'
import AppBar from './components/AppBar'
import blogService from './services/blog'

const App = () => {

  const [user, setUser] = useState("");

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem("loggedUser");
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON);
      setUser(user);
      blogService.setToken(user.token);
    }
  }, []);

  return (
    <>
      <AppBar user={user} setUser={setUser} />
      <Container>
        <Switch>
          <Route exact path="/work" component={Work} />
          <Route exact path="/shop" component={Shop} />
          <Route exact path="/blog" component={BlogList} />
          <Route exact path="/cart" component={CartTest} />
          <Route exact path="/signup" component={SignUp} />
          <Route exact path="/_addingItem" component={AddNewItem} />
          <Route exact path="/_addingNewBlog">
            <AddNewBlog author={user.username} />
          </Route>
          <Route exact path="/checkout" component={CheckOut} />
          <Route exact path="/">
            <Home />
          </Route>
        </Switch>
      </Container>
    </>
  );
};

export default App;
