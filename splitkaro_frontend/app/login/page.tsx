'use client'
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
 import { ToastContainer, toast } from 'react-toastify';
import {
  TextField,
  Button,
  Typography,
  Box,
  Link as MuiLink,
  Paper,
  InputAdornment,
  IconButton,
} from '@mui/material';
import Link from 'next/link';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import { useState } from 'react';
import axios from 'axios';
import { useRouter } from 'next/navigation'
import { useAppDispatch } from '../redux/store/store';
import { setUser } from '../redux/slice/auth.slice';

// import { useAppSelector } from '../redux/hook/hook';

const loginSchema = z.object({
  email: z.string().email({ message: 'Invalid email address' }),
  password: z.string().min(6, { message: 'Password must be at least 6 characters' }),
});

type LoginFormData = z.infer<typeof loginSchema>;

export default function LoginForm() {
  const [showPassword, setShowPassword] = useState(false);
  const dispatch = useAppDispatch();
  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
  });
const notify = () => toast("Login Successfull!");
  const onSubmit = async (data: LoginFormData) => {
    const email = data.email;
   
    try {
      const res = await axios.post('http://localhost:3001/auth/login', data, {
        withCredentials: true, 
      });
      console.log(res.data);
      notify()
      dispatch(setUser({email}));
      router.push('/home');
     
    }
    catch (err) {
       toast.error("Login failed: " + (err as Error).message);
    }

  };

  const togglePasswordVisibility = () => {
    setShowPassword((prev) => !prev);
  };

  return (
    <Box
      display="flex"
      justifyContent="center"
      alignItems="center"
      minHeight="100vh"
      bgcolor="#f5f5f5"
    >
        <ToastContainer />
      <Paper elevation={3} sx={{ padding: 4, width: 350 }}>
        <Typography variant="h5" gutterBottom>
          Login
        </Typography>

        <form onSubmit={handleSubmit(onSubmit)} noValidate>
          <TextField
            label="Email"
            {...register('email')}
            error={!!errors.email}
            helperText={errors.email?.message}
            fullWidth
            margin="normal"
          />

          <TextField
            label="Password"
            type={showPassword ? 'text' : 'password'}
            {...register('password')}
            error={!!errors.password}
            helperText={errors.password?.message}
            fullWidth
            margin="normal"
            slotProps={{
              input: {
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton onClick={togglePasswordVisibility} edge="end">
                      {showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                ),
              },
            }}
          />

          <Button
            type="submit"
            variant="contained"
            color="primary"
            fullWidth
            sx={{ mt: 2 }}
          >
            Log In
          </Button>
             <ToastContainer />
          <Box mt={2} textAlign="center">
            <Typography variant="body2">
              Don&apos;t have an account?{' '}
              <MuiLink component={Link} href="/signup" underline="hover">
                Sign up
              </MuiLink>
            </Typography>
          </Box>
        </form>
      </Paper>
    </Box>
  );
}