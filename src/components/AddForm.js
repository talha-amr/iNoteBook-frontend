import React, { useState } from 'react';
import { Typography, Button,Box } from '@mui/material';
import ModalForm from './ModalForm';
import { Add } from '@mui/icons-material';
import { Stars } from '@mui/icons-material';
export default function AddForm() {
    const [modal, setModal] = useState(false);

    const handleOpen = () => {
        setModal(true);
    };

    const handleClose = () => {
        setModal(false);
    };

    return (
        <div>
        <Box sx={{ 
        textAlign: 'center', 
        mb: 4,
        position: 'relative'
        }}>
        <Typography 
            variant="h4" 
            sx={{ 
            my: 3,
            color: 'text.secondary',
            fontWeight: 500,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: 1
            }}
        >
            <Stars fontSize="large" color="primary" />
            Your ideas start here
        </Typography>
        
        <Button 
            variant="contained" 
            size="medium"
            onClick={handleOpen}
            startIcon={<Add />}
            sx={{
            borderRadius: '8px',
            textTransform: 'none',
            animation: 'pulse 2s infinite',
            '@keyframes pulse': {
                '0%': { transform: 'scale(1)' },
                '50%': { transform: 'scale(1.10)' },
                '100%': { transform: 'scale(1)' }
            }
            }}
        >
            Create Note
        </Button>
        </Box>
            <Typography variant="h4" sx={{ marginBlock: 3 }}>
                Your Notes:
            </Typography>
            <ModalForm
                open={modal}
                handleClose={handleClose}
                isEdit={false}
                currentNote={null}
            />
        </div>
    );
}