import React from "react";
import NoteContext from "../context/NoteContext";
import { useContext,useState } from "react";
import ModalForm from './ModalForm';
import {
    Box,
    Card,
    CardActions,
    CardContent,
    Button,
    Typography,
    IconButton
} from "@mui/material";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import EditIcon from "@mui/icons-material/Edit";
import { ViewNoteModal } from "./ViewNoteModel";

export default function NoteCard(props) {
    const context=useContext(NoteContext)
    const {deleteNote}=context
    const [modal, setModal] = useState(false);
    const [isEdit,setEdit]=useState(false)
    const [viewModalOpen, setViewModalOpen] = useState(false);
    const noteDate = new Date(props.date)
    
    // Format the date as you prefer
    const formattedDate = noteDate.toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'short',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
    });

    const handleOpen = () => {
        setModal(true);
    };
    
    const handleClose = () => {
        setModal(false);
    };
    
    const handleViewOpen=()=>{
        setViewModalOpen(true)
    }
    const currentNote = {
        id: props.id,
        title: props.title,
        description: props.description,
        tag: props.tag,
        date: props.date
    };

    function updateNote(){
        setEdit(true)
        handleOpen();
    }
    
    return (
     <Box sx={{ minWidth: 275, maxWidth: 300 }}> {/* Added maxWidth */}
            <Card 
                variant="outlined" 
                sx={{ 
                    minHeight: 300, 
                    display: "flex", 
                    maxWidth:275,
                    flexDirection: "column", 
                    justifyContent: "space-between",
                    width: '100%', // Ensures card takes full width of its container
                }}
            >
                <CardContent>
                    <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: 'center' }}>
                        <Typography variant="caption" color="text.secondary">
                            {formattedDate}
                        </Typography>
                        <Box>
                            <IconButton aria-label="edit" onClick={updateNote} >
                                <EditIcon />
                            </IconButton>
                            <IconButton aria-label="delete" onClick={()=>deleteNote(props.id)}>
                                <DeleteOutlineIcon />
                            </IconButton>
                        </Box>
                    </Box>
                    <Typography gutterBottom sx={{ color: "text.secondary", fontSize: 14 }}>
                        {props.tag.charAt(0).toUpperCase() +props.tag.slice(1)}
                    </Typography>
                    <Typography variant="h5" component="div" sx={{ wordBreak: 'break-word',fontWeight:'bold' }}>
                        {props.title.charAt(0).toUpperCase()+props.title.slice(1)}
                    </Typography>
                    <Typography 
                        variant="body1" 
                        sx={{ 
                            wordBreak: 'break-word',
                            overflow: 'hidden',
                            textOverflow: 'ellipsis',
                            display: '-webkit-box',
                            WebkitLineClamp: 5, // Limit to 5 lines
                            WebkitBoxOrient: 'vertical'
                        }}
                    >
                        {props.description.charAt(0).toUpperCase()+props.description.slice(1)}
                    </Typography>
                </CardContent>
                <CardActions>
                    <Button variant="contained" size="small" onClick={handleViewOpen}>
                        View
                    </Button>
                </CardActions>
            </Card>
            <ModalForm
                open={modal}
                handleClose={handleClose}
                isEdit={isEdit}
                currentNote={currentNote}
            />
            <ViewNoteModal
                open={viewModalOpen}
                handleClose={() => setViewModalOpen(false)}
                note={currentNote}
            />
        </Box>  
    );
}