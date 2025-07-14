import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const uploadImage = createAsyncThunk(
  'user/uploadImage',
  async (file: File, thunkAPI) => {
    try {
      const formData = new FormData();
      formData.append('file', file);
      const res = await axios.post('http://localhost:3001/user/upload', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
       
      return res.data; 
    } catch (error) {
      return thunkAPI.rejectWithValue('Upload failed');
    }
  }
);