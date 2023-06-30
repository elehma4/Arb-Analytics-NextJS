import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const initialState = {
  protocols: [],
  isLoading: false,
};

export const getProtocols = createAsyncThunk('main/getProtocols', async (params, thunkAPI) => {
  try {
    const response = await axios.get('http://localhost:3001/protocols');
    const protocols = response.data;
    return protocols;
  } catch (error) {
    console.log(error);
    throw new Error("Couldn't fetch data");
  }
});

const mainSlice = createSlice({
  name: 'main',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getProtocols.pending, (state, action) => {
        state.isLoading = true;
      })
      .addCase(getProtocols.fulfilled, (state, action) => {
        state.isLoading = false;
        state.protocols = action.payload;
      })
      .addCase(getProtocols.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message;
      });
  },
});

export default mainSlice.reducer;