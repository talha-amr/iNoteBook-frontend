import React, { useContext,useState } from 'react'
import { Paper, Typography, TextField, Button, Container } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useForm } from 'react-hook-form';
import UserContext from '../context/UserContext';
import LoadingScreen from "./LoadingScreen";

const LoginPage = () => {
  const context = useContext(UserContext);
  const { loginCheck } = context;
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      email: "",
      password: ""
    }
  });

  const onSubmit = async (data) => {
    setIsLoading(true)
    const result = await loginCheck({ email: data.email, password: data.password });
    setIsLoading(false)
    if (result.success) {
      navigate('/');
    } else {
      alert("Invalid Credentials");
    }
  };
  if (isLoading) {
    return <LoadingScreen message="Loading your digital notebook..." />;
  }
  return (
    <Container>
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
        <Typography variant="h5" textAlign="center">
          Login
        </Typography>
        
        <form onSubmit={handleSubmit(onSubmit)}>
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
            sx={{ mt: 3 }}
          />
          
          <TextField 
            label="Password" 
            type="password" 
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
            fullWidth 
            sx={{ mt: 3 }} 
          />
          
          <Button 
            type="submit" 
            variant="contained" 
            sx={{ my: 3 }} 
            fullWidth
          >
            Login
          </Button>
        </form>
      </Paper>
    </Container>
  );
};

export default LoginPage;