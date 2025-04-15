import React from 'react';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import { Typography } from '@mui/material';

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: '90%',
    maxWidth: '500px',
    bgcolor: 'background.paper',
    border: '1px solid #000',
    boxShadow: 24,
    p: 4,
};

const CommmonModal = (props: any) => {

    return (
        <Modal
            open={props.open}
            onClose={props.handleClose}
            className={`!mx-auto !rounded-xl ${props.modalCls}`}
        >
            <Box sx={style}>
                <Typography component="h2" className={props.titleCls}>{props.title}</Typography>
                {props.children}
            </Box>
        </Modal>
    );
}

export default CommmonModal