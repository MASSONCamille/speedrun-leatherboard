import React from "react";
import { Nav, Navbar as BNavbar, NavLink as BNavLink, NavDropdown, Dropdown } from "react-bootstrap";
import { NavLink } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { isUserConnected } from "../../store/selectors/user";
import { userActions } from "../../store/reducers/user";

import "./navbar.scss";

function Navbar() {
    const dispatch = useDispatch();
    const connected = useSelector(isUserConnected);

    const onLogout = function() {
        dispatch(userActions.logout());
    };

    return (
        <BNavbar bg="dark" variant="dark" expand="lg" className="c-navbar">
            <BNavbar.Brand href="#home">Speedrun Leatherboard</BNavbar.Brand>
            <BNavbar.Toggle aria-controls="basic-navbar-nav" />
            <BNavbar.Collapse id="basic-navbar-nav">
                <Nav className="mr-auto">
                    <NavLink to="/" className="nav-link" activeClassName="active">
                        Home
                    </NavLink>
                </Nav>
                <Nav>
                    {connected ? (
                        <>
                            <NavDropdown title="Admin" id="basic-nav-dropdown" alignRight>
                                <NavLink to="/quest-editor" className="dropdown-item">
                                    Quest Editor
                                </NavLink>
                            </NavDropdown>
                            <BNavLink onClick={onLogout}>Logout</BNavLink>
                        </>
                    ) : (
                        <NavLink to="/login" className="nav-link" activeClassName="active">
                            Login
                        </NavLink>
                    )}
                </Nav>
            </BNavbar.Collapse>
        </BNavbar>
    );
}

export default Navbar;
