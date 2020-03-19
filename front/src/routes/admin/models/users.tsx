import {
    Container,
    Card,
    CardContent,
    TextField,
    CardActions,
    Button,
    IconButton,
    CardHeader,
    Box,
    Typography
} from "@material-ui/core";
import MaterialTable from "material-table";
import React, { FC, useRef, useState, useEffect } from "react";
import { MdEdit, MdMoreVert, MdRefresh, MdChevronLeft } from "react-icons/md";
import { useRouteMatch } from "react-router-dom";
import { mtListQuery, mtGetQuery } from "../../../api/mt-config/restClient";
import tableIcons from "../util/tableIcons";
import { useSubHistory } from "../util/locationSubdir";
import { User } from "../../../rxjs/user.store";
import Spacer from "../../../components/Material/Spacer";
import { makeStyles } from "@material-ui/core";
import { Skeleton } from "@material-ui/lab";
import cx from "classnames";
import mson from "mson";

const useStyles = makeStyles(theme => ({
    spacing: {
        "& > *": {
            marginBottom: theme.spacing(1)
        }
    },
    minHeight: {
        minHeight: 200
    },
    flex: {
        display: "flex"
    },
    mdUp: {
        [theme.breakpoints.down("xs")]: {
            display: "none"
        }
    },
    mdDown: {
        [theme.breakpoints.up("sm")]: {
            display: "none"
        }
    }
}));

export const UserList: FC = () => {
    const match = useRouteMatch<{ pageId?: string }>();
    const history = useSubHistory();
    console.log(match);

    return (
        <Container>
            <MaterialTable
                icons={tableIcons}
                title="Utilisateurs"
                columns={[
                    { title: "Nom d'utilisateur", field: "name" },
                    { title: "Date d'inscription", field: "createdAt", type: "datetime" }
                ]}
                data={mtListQuery("users", ["name"])}
                actions={[
                    {
                        icon: () => <MdEdit />,
                        tooltip: "Edit user",
                        onClick: (event: any, user: User | User[]) => {
                            if (user instanceof Array) user = user[0];
                            history.push(`/users/${user.id}`);
                        }
                    }
                ]}
                onChangePage={page => {
                    history.push(`/users/page/${page}`);
                }}
                options={{
                    initialPage: +(match.params.pageId || 0),
                    pageSize: 15,
                    pageSizeOptions: [15, 30, 50],
                    padding: "dense",
                    paginationType: "stepped",
                    emptyRowsWhenPaging: false,
                    actionsColumnIndex: -1
                }}
            />
        </Container>
    );
};

const useUser = (id: number): [User | undefined, () => void] => {
    const [user, setUser] = useState<User | undefined>(undefined);

    const update = () => {
        setUser(undefined);
        mtGetQuery("users")<User>(id).then(setUser);
    };

    useEffect(() => {
        mtGetQuery("users")<User>(id).then(setUser);
    }, [id, setUser]);

    return [user, update];
};

export const UserEdit: FC = () => {};

// export const UserEdit: FC = () => {
//     const match = useRouteMatch<{ id?: string }>();
//     const history = useSubHistory();
//     const [user, refresh] = useUser(+match.params.id!);
//     const classes = useStyles();
//     const nameRef = useRef();
//     const passwordRef = useRef();

//     const goBack = () => {
//         history.goBack();
//     };

//     return (
//         <Container maxWidth="sm">
//             <div className={cx(classes.flex, classes.mdUp)}>
//                 <Button startIcon={<MdChevronLeft />} onClick={goBack}>
//                     Return
//                 </Button>
//                 <Spacer />
//                 <Button startIcon={<MdRefresh />} onClick={refresh}>
//                     Refresh
//                 </Button>
//             </div>
//             <div className={cx(classes.flex, classes.mdDown)}>
//                 <IconButton onClick={goBack}>
//                     <MdChevronLeft />
//                 </IconButton>
//                 <Spacer />
//                 <IconButton onClick={refresh}>
//                     <MdRefresh />
//                 </IconButton>
//             </div>
//             <Card className={classes.minHeight}>
//                 <CardHeader
//                     title={
//                         user ? (
//                             <Typography variant="h6">Editer: {user.name}</Typography>
//                         ) : (
//                             <Skeleton animation="wave" height={40} width="100%" />
//                         )
//                     }
//                 />
//                 <CardContent className={classes.spacing}>
//                     {user ? (
//                         <>
//                             <TextField
//                                 label="Nom d'utilisateur"
//                                 autoFocus
//                                 fullWidth
//                                 inputRef={nameRef}
//                                 defaultValue={user?.name}
//                             />
//                             <TextField
//                                 label="Mot de passe"
//                                 fullWidth
//                                 type="password"
//                                 inputRef={passwordRef}
//                                 helperText="Gardez le champ vide pour ne pas modifier"
//                             />
//                         </>
//                     ) : (
//                         <>
//                             <Box>
//                                 <Skeleton height={51} />
//                             </Box>
//                             <Box>
//                                 <Skeleton height={51} />
//                                 <Skeleton height={14} width="60%" />
//                             </Box>
//                         </>
//                     )}
//                 </CardContent>
//                 <CardActions>
//                     <Spacer />
//                     <Button disabled={!user}>Retour</Button>
//                     <Button disabled={!user} color="primary" variant="contained" type="submit">
//                         Valider
//                     </Button>
//                 </CardActions>
//             </Card>
//         </Container>
//     );
// };
