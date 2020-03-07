import bind from "@chbrown/bind";
import axios from "axios";
import React from "react";
import { Nav, Navbar } from "react-bootstrap";
import { NavLink, Route, Switch } from "react-router-dom";
import Login from "./components/login";
import { InputReference } from "./util-types";
import Quest from "./components/quest";

class App extends React.Component {

  render() {
    return (
      <>
        <Navbar bg="light" expand="lg">
          <Navbar.Brand href="#home">Speedrun Leatherboard</Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="mr-auto">
              <NavLink to="/" className="nav-link" activeClassName="active">
                Home
              </NavLink>
              <NavLink to="/quest" className="nav-link" activeClassName="active">
                Quest
              </NavLink>
            </Nav>
            <Nav>
            <NavLink to="/login" className="nav-link" activeClassName="active">
              Login
            </NavLink>
            </Nav>
          </Navbar.Collapse>
        </Navbar>

        <Switch>
          <Route path="/login">
            <Login />
          </Route>
          <Route path="/quest">
            <Quest/>
          </Route>
          <Route path="/">home</Route>
        </Switch>
      </>
    );
  }
}

export default App;
