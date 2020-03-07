import React from "react";
import axios from "axios";
import { InputReference } from "../../util-types";
import bind from "@chbrown/bind";
import { Form, Button, Container } from "react-bootstrap";

class Login extends React.Component {
  name = React.createRef<InputReference>();
  password = React.createRef<InputReference>();

  @bind
  onSubmit(event: React.FormEvent) {
    event.preventDefault();

    const name = this.name.current.value;
    const password = this.password.current.value;

    axios
      .post(`/authentication`, {
        name: name,
        password: password,
        strategy: "local"
      })
      .then(data => {
        console.log(data);
        localStorage.setItem("oauthtoken", data.data.accessToken);
        window.location.href = "/";
      })
      .catch(err => console.error(err));

    // axios
    // .post(`/users`, {
    //   email: email,
    //   password: password,
    // })
    // .then(() => alert("ok"))
    // .catch(err => console.error(err));
  }
  render() {
    return <Container>
      
      <form onSubmit={this.onSubmit}>
        <Form.Group controlId="formBasicEmail">
          <Form.Label>Email address</Form.Label>
          <Form.Control type="text" placeholder="Enter email" ref={this.name}/>
          <Form.Text className="text-muted">
            We'll never share your email with anyone else.
          </Form.Text>
        </Form.Group>

        <Form.Group controlId="formBasicPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control type="password" placeholder="Password" ref={this.password}/>
        </Form.Group>
        <Button variant="primary" type="submit">
          Submit
        </Button>
      </form>

    </Container>;
  }
}

export default Login;
