import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

import { queryCommonData } from "../../services/api/contract";
import type { AppState } from "../store";

interface AppStake {
  contractList: [];
  coinList: [];
  exchangeList: [];
}

export const initialState: AppStake = {
  contractList: [],
  coinList: [],
  exchangeList: [],
};

export const getContractList = createAsyncThunk(
  "contract/queryCommonData",
  async () => {
    const response = await queryCommonData();
    return response;
  }
);

export const slice = createSlice({
  name: "contract",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getContractList.fulfilled, (state, { payload }) => {
      if (payload?.data?.code === 0) {
        state.contractList = payload?.data?.data?.contracts || [];
        state.coinList = payload?.data?.data?.coins || [];
        state.exchangeList = payload?.data?.data?.exchanges || [];
      }
    });
    builder.addCase(getContractList.rejected, (state, action) => {
      if (action.payload) {
      } else {
      }
    });
  },
});

export const {} = slice.actions;

export const selectContractList = (state: AppState) =>
  state.contract.contractList;

export default slice.reducer;
