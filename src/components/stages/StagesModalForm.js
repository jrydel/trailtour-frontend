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
                        <TextField name="country" label="Země" variant="outlined" fullWidth className={classes.textfield} defaultValue={props.country} disabled />
                        <TextField name="number" label="Číslo" variant="outlined" fullWidth className={classes.textfieldRight}
                            inputRef={
                                register({
                                    required: true,
                                    validate: isFinite
                                })
                            }
                            error={errors.number}
                            disabled
                        />
                    </Box>
                    <TextField name="url" label="Trailtour url" variant="outlined" fullWidth className={classes.textfield}
                        inputRef={
                            register({
                                required: true,
                                validate: value => {
                                    let url;
                                    try {
                                        url = new URL(value);
                                    } catch (_) {
                                        return false;
                                    }
                                    return url.protocol === "http:" || url.protocol === "https:";
                                }
                            })
                        }
                        error={errors.url}
                        disabled
                    />
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