import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const uploadImage = createAsyncThunk(
  'user/uploadImage',
  async (file: File, thunkAPI) => {
    try {
       console.log("inside thunk");
      const formData = new FormData();
      formData.append('file', file);
      const res = await axios.post('http://localhost:3001/user/upload', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
       console.log(res.data);
      return res.data; 
    } catch (error) {
        console.log('err aaya up0ad karte time');
      return thunkAPI.rejectWithValue('Upload failed');
    }
  }
);