import React, { useRef } from "react";
import { Button, Container, Form } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { Redirect } from "react-router";
import { isUserConnected, hasLoginFailed } from "../../store/selectors/user";
import { InputReference } from "../../util-types";
import { userActions } from "../../store/reducers/user";

function Login() {
    // Hooks
    const connected = useSelector(isUserConnected);
    const loginFailed = useSelector(hasLoginFailed);
    const dispatch = useDispatch();
    const nameRef = useRef<InputReference>(),
        passwordRef = useRef<InputReference>();

    // Rest
    if (connected) {
        return <Redirect to="/" />;
    }

    const onSubmit = function(event: React.FormEvent) {
        event.preventDefault();

        const name = nameRef.current.value;
        const password = passwordRef.current.value;

        dispatch(userActions.login({ name, password }));
    };

    return (
        <Container>
            <form onSubmit={onSubmit}>
                <Form.Group controlId="formBasicEmail">
                    <Form.Label>Nom d'utilisateur</Form.Label>
                    <Form.Control type="text" placeholder="Nom d'utilisateur" ref={nameRef} />
                </Form.Group>
                <Form.Group controlId="formBasicPassword">
                    <Form.Label>Mot de passe</Form.Label>
                    <Form.Control type="password" placeholder="Mot de passe" ref={passwordRef} />
                </Form.Group>
                <Button variant="primary" type="submit">
                    Submit
                </Button>{" "}
                {loginFailed && <span className="text-danger">Nom d'utilisateur ou mot de passe invalide.</span>}
            </form>
        </Container>
    );
}

export default Login;
