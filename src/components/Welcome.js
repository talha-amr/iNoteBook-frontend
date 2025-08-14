import { Box, Container, Button } from "@mui/material";
import React, { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import UserContext from "../context/UserContext";
import AnimatedText from "./AnimatedText";
import LoadingScreen from "./LoadingScreen";
import { motion } from "framer-motion";

const NAVBAR_HEIGHT = 64;

const Welcome = () => {
  const { fetchUserData, user } = useContext(UserContext);
  const [isLoading, setIsLoading] = useState(true);
  const [hasInitiallyFetched, setHasInitiallyFetched] = useState(false);
 

 useEffect(() => {
  const loadData = async () => {
    if (!hasInitiallyFetched) {
      setHasInitiallyFetched(true);

      // Wait for user fetch
      await fetchUserData();

      // Wait for fonts to load
      await document.fonts.ready;

      // Both are done now
      setIsLoading(false);
    }
  };

  loadData();
}, [fetchUserData, hasInitiallyFetched]);
  
  const notLoggedIn = "iNoteBook - Where Every Thought Finds Its Home. Start Your Journey!";
  const request = "Please Login or Signup To Continue";
  const greet = `Great to see you, ${user?.name || "Mister"}! Your digital notebook awaits!`;
  const isLoggedIn = !!user?.name;
  
  console.log("Rendering Welcome - isLoggedIn:", isLoggedIn, "user:", user);
  
  if (isLoading) {
    return <LoadingScreen message="Loading your digital notebook..." />;
  }
  
  return (
    <Container>
      <Box
        sx={{
          height: `calc(100vh - ${NAVBAR_HEIGHT}px)`,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          textAlign: "center",
          padding: 2,
        }}
      >
        {!isLoggedIn ? (
          <Box key="not-logged" sx={{ display: "flex", flexDirection: "column", gap: 3 }}>
            <AnimatedText
              key="welcome-text"
              text={notLoggedIn}
              variant="h3"
              fontSize={{ xs: "2.5rem", sm: "3rem" }}
              isLoggedIn={isLoggedIn}
            />
            <AnimatedText
              key="request-text"
              text={request}
              variant="h6"
              fontSize={{ xs: "1.3rem", sm: "1.5rem" }}
              isLoggedIn={isLoggedIn}
            />
          </Box>
        ) : (
          <Box
            key="logged"
            sx={{
              display: "flex",
              flexDirection: "column",
              gap: 3,
              justifyContent: "center",
              alignItems: "center"
            }}
          >
            <AnimatedText
              key={`greet-${user.name}`}
              text={greet}
              variant="h3"
              fontSize={{ xs: "2.2rem", sm: "3rem" }}
            />
            <motion.div
                initial={{ opacity: 0, scale: 0.3,y:60 }}
                animate={{ opacity: 1, scale: 1,y:0 }}
                transition={{ duration: 1.3, ease: "easeOut" }}
            >
                <Button
                    variant="contained"
                    size="large"
                    component={Link}
                    to="/Dashboard"
                >
                    Dashboard
                </Button>
            </motion.div>
          </Box>
        )}
      </Box>
    </Container>
  );
};

export default Welcome;