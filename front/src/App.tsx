import React from "react";
import bind from "@chbrown/bind";
import { Form, Button, Container } from "react-bootstrap";
import axios from "axios";
import { InputReference } from "./util-types";

class App extends React.Component {
  key = React.createRef<InputReference>();
  email = React.createRef<InputReference>();
  password = React.createRef<InputReference>();

  @bind
  onSubmit(event: React.FormEvent) {
    event.preventDefault();
    axios
      .delete(`/users/${this.email.current.value}`, {
        headers: {
          Authorization: `Bearer ${this.key.current.value}`
        }
      })
      .then(() => alert("ok"))
      .catch(err => console.error(err));
  }

  render() {
    return (
      <Container>
        <form onSubmit={this.onSubmit}>
          <Form.Group controlId="formBasicEmail">
            <Form.Label>Key</Form.Label>
            <Form.Control type="text" placeholder="Key" ref={this.key} />
          </Form.Group>

          <Form.Group controlId="formBasicEmail">
            <Form.Label>ID</Form.Label>
            <Form.Control type="text" placeholder="ID" ref={this.email} />
            <Form.Text className="text-muted">
              We'll never share your email with anyone else.
            </Form.Text>
          </Form.Group>

          <Form.Group controlId="formBasicPassword">
            <Form.Label>Password</Form.Label>
            <Form.Control
              type="password"
              placeholder="Password"
              ref={this.password}
            />
          </Form.Group>
          <Form.Group controlId="formBasicCheckbox">
            <Form.Check type="checkbox" label="Check me out" />
          </Form.Group>
          <Button variant="primary" type="submit">
            Submit
          </Button>
        </form>
      </Container>
    );
  }
}

export default App;
