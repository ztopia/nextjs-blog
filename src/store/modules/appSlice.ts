import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

interface AppStake {
  appStatus: "idle" | "loading" | "fulfilled" | "failed";
  isLogin: boolean;
  userHabit: any;
}

export const initialState: AppStake = {
  appStatus: "idle",
  isLogin: false,
  userHabit: {
    upDownColor: "0", // 1001：涨跌色，0：绿涨红跌,1：红涨绿跌，
    currency: "CNY", // 1003：计价方式,
    placeIndex: "second", // 1004：'first：限价，second：市价，third：条件单'
    lever: "10", // 1005：'杠杆倍数'
    countType: 0, // 1006 按金额下单状态 0:张 1:金额
    hideSmall: 1, // 1008 1:隐藏 2:显示
    locale: "zh_CN", // 当前语言
  },
};

export const slice = createSlice({
  name: "app",
  initialState,
  reducers: {
    setAppStatus(state, action) {
      state.appStatus = "fulfilled";
    },
    setIsLogin(state, action) {
      state.isLogin = action.payload;
    },
  },
  extraReducers: (builder) => {},
});

export const { setAppStatus, setIsLogin } = slice.actions;

export const selectAppStatus = (state) => state.appStatus;

export default slice.reducer;
