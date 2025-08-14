import React, { useRef } from "react";
import { Typography } from "@mui/material";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { SplitText } from "gsap/SplitText";

const AnimatedText = ({ text, variant, fontSize }) => {
  const containerRef = useRef(null);

  useGSAP(() => {
    
    if (containerRef.current) {
      const split = new SplitText(containerRef.current, {
        type: "words",
        wordsClass: "words++" 
      });

      // Animation
      gsap.from(split.words, {
        opacity: 0,
        y:-20,
        stagger: 0.1,
        duration: 0.8,
        ease: "power1.inOut" 
      });

      return () => {
        split.revert(); 
      };
    }
  }, [text]); 

  return (
    <Typography
      ref={containerRef}
      variant={variant}
      fontWeight="bold"
      sx={{ px: { xs: 2, sm: 30 }, fontSize }}
    >
      {text}
    </Typography>
  );
};

export default AnimatedText;