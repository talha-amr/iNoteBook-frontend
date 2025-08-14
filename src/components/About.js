import React, { useEffect, useState, useContext } from 'react';
import { 
  Box,
  Container,
  Typography,
  Avatar,
  Paper,
  Divider,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Chip,
  CircularProgress
} from '@mui/material';
import { Email, CalendarToday, Notes } from '@mui/icons-material';
import UserContext from '../context/UserContext';
import NoteContext from '../context/NoteContext';
import LoadingBar from "react-top-loading-bar";
import { useNavigate } from 'react-router-dom';

function About() {  
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(true);
  const [progress, setProgress] = useState(0);
  
  // Get contexts with fallback empty objects
  const { user, fetchUserData } = useContext(UserContext) ;
  const { notes , getNotes } = useContext(NoteContext);

  // Calculate total notes directly from context
  const totalNotes = notes.length;

  // Format join date
  const formattedDate = user?.date ? new Date(user.date).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  }) : '';

useEffect(() => {
  let isMounted = true;

  const fetchData = async () => {
    try {
      setProgress(30);
      const token = localStorage.getItem('authToken');
      if (!token) {
        if (isMounted) {
          setProgress(100);
          setTimeout(() => navigate('/'), 300);
        }
        return;
      }


      if (getNotes) {
        setProgress(60);
        await getNotes();
      }

      if (isMounted) {
        setProgress(100);
        setIsLoading(false);
      }
    } catch (error) {
      console.error(error);
      if (isMounted) {
        setProgress(100);
        setTimeout(() => navigate('/'), 300);
      }
    }
  };

  fetchData();

  return () => { isMounted = false; };
}, []); 

  // Loading state
  if (isLoading) {
    return (
      <>
        <LoadingBar
          color="#f11946"
          progress={progress}
          onLoaderFinished={() => setProgress(0)}
        />
      </>
    );
  }

  if (!user) {
    return (
      <Container maxWidth="sm" sx={{ 
        py: 4,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '80vh'
      }}>
        <Typography variant="h6" textAlign="center">
          Please login to view your profile
        </Typography>
      </Container>
    );
  }


  return (
    <>
      <LoadingBar
        color="#f11946"
        progress={progress}
        onLoaderFinished={() => setProgress(0)}
      />
      <Container maxWidth="sm" sx={{ py: 4 }}>
        <Paper elevation={2} sx={{ p: 4 }}>
          <Box sx={{ 
            display: 'flex', 
            flexDirection: 'column', 
            alignItems: 'center',
            textAlign: 'center',
            mb: 3
          }}>
            <Avatar 
              sx={{ 
                width: 100, 
                height: 100, 
                mb: 2,
                bgcolor: 'primary.main',
                fontSize: '2.5rem'
              }}
            >
              {user.name?.charAt(0).toUpperCase()}
            </Avatar>
            <Typography variant="h4" component="h1">
              {user.name}
            </Typography>
            <Chip 
              label="Member" 
              color="primary" 
              variant="outlined" 
              size="small" 
              sx={{ mt: 1 }}
            />
          </Box>

          <Divider sx={{ my: 2 }} />

          <List>
            <ListItem>
              <ListItemIcon>
                <Email color="primary" />
              </ListItemIcon>
              <ListItemText 
                primary="Email" 
                secondary={user.email}
              />
            </ListItem>

            <ListItem>
              <ListItemIcon>
                <CalendarToday color="primary" />
              </ListItemIcon>
              <ListItemText 
                primary="Member since" 
                secondary={formattedDate} 
              />
            </ListItem>

            <ListItem>
              <ListItemIcon>
                <Notes color="primary" />
              </ListItemIcon>
              <ListItemText 
                primary="Total Notes" 
                secondary={totalNotes} 
              />
            </ListItem>
          </List>
        </Paper>
      </Container>
    </>
  );
}

export default About;