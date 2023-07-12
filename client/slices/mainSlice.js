import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const initialState = {
  protocols: [],
  isLoading: false,
  userID: '',
  favorites: [],
  TVL: [],
  Price: [],
  Volume: [],
  MCAP: []
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

export const setTVL = createAsyncThunk('main/setTVL', async (updatedName, thunkAPI) => {
  try {
    const response = await axios.get(`https://api.llama.fi/protocol/${updatedName}`)
    const tvlData = response.data
    let marketData = []
    marketData = tvlData.tvl.map(datapoint => ({
      time: datapoint.date,
      value: datapoint.totalLiquidityUSD
    }));
    return marketData
  } catch (error) {
    throw new Error("Couldn't fetch data");
  }
});
export const setPRICE = createAsyncThunk('main/setPRICE', async (updatedName, thunkAPI) => {
  try {
    const response = await axios.get(`https://api.coingecko.com/api/v3/coins/${updatedName}/market_chart?vs_currency=usd&days=max&interval=daily`)
    const coinData = response.data
    let priceData = []
    let volumeData = []
    let mcapData = []
    priceData = coinData.prices.map((price) => ({
      time: price[0] / 1000, // convert ms to secs
      value: price[1],
    }));
    volumeData = coinData.total_volumes.map((price) => ({
      time: price[0] / 1000, // convert ms to secs
      value: price[1],
      color: 'blue'
    }));
    mcapData = coinData.market_caps.map((price) => ({
      time: price[0] / 1000, // convert ms to secs
      value: price[1],
    }));
    let marketData = {
      priceData,
      volumeData,
      mcapData
    }
    return marketData
  } catch (error) {
    throw new Error("Couldn't fetch data");
  }
});


const mainSlice = createSlice({
  name: 'main',
  initialState,
  reducers: {
    setUserID: (state, action) => {
      state.userID = action.payload;
    },
    // setTVL: (state, action) => {
    //   console.log('here')
    //   state.TVL = action.payload
    // },
    // setPrice: (state, action) => {
    //   state.Price = action.payload
    // },
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
        state.userID = action.payload;
        state.favorites = []
      });

      builder.addCase(setTVL.fulfilled, (state, action) => {
        state.TVL = action.payload
      });
      builder.addCase(setPRICE.fulfilled, (state, action) => {
        state.Price = action.payload.priceData
        state.Volume = action.payload.volumeData
        state.MCAP = action.payload.mcapData
      });
  },
});

export const { setUserID } = mainSlice.actions;

export default mainSlice.reducer;