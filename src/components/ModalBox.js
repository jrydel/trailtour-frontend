import React from "react";
import { makeStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';

const useStyles = makeStyles((theme) => ({
    modal: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
    },
}));

const ModalBox = (props) => {
    const classes = useStyles();

    return (
        <Modal {...props} >
            <div style={{ display: "flex" }}>
                <Paper>
                    <Typography >asdasd</Typography>
                </Paper>
            </div>
        </Modal>
    );
}

export default ModalBox;