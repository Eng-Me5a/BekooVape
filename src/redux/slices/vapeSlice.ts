// src/redux/slices/vapeSlice.ts
import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import axios from 'axios';

export type Vape = {
  id: number;
  title: string;
  price: number;
  imageUrl: string;
  sizes: number[];
  types: string[];
};

export enum Status {
  LOADING = 'loading',
  SUCCESS = 'success',
  ERROR = 'error',
}

interface VapeSliceState {
  items: Vape[];
  status: Status;
}

const initialState: VapeSliceState = {
  items: [],
  status: Status.LOADING,
};

export const fetchVapes = createAsyncThunk<Vape[], string>(
  'vape/fetchVapesStatus',
  async (params) => {
    const res = await axios.get(`http://localhost:3001/vapes?${params}`);
    return res.data;
  }
);

const vapeSlice = createSlice({
  name: 'vape',
  initialState,
  reducers: {
    setItems(state, action: PayloadAction<Vape[]>) {
      state.items = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchVapes.pending, (state) => {
        state.status = Status.LOADING;
        state.items = [];
      })
      .addCase(fetchVapes.fulfilled, (state, action) => {
        state.status = Status.SUCCESS;
        state.items = action.payload;
      })
      .addCase(fetchVapes.rejected, (state) => {
        state.status = Status.ERROR;
        state.items = [];
      });
  },
});

export const { setItems } = vapeSlice.actions;
export default vapeSlice.reducer;
