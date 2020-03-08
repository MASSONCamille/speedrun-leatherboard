import React from "react";
import { ButtonGroup, ButtonToolbar, Container, Table } from "react-bootstrap";

function QuestEditor() {
    // const { page, setPage, nbPages, results } = usePagedResults<QuestType>("/quests", 50);

    return (
        <Container className="r-quest-editor">
            <h1>Éditeur de Quetes</h1>
            <div>
                <Table striped bordered hover>
                    <thead>
                        <tr>
                            <th style={{ width: 75 }}>#</th>
                            <th colSpan={2}>Name</th>
                        </tr>
                    </thead>
                    <tbody></tbody>
                </Table>
            </div>
            <ButtonToolbar aria-label="Toolbar with button groups">
                <ButtonGroup className="mr-2" aria-label="First group"></ButtonGroup>
            </ButtonToolbar>
        </Container>
    );
}

export default QuestEditor;
