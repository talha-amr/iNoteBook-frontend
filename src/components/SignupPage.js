import React from "react";
import { Paper, TextField, Box, Typography, Button } from "@mui/material";
import UserContext from "../context/UserContext";
import { useContext,useState } from "react";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import LoadingScreen from "./LoadingScreen";

export default function SignupPage() {
  const navigate = useNavigate();
  const context = useContext(UserContext);
  const { SignupCheck } = context;
  const [isLoading, setIsLoading] = useState(false);
  
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm({
    defaultValues: {
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
  });

  const password = watch("password"); 

const onSubmit = async (data) => {
    setIsLoading(true);
    const result = await SignupCheck({
        name: data.name,
        email: data.email,
        password: data.password,
    });
    
    setIsLoading(false);
    
    if (result.success) {
        navigate('/');
    } else {
        alert(result.error || "Signup failed");
    }
};

if (isLoading) {
  return <LoadingScreen message="Creating your account..." />;
}
  return (
    <Paper
      elevation={3}
      sx={{
        maxWidth: 400,
        margin: "auto",
        mt: 8,
        p: 3,
        borderRadius: 2,
      }}
    >
      <Typography variant="h5" align="center" gutterBottom>
        Sign Up
      </Typography>

      <Box
        component="form"
        onSubmit={handleSubmit(onSubmit)}
        sx={{
          display: "flex",
          flexDirection: "column",
          gap: 2,
        }}
      >
        <TextField
          label="Name"
          {...register("name", { required: "Name is required" })}
          error={!!errors.name}
          helperText={errors.name?.message}
          variant="outlined"
          fullWidth
        />
        
        <TextField
          label="Email"
          {...register("email", { 
            required: "Email is required",
            pattern: {
              value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
              message: "Invalid email address"
            }
          })}
          error={!!errors.email}
          helperText={errors.email?.message}
          variant="outlined"
          fullWidth
        />
        
        <TextField
          label="Password"
          {...register("password", { 
            required: "Password is required",
            minLength: {
              value: 5,
              message: "Password must be at least 5 characters"
            }
          })}
          error={!!errors.password}
          helperText={errors.password?.message}
          variant="outlined"
          type="password"
          fullWidth
        />
        
        <TextField
          label="Confirm Password"
          {...register("confirmPassword", { 
            required: "Please confirm your password",
            validate: value => 
              value === password || "Passwords do not match"
          })}
          error={!!errors.confirmPassword}
          helperText={errors.confirmPassword?.message}
          variant="outlined"
          type="password"
          fullWidth
        />
        
        <Button variant="contained" type="submit" fullWidth>
          Create Account
        </Button>
      </Box>
    </Paper>
  );
}