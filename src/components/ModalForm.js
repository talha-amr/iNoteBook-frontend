import React, { useState, useContext, useEffect } from "react";
import { Modal, Box, Typography, TextField, Button, Stack } from "@mui/material";
import NoteContext from "../context/NoteContext";

const modalStyle = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 400,
    bgcolor: "background.paper",
    border: "2px solid #000",
    boxShadow: 24,
    p: 4,
};

const ModalForm = (props) => {
    const { addNote, editNote } = useContext(NoteContext);
    
    const [note, setNote] = useState({
        title: "",
        description: "",
        tag: "default"
    });
    
    useEffect(() => {
        if (props.isEdit && props.currentNote) {
            setNote({
                title: props.currentNote.title,
                description: props.currentNote.description,
                tag: props.currentNote.tag
            });
        } else {
            setNote({
                title: "",
                description: "",
                tag: "default"
            });
        }
    }, [props.isEdit, props.currentNote]);
    
    const handleChange = (e) => {
        setNote({ ...note, [e.target.name]: e.target.value });
    };
    
    const handleSubmit = (e) => {
        e.preventDefault();
        
        if (!note.title  || !note.description ) {
            return; 
        }
        
        if (props.isEdit && props.currentNote) {
    
            editNote(
                props.currentNote.id,
                note.title ,    
                note.description ,
                note.tag 
            );
        } else {
            addNote(note.title , note.description , note.tag );
        }
        
        
        setNote({ title: "", description: "", tag: "default" });
        props.handleClose();
    };
    
    return (
        <Modal open={props.open} onClose={props.handleClose}>
            <Box sx={modalStyle}>
                <Typography variant="h6" component="h2">
                    {(props.isEdit && props.currentNote) ? "Edit Note" : "Create a New Note"}
                </Typography>
                <Box component="form" onSubmit={handleSubmit} sx={{ mt: 2 }}>
                    <Stack spacing={2}>
                        <TextField
                            required
                            fullWidth
                            label="Note Title"
                            name="title"
                            value={note.title}
                            onChange={handleChange}
                        />
                        <TextField
                            fullWidth
                            label="Tag"
                            name="tag"
                            value={note.tag}
                            onChange={handleChange}
                        />
                        <TextField
                            required
                            fullWidth
                            multiline
                            rows={4}
                            label="Description"
                            name="description"
                            value={note.description}
                            onChange={handleChange}
                        />
                    </Stack>
                    <Button type="submit" disabled={note.title.length < 3 || note.description.length < 5} variant="contained" sx={{ mt: 2 }}>
                        {(props.isEdit && props.currentNote) ? "Update Note" : "Save Note"}
                    </Button>
                </Box>
            </Box>
        </Modal>
    );
};

export default ModalForm;