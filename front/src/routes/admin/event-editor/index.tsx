import React from "react";
import { ButtonGroup, ButtonToolbar, Container, Table, Button } from "react-bootstrap";

// type Paged<T> = {
//     page: number;
//     setPage: (page: number) => void;
//     nbPages?: number;
//     results: T[];
// };

// function usePagedResults<T>(url: string, resultsPerPage: number = 10): Paged<T> {
//     const [page, setPage] = useState(1);
//     const [nbPages, setNbPages] = useState<number | undefined>(undefined);
//     const [results, setResults] = useState<T[]>([]);

//     useEffect(() => {
//         axios
//             .get(`${url}?$skip=${(page - 1) * resultsPerPage}&$limit=${resultsPerPage}`)
//             .then(({ data: { total, limit, skip, data } }) => {
//                 setPage(Math.floor(skip / limit) + 1);
//                 setNbPages(Math.floor(skip / limit) + 1);
//                 setResults(data);
//             })
//             .catch(err => console.error(err));
//     }, [page, setPage, setNbPages, setResults]);

//     return {
//         page,
//         setPage,
//         nbPages,
//         results
//     };
// }

function EventEditor() {
    // const { page, setPage, nbPages, results } = usePagedResults<QuestType>("/quests", 50);

    return (
        <Container className="r-quest-editor">
            <h1>Évenements</h1>
            <div className="table-with-buttons">
                <div className="buttons-in-table">
                    <Button size="sm" title="Créér">
                        <i className="fa fa-plus"></i>
                    </Button>
                </div>
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

export default EventEditor;
