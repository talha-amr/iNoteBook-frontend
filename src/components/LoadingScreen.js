import React from 'react';
import { Box, Typography } from '@mui/material';

const LoadingScreen = ({ 
  message = "Loading your digital notebook...", 
  showLogo = true,
  logoText = "iNoteBook" 
}) => {
  return (
    <Box
      sx={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        flexDirection: "column",
        gap: 3,
        backgroundColor: "background.default",
        zIndex: 9999
      }}
    >
      {showLogo && (
        <Typography 
          variant="h2" 
          sx={{ 
            fontWeight: "bold",
            fontSize: { xs: "2.5rem", sm: "4rem" },
            background: "linear-gradient(45deg, #152510ff, #608f83ff)",
            backgroundClip: "text",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            textAlign: "center"
          }}
        >
          {logoText}
        </Typography>
      )}
      
      {/* Loading Animation */}
      <Box sx={{ display: "flex", gap: 1, alignItems: "center" }}>
        {[0, 0.2, 0.4].map((delay, index) => (
          <Box 
            key={index}
            sx={{
              width: 8,
              height: 8,
              borderRadius: "50%",
              backgroundColor: "#ffffffff",
              animation: "bounce 1.4s ease-in-out infinite both",
              animationDelay: `${delay}s`,
              "@keyframes bounce": {
                "0%, 80%, 100%": { 
                  transform: "scale(0)",
                  opacity: 0.5
                },
                "40%": { 
                  transform: "scale(1)",
                  opacity: 1
                }
              }
            }}
          />
        ))}
      </Box>
      
      
      <Typography 
        variant="body1" 
        color="text.secondary"
        sx={{ textAlign: "center" }}
      >
        {message}
      </Typography>
    </Box>
  );
};

export default LoadingScreen;