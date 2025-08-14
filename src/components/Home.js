import React, { useContext, useEffect, useState } from "react";
import { Container, Grid, Typography } from "@mui/material";
import NoteContext from "../context/NoteContext";
import NoteCard from "./NoteCard";
import AddForm from "./AddForm";
import { useNavigate } from "react-router-dom";
import UserContext from "../context/UserContext";
import LoadingBar from "react-top-loading-bar";

function Home() {
    let navigate = useNavigate();
    const context = useContext(NoteContext);
    let userC = useContext(UserContext);
    const { user, fetchUserData } = userC;
    const { notes, getNotes } = context;

    const [progress, setProgress] = useState(0);
    
    useEffect(() => {
        const checkAuthAndFetchNotes = async () => {
            const token = localStorage.getItem('authToken');

            if (!token) {
                setProgress(30);
                setTimeout(() => {
                    setProgress(100);
                    setTimeout(() => navigate('/'), 300);
                }, 300);
                return;
            }

            setProgress(30);
            const result = await fetchUserData();
            
            if (!result.success) {
                setProgress(70);
                setTimeout(() => {
                    setProgress(100);
                    setTimeout(() => navigate('/'), 300);
                }, 300);
            } else {
                setProgress(70);
                await getNotes();
                setProgress(100);
            }
        };

        checkAuthAndFetchNotes();
    }, []);

    return (
        <>
            <LoadingBar
                color="#f11946"
                progress={progress}
                onLoaderFinished={() => setProgress(0)}
            />
            <Container>
                <AddForm />
                <Grid
                    container
                    spacing={2}
                    justifyContent={{ xs: 'center', sm: 'flex-start' }}
                    alignItems="center"
                >
                    {notes.length === 0 ? (
                        <Grid item xs={12}>
                            <Typography variant="body1" textAlign="center">
                                No Notes to Show
                            </Typography>
                        </Grid>
                    ) : (
                        notes.map((note) => (
                            <Grid item xs={12} sm={6} md={4} key={note._id}>
                                <NoteCard
                                    title={note.title}
                                    description={note.description}
                                    tag={note.tag}
                                    id={note._id}
                                    date={note.date}
                                />
                            </Grid>
                        ))
                    )}
                </Grid>
            </Container>
        </>
    );
}

export default Home;