import React from "react";
import axios from "axios";
import { InputReference } from "../../util-types";
import bind from "@chbrown/bind";

class Login extends React.Component {
  email = React.createRef<InputReference>();
  password = React.createRef<InputReference>();

  @bind
  onSubmit(event: React.FormEvent) {
    event.preventDefault();

    const email = this.email.current.value;
    const password = this.password.current.value;

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
    return <div>login</div>;
  }
}

export default Login;
