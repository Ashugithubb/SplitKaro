'use client'
import { useForm } from "react-hook-form";
import { userSchema } from "./schema/profile.schema"
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useEffect, useState } from "react";
import axios from "axios";
import { Avatar, Box, Button, FormControlLabel, FormLabel, Paper, Radio, RadioGroup, TextField, Typography } from "@mui/material";
import { ToastContainer, toast } from 'react-toastify';
import EditIcon from '@mui/icons-material/Edit';
import { useAppDispatch } from "../redux/store/store";
import { useAppSelector } from "../redux/hook/hook";
import { uploadImage } from "../redux/async/upload.profile.Image.api";
import { error } from "console";
import { Controller } from "react-hook-form";
import Navbar from "../component/navbar";


type ProfileData = z.infer<typeof userSchema>;
export default function Profile() {
    const dispatch = useAppDispatch();
    const avtarUrl = useAppSelector((state) => state.api.avatarUrl);
    const email = useAppSelector((state) => state.user.email);
    const {
        register,
        handleSubmit,
        control,
        formState: { errors },
        reset,
    } = useForm<ProfileData>({
        resolver: zodResolver(userSchema),
    });

    const [avatarFile, setAvatarFile] = useState<File | null>(null);
    const [avatarPreview, setAvatarPreview] = useState<string | null>(null);
    const [cloudUrl, setCloudUrl] = useState<string>("");

    const [userDate,setUserData] = useState({});

    useEffect(() => {
  const fetchProfile = async () => {
    try {
      const res = await axios.get('http://localhost:3001/user/info', {
        withCredentials: true,
      });

      const data = res.data;

      
      setAvatarPreview(data.avatar);

      
      reset({
        first_name: data.first_name,
        last_name: data.last_name,
        gender: data.gender,
        age: data.age,
        mob: data.mob,
        bio: data.bio,
      });
    } catch (err) {
      console.error("Failed to load profile", err);
    }
  };

  fetchProfile();
}, [reset]);


    const handleAvatarChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            setAvatarFile(file);
            setAvatarPreview(URL.createObjectURL(file));
            try {
                const res = await dispatch(uploadImage(file));
                console.log(`after calling upl0d image${avtarUrl}`);
                toast("Image Uploaded!");

            } catch (err) {
                toast("Upload failed: " + (err as Error).message);
            }
        }

    }

    const onSubmit = async (formData: ProfileData) => {
        console.log(avtarUrl);
        const payload = {
            first_name: formData.first_name,
            last_name: formData.last_name,
            gender: formData.gender,
            age: formData.age,
            mob: formData.mob,
            bio: formData.bio,
            avatar: avtarUrl
        }
        const res = await axios.put('http://localhost:3001/user/profile'
            , payload, {
            headers: {
                'Content-Type': 'application/json'
            },
            withCredentials: true,
        });
        toast("Profile Updated");
        console.log(res);

    };


    return (

        <>
        <Navbar/>
            <Box sx={{ display: "flex", justifyContent: "center", mt: 6 }}>

                <ToastContainer />
                <Paper elevation={6} sx={{ p: 4, width: "100%", maxWidth: 600 }}>
                    <Typography variant="h5" gutterBottom>Submit Your Profile</Typography>

                    <Typography variant="h6" color="primary">
                        {email ? email : "Loading email..."}
                    </Typography>

                    <Box sx={{ display: "flex", justifyContent: "flex-end", marginRight: "50px" }}>
                        <Box sx={{ position: "relative", display: "inline-block" }}>
                            <Avatar
                                sx={{ width: 80, height: 80 }}
                                src={avatarPreview || ''}
                            />
                            <Button
                                variant="outlined"
                                component="label"
                                size="small"
                                sx={{
                                    minWidth: 0,
                                    position: "absolute",

                                    bottom: 0,
                                    right: 0,
                                    marginTop: "200%",

                                    padding: "4px",
                                    borderRadius: "50%",
                                    backgroundColor: "white",
                                }}
                            >
                                <EditIcon fontSize="small" />
                                <input
                                    type="file"
                                    hidden
                                    accept="image/*"
                                    onChange={handleAvatarChange}
                                />
                            </Button>
                        </Box>
                    </Box>
                    <form onSubmit={handleSubmit(onSubmit, (err) => {
                        console.log("❌ Validation Errors:", err);
                        toast.error("Form validation failed");
                    })}>
                        <TextField
                            label="First Name"
                            fullWidth
                            margin="normal"
                            {...register('first_name')}
                            error={!!errors.first_name}
                            helperText={errors.first_name?.message}
                        />
                        <TextField
                            label="Last Name"
                            fullWidth
                            margin="normal"
                            {...register('last_name')}
                            error={!!errors.last_name}
                            helperText={errors.last_name?.message}
                        />
                        <FormLabel sx={{ mt: 2 }}>Gender</FormLabel>
                        <Controller
                            name="gender"
                            control={control}
                            defaultValue=""
                            render={({ field }) => (
                                <RadioGroup row {...field}>
                                    <FormControlLabel value="female" control={<Radio />} label="Female" />
                                    <FormControlLabel value="male" control={<Radio />} label="Male" />
                                    <FormControlLabel value="other" control={<Radio />} label="Other" />
                                </RadioGroup>
                            )}
                        />
                        {errors.gender && (
                            <Typography color="error" variant="body2">
                                {errors.gender.message}
                            </Typography>
                        )}

                        <TextField
                            label="Age"
                            fullWidth
                            margin="normal"
                            {...register('age', { valueAsNumber: true })}
                            error={!!errors.age}
                            helperText={errors.age?.message} />
                        <TextField
                            label="Phone Number"
                            fullWidth
                            margin="normal"
                            {...register('mob')}
                            error={!!errors.mob}
                            helperText={errors.mob?.message}
                        />
                        <TextField
                            label="Bio"
                            fullWidth
                            margin="normal"
                            {...register('bio')}
                            error={!!errors.bio}
                            helperText={errors.bio?.message}
                        />
                        <Button
                            type="submit"
                            variant="contained"
                            color="primary"
                            fullWidth
                            sx={{ mt: 2 }}
                        >
                            Update
                        </Button>
                    </form>
                </Paper>
            </Box>
        </>
    )

}




