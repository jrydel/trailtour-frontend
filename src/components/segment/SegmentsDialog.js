import React from 'react';

import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import Button from '@material-ui/core/Button';
import InputAdornment from '@material-ui/core/InputAdornment';
import { MenuItem } from "@material-ui/core";
import { makeStyles } from '@material-ui/core/styles';

import { useForm } from 'react-hook-form'

const useStyles = makeStyles((theme) => ({
    layout: {
        display: 'flex',
        flexWrap: 'wrap',
    },
    textField: {
        marginTop: theme.spacing(2)
    },
}));

const validateCountry = value => {
    return value !== "";
}

const validateLatitude = (value) => {
    return isFinite(value) && Math.abs(value) <= 90;
}

const validateLongitude = (value) => {
    return isFinite(value) && Math.abs(value) <= 180;
}

const validateNumber = (value) => {
    return isFinite(value);
}

const SegmentsDialog = props => {

    const classes = useStyles();
    const { register, handleSubmit, errors, getValues, setValue, reset, control } = useForm({
        defaultValues: props.data
    });

    console.log(getValues());

    React.useEffect(() => {
        reset(props.data);
        register({ name: "country" }, { required: true, validate: validateCountry });
    }, [props.data]);

    return (
        <Dialog open={props.show} onClose={props.onClose}>
            <DialogTitle>{props.title}</DialogTitle>
            <form onSubmit={handleSubmit(() => props.onSubmit(getValues()))} noValidate >
                <DialogContent>
                    <div className={classes.layout} >
                        <TextField
                            name="id"
                            label="Id"
                            variant="outlined"
                            fullWidth
                            placeholder="123456789"
                            className={classes.textField}
                            inputRef={
                                register({
                                    required: true,
                                    pattern: /^\d+$/
                                })}
                            error={errors.id}
                        />
                        <TextField
                            name="name"
                            label="Název"
                            variant="outlined"
                            fullWidth
                            className={classes.textField}
                            inputRef={
                                register({
                                    required: true
                                })}
                            error={errors.name}
                        />
                        <TextField
                            name="country"
                            select
                            label="Země"
                            value={getValues("country")}
                            onChange={e => setValue("country", e.target.value)}
                            variant="outlined"
                            fullWidth
                            className={classes.textField}
                            error={errors.country}
                        >
                            <MenuItem key={"cz"} value={"cz"}>CZ</MenuItem>
                            <MenuItem key={"sk"} value={"sk"}>SK</MenuItem>
                        </TextField>
                        <TextField
                            name="distance"
                            label="Délka"
                            variant="outlined"
                            fullWidth
                            className={classes.textField}
                            InputProps={{
                                endAdornment: <InputAdornment position="start">km</InputAdornment>,
                            }}
                            inputRef={
                                register({
                                    required: true,
                                    validate: validateNumber
                                })}
                            error={errors.distance}
                        />
                        <TextField
                            name="elevation"
                            label="Převýšení"
                            variant="outlined"
                            fullWidth
                            className={classes.textField}
                            InputProps={{
                                endAdornment: <InputAdornment position="start">m</InputAdornment>,
                            }}
                            inputRef={
                                register({
                                    required: true,
                                    validate: validateNumber
                                })}
                            error={errors.elevation}
                        />
                        <TextField
                            name="type"
                            label="Typ"
                            variant="outlined"
                            fullWidth
                            className={classes.textField}
                            inputRef={
                                register({
                                    required: true
                                })}
                            error={errors.type}
                        />
                        <TextField
                            name="latitude"
                            label="Zeměpisná šířka"
                            variant="outlined"
                            placeholder="50.08804"
                            fullWidth
                            className={classes.textField}
                            inputRef={
                                register({
                                    required: true,
                                    validate: validateLatitude
                                })}
                            error={errors.latitude}
                        />
                        <TextField
                            name="longitude"
                            label="Zeměpisná délka"
                            variant="outlined"
                            placeholder="14.42076"
                            fullWidth
                            className={classes.textField}
                            inputRef={
                                register({
                                    required: true,
                                    validate: validateLongitude
                                })}
                            error={errors.longitude}
                        />
                    </div>
                    <DialogActions>
                        <Button onClick={props.onClose} color="primary">
                            Zrušit
                            </Button>
                        <Button type="submit" color="primary">
                            Uložit
                        </Button>
                    </DialogActions>
                </DialogContent>
            </form>
        </Dialog >
    )
}

export default SegmentsDialog;