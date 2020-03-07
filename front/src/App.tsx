import bind from "@chbrown/bind";
import axios from "axios";
import React from "react";
import { Nav, Navbar } from "react-bootstrap";
import { NavLink, Route, Switch } from "react-router-dom";
import Login from "./components/login";
import { InputReference } from "./util-types";

class App extends React.Component {
  key = React.createRef<InputReference>();
  email = React.createRef<InputReference>();
  password = React.createRef<InputReference>();

  @bind
  onSubmit(event: React.FormEvent) {
    event.preventDefault();
    axios
      .post(`/authentication`, {
        email: "",
        password: "",
        strategy: "local"
      })
      .then(() => alert("ok"))
      .catch(err => console.error(err));
  }

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
            </Nav>
            <NavLink to="/login" className="nav-link" activeClassName="active">
              Login
            </NavLink>
          </Navbar.Collapse>
        </Navbar>

        <Switch>
          <Route path="/login">
            <Login />
          </Route>
          <Route path="/">home</Route>
        </Switch>
      </>
    );
  }
}

export default App;
