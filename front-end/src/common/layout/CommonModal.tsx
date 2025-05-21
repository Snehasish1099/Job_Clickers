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
    maxWidth: '800px',
    height: '90vh',
    bgcolor: 'background.paper',
    borderRadius: '12px',
    boxShadow: 24,
    display: 'flex',
    flexDirection: 'column',
};

const CommmonModal = (props: any) => {

    return (
        <Modal
            open={props.open}
            onClose={props.handleClose}
            className={`!mx-auto !rounded-xl ${props.modalCls}`}
        >
            <Box sx={style}>
                {props.title && (
                    <Typography component="h2" className={`${props.titleCls} p-2 border-b`}>
                        {props.title}
                    </Typography>
                )}

                <Box sx={{ flex: 1, overflowY: 'auto', p: 2 }}>
                    {props.children}
                </Box>
            </Box>
        </Modal>
    );
}

export default CommmonModal