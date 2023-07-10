import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const initialState = {
  protocols: [],
  isLoading: false,
  userID: '',
  favorites: []
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

export const getUserFavorites = createAsyncThunk('main/getUserFavorites', async (_, thunkAPI) => {
  try {
    const userID = thunkAPI.getState().main.userID;
    console.log('here', userID)
    const response = await axios.get('http://localhost:3001/favorites', {
      headers: {
        'X-User-ID': userID
      }
    });
    const userFavorites = response.data;
    return userFavorites;
  } catch (error) {
    console.log(error);
    throw new Error("Couldn't fetch user favorites");
  }
});

export const addFavorite = createAsyncThunk('main/addFavorite', async (item, thunkAPI) => {
  try {

    console.log(item)
    const response = await axios.post('http://localhost:3001/favorites', item);
    console.log(response.data)
    const addedFavorite = response.data;

    return addedFavorite;
  } catch (error) {
    console.log(error);
    throw new Error("Couldn't add favorite");
  }
});

export const removeFavorite = createAsyncThunk('main/removeFavorite', async (item, thunkAPI) => {
  try {
    await axios.delete(`http://localhost:3001/favorites`, { data: item });

    return item.protocolID;
  } catch (error) {
    console.log(error);
    throw new Error("Couldn't remove favorite");
  }
});

export const updateUserID = createAsyncThunk('main/updateUserID', async (_, { getState }) => {
  try {
    const userID = getState().auth.userId;
    return userID;
  } catch (error) {
    console.log(error);
    throw new Error("Couldn't update userID");
  }
});


const mainSlice = createSlice({
  name: 'main',
  initialState,
  reducers: {
    setUserID: (state, action) => {
      state.userID = action.payload;
    },
  },
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

      builder.addCase(getUserFavorites.fulfilled, (state, action) => {
        state.favorites = []
        state.favorites = action.payload;
      });

      builder.addCase(addFavorite.fulfilled, (state, action) => {
        state.favorites.push(action.payload);
      });
  
      builder.addCase(removeFavorite.fulfilled, (state, action) => {
        console.log(action.payload)
        const removedItemId = action.payload;
        state.favorites = state.favorites.filter((favorite) => favorite.id !== removedItemId);
      });

      // Add the custom reducer to update state.main.userID
      builder.addCase(updateUserID.fulfilled, (state, action) => {
        console.log('updated user')
        state.userID = action.payload;
        state.favorites = []
      });
  },
});

export const { setUserID } = mainSlice.actions;

export default mainSlice.reducer;