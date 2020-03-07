import React from "react";
import axios from "axios";
import {Quest as QuestType} from "../../../../src/models/quests.model";
import { InputReference } from "../../util-types";
import bind from "@chbrown/bind";
import { Form, Button, Container, Table, ButtonToolbar, ButtonGroup } from "react-bootstrap";

type State =  {
    currentPage: number;
    nbPage: number;
    questsList: QuestType[];
}

class Quest extends React.Component {



    componentDidMount(){
        axios.get("/quests")
        .then(data => {
            console.log(data);
          })
          .catch(err => console.error(err));
    }

  render() {
    return <Container>
      
      <Table striped bordered hover>
  <thead>
    <tr>
      <th>#</th>
      <th>Name</th>
      <th></th>
    </tr>
  </thead>
  <tbody>
    
  </tbody>
</Table>
<ButtonToolbar aria-label="Toolbar with button groups">
  <ButtonGroup className="mr-2" aria-label="First group">
    
  </ButtonGroup>
</ButtonToolbar>

    </Container>;
  }
}

export default Quest;
