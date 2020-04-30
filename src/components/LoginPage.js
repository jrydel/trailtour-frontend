import React from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import { useForm } from 'react-hook-form';

import Cookies from 'universal-cookie';

import { UserContext } from '../AppContext';

const useStyles = makeStyles((theme) => ({
    paper: {
        marginTop: theme.spacing(8),
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    },
    avatar: {
        margin: theme.spacing(1),
        backgroundColor: theme.palette.secondary.main,
    },
    form: {
        width: '100%', // Fix IE 11 issue.
        marginTop: theme.spacing(1),
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center'
    },
    submit: {
        marginTop: theme.spacing(2),
    },
}));

const Login = props => {
    const classes = useStyles();

    const { setSession } = React.useContext(UserContext);
    const { register, handleSubmit, errors, setError } = useForm();

    const createCookie = (login, role) => JSON.stringify({ login: login, role: role });

    const onSubmit = (formData) => {
        const cookies = new Cookies();
        if (formData.password === "admin") {
            cookies.set("session", createCookie(true, "admin"));
            setSession({ login: true, role: "admin" });
        } else if (formData.password === "user") {
            cookies.set("session", createCookie(true, "user"));
            setSession({ login: true, role: "user" });
        } else {
            setError("password", "notMatch", "Špatné heslo");
        }
    }

    return (
        <Container component="main" maxWidth="xs">
            <div className={classes.paper}>
                <Avatar className={classes.avatar}>
                    <LockOutlinedIcon />
                </Avatar>
                <Typography variant="h5">
                    Přihlášení
                </Typography>
                <form onSubmit={handleSubmit(onSubmit)} className={classes.form} noValidate>
                    <TextField
                        variant="outlined"
                        margin="normal"
                        error={errors.password}
                        fullWidth
                        name="password"
                        label="Heslo"
                        type="password"
                        id="password"
                        inputRef={register({ required: true })}
                    />
                    <Button
                        type="submit"
                        variant="contained"
                        color="primary"
                        align="right"
                        className={classes.submit}
                    > Přihlásit </Button>
                </form>
                {errors.password && <Typography variant="h6">Zadal jsi špatné heslo.</Typography>}
            </div>
        </Container>
    )
}

export default Login;