import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const initialState = {
  token: '',
  error: '',
  isLoading: false,
  userId: '',
};

const signUp = createAsyncThunk('auth/signUp', async (params, thunkAPI) => {
  try {
    const response = await axios.post('http://localhost:3001/registration', params.formData);
    const jwt = response.data.token;
    return jwt;
  } catch (error) {
    return thunkAPI.rejectWithValue(error.response.data);
  }
});

const signIn = createAsyncThunk('auth/signIn', async (params, thunkAPI) => {
  try {
    const response = await axios.post('http://localhost:3001/login', params.formData);
    const token = response.data.token;
    return token;
  } catch (error) {
    return thunkAPI.rejectWithValue(error.response.data);
  }
});

const checkToken = createAsyncThunk('auth/checkToken', async (params, thunkAPI) => {
  if (localStorage.token) {
    try {
      const response = await axios.get('http://localhost:3001/protected', {
        headers: {
          authorization: localStorage.token,
        },
      });

      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  } else {
    return { isValid: false };
  }
});

const googleSignUp = createAsyncThunk('auth/googleSignUp', async (_, thunkAPI) => {
  try {
    const response = await axios.get('http://localhost:3001/auth/google/signup');
    const jwt = response.data.token;
    return jwt;
  } catch (error) {
    return thunkAPI.rejectWithValue(error.response.data);
  }
});

const googleSignIn = createAsyncThunk('auth/googleSignIn', async (params, thunkAPI) => {
  try {
    const response = await axios.post('http://localhost:3001/auth/google/signin', params.formData);
    const token = response.data.token;
    return token;
  } catch (error) {
    return thunkAPI.rejectWithValue(error.response.data);
  }
});

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    signOut: (state, action) => {
      state.token = '';
      localStorage.removeItem('token');
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(signUp.pending, (state, action) => {
        state.isLoading = true;
      })
      .addCase(signUp.fulfilled, (state, action) => {
        state.isLoading = false;
        state.token = action.payload;
        localStorage.setItem('token', action.payload);
      })
      .addCase(signUp.rejected, (state, action) => {
        state.isLoading = false;
        state.error = 'Couldn\'t fetch data';
      })
      .addCase(signIn.pending, (state, action) => {
        state.isLoading = true;
      })
      .addCase(signIn.fulfilled, (state, action) => {
        state.isLoading = false;
        state.token = action.payload;
        localStorage.setItem('token', action.payload);
      })
      .addCase(signIn.rejected, (state, action) => {
        state.isLoading = false;
        state.error = 'Couldn\'t fetch data';
      })
      .addCase(checkToken.pending, (state, action) => {
        state.isLoading = true;
      })
      .addCase(checkToken.fulfilled, (state, action) => {
        state.isLoading = false;
        if (action.payload.isValid) {
          state.token = localStorage.token;
          state.userId = action.payload.id
        }
      })
      .addCase(checkToken.rejected, (state, action) => {
        state.isLoading = false;
        state.error = 'Couldn\'t fetch data';
      })
      .addCase(googleSignUp.pending, (state, action) => {
        state.isLoading = true;
      })
      .addCase(googleSignUp.fulfilled, (state, action) => {
        state.isLoading = false;
        state.token = action.payload;
        localStorage.setItem('token', action.payload);
      })
      .addCase(googleSignUp.rejected, (state, action) => {
        state.isLoading = false;
        state.error = 'Couldn\'t fetch data';
      })
      .addCase(googleSignIn.fulfilled, (state, action) => {
        state.isLoading = false;
        state.token = action.payload;
        localStorage.setItem('token', action.payload);
      })
      .addCase(googleSignIn.rejected, (state, action) => {
        state.isLoading = false;
        state.error = 'Couldn\'t fetch data';
      });
  },
});

export const { signOut } = authSlice.actions;

export {
  signUp,
  signIn,
  checkToken,
  googleSignUp,
  googleSignIn,
};

export default authSlice.reducer;
