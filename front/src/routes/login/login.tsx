import {
    Button,
    Card,
    CardActions,
    CardContent,
    CardMedia,
    Container,
    makeStyles,
    TextField,
    Typography
} from "@material-ui/core";
import { Alert } from "@material-ui/lab";
import React, { useEffect, useRef } from "react";
// import { Button, Container, Form } from "react-bootstrap";
// import { useHistory } from "react-router-dom";
import Spacer from "../../components/Material/Spacer";
import UserSelector from "../../rxjs/user.selector";
import userStore from "../../rxjs/user.store";
import { InputReference } from "../../util-types";
import loginImage from "./loginImage.jpg";

const useStyles = makeStyles(theme => ({
    spacing: {
        "& > *": {
            marginBottom: theme.spacing(1)
        }
    },
    media: {
        height: 135
    }
}));

function Login() {
    // Hooks
    const user = new UserSelector(userStore.useState());
    // const history = useHistory();
    const classes = useStyles();
    const nameRef = useRef<InputReference>(),
        passwordRef = useRef<InputReference>();

    // Mount
    useEffect(() => {
        userStore.reset();
    }, []);

    // Component
    const onSubmit = (event: React.FormEvent) => {
        event.preventDefault();

        const name = nameRef.current.value;
        const password = passwordRef.current.value;

        userStore.tryLogin(name, password);
    };

    return (
        <Container maxWidth="sm">
            <Spacer toolbar margin />
            <form onSubmit={onSubmit}>
                <Card>
                    <CardMedia image={loginImage} title="Monster Hunter" className={classes.media} />
                    <CardContent className={classes.spacing}>
                        <Typography gutterBottom variant="h5" component="h2">
                            Login
                        </Typography>
                        {user.hasLoginError() && (
                            <Alert severity="error">Nom d'utilisateur ou Mot de passe invalide !</Alert>
                        )}
                        <TextField label="Nom d'utilisateur" autoFocus fullWidth inputRef={nameRef} />
                        <TextField label="Mot de passe" fullWidth type="password" inputRef={passwordRef} />
                    </CardContent>
                    <CardActions>
                        <Spacer />
                        <Button color="primary" variant="contained" type="submit">
                            Valider
                        </Button>
                    </CardActions>
                </Card>
            </form>
        </Container>
    );
}

export default Login;
