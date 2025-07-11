
import { createSlice } from '@reduxjs/toolkit';
import { uploadImage } from '../async/uploadImage';


const initialState = {
  avatarUrl: '',
  uploadStatus: 'idle', 
  error: '',
};

const apiSlice = createSlice({
  name: 'api',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(uploadImage.pending, (state) => {
        state.uploadStatus = 'loading';
      })
      .addCase(uploadImage.fulfilled, (state, action) => {
        state.uploadStatus = 'succeeded';
        state.avatarUrl = action.payload;
      })
      .addCase(uploadImage.rejected, (state, action) => {
        state.uploadStatus = 'failed';
        state.error = action.payload as string;
      });
  },
});

export default apiSlice.reducer;
