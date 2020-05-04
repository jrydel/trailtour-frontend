import React from "react";

import { Dialog, DialogActions, DialogContent, DialogTitle, Button, TextField, Box, InputAdornment, makeStyles } from '@material-ui/core';

import { useForm } from "react-hook-form";

const useStyles = makeStyles((theme) => ({
    textfield: {
        marginTop: theme.spacing(2)
    },
    textfieldRight: {
        marginTop: theme.spacing(2),
        marginLeft: theme.spacing(1)
    }
}));

const StagesModalForm = props => {

    const classes = useStyles();
    const { register, handleSubmit, errors, reset } = useForm({ defaultValues: props.formData, mode: "onChange" });

    React.useEffect(() => {
        reset(props.formData);
    }, [props.formData, reset])

    return (
        <Dialog
            open={props.open}
            onClose={props.handleClose}
            scroll={"paper"}
        >
            <DialogTitle>{props.title}</DialogTitle>
            <DialogContent dividers={"paper"}>
                <Box display="flex" flexDirection="column">
                    <Box display="flex">
                        <TextField name="country" label="Země" variant="outlined" placeholder="CZ / SK" fullWidth className={classes.textfield}
                            inputRef={
                                register({
                                    required: true,
                                    validate: value => value === "CZ" || value === "SK"
                                })
                            }
                            error={errors.country}
                        />
                        <TextField name="id" label="Id segmentu" variant="outlined" fullWidth className={classes.textfieldRight}
                            inputRef={
                                register({
                                    required: true,
                                    validate: isFinite
                                })
                            }
                            error={errors.id}
                        />
                        <TextField name="number" label="Číslo etapy" variant="outlined" fullWidth className={classes.textfieldRight}
                            inputRef={
                                register({
                                    required: true,
                                    validate: isFinite
                                })
                            }
                            error={errors.number}
                        />
                    </Box>
                    <TextField name="name" label="Název" variant="outlined" fullWidth className={classes.textfield}
                        inputRef={
                            register({
                                required: true
                            })
                        }
                        error={errors.name}
                    />
                    <TextField name="type" label="Typ" variant="outlined" fullWidth className={classes.textfield}
                        inputRef={
                            register({
                                required: true
                            })
                        }
                        error={errors.type}
                    />
                    <Box display="flex">
                        <TextField name="distance" label="Délka" variant="outlined" fullWidth InputProps={{ endAdornment: <InputAdornment>m</InputAdornment> }} className={classes.textfield}
                            inputRef={
                                register({
                                    required: true,
                                    validate: isFinite
                                })
                            }
                            error={errors.distance}
                        />
                        <TextField name="elevation" label="Převýšení" variant="outlined" fullWidth InputProps={{ endAdornment: <InputAdornment>m</InputAdornment> }} className={classes.textfieldRight}
                            inputRef={
                                register({
                                    required: true,
                                    validate: isFinite
                                })
                            }
                            error={errors.elevation}
                        />
                    </Box>
                    <Box display="flex">
                        <TextField name="latitude" label="Souřadnice startu (ZŠ)" variant="outlined" placeholder="49.8037633" fullWidth className={classes.textfield}
                            inputRef={
                                register({
                                    required: true,
                                    validate: value => isFinite(value) && Math.abs(value) <= 90
                                })
                            }
                            error={errors.latitude}
                        />
                        <TextField name="longitude" label="Souřadnice startu (ZD)" variant="outlined" placeholder="15.4749126" fullWidth className={classes.textfieldRight}
                            inputRef={
                                register({
                                    required: true,
                                    validate: value => isFinite(value) && Math.abs(value) <= 180
                                })
                            }
                            error={errors.longitude}
                        />
                    </Box>
                </Box>
            </DialogContent>
            <DialogActions>
                <Button onClick={props.handleClose} color="primary">Zrušit</Button>
                <Button onClick={handleSubmit(props.handleSubmit)} color="primary">Uložit</Button>
            </DialogActions>
        </Dialog>
    );
}

export default StagesModalForm;