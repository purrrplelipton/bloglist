import { createSlice } from "@reduxjs/toolkit";

const commonSlice = createSlice({
  name: "common",
  initialState: {
    showDrawer: false,
    searchParam: "",
  },
  reducers: {
    showDrawer: (state, _) => {
      state.showDrawer = true;
    },
    hideDrawer: (state, _) => {
      state.showDrawer = false;
    },
    setSearchParam: (state, action) => {
      const { payload } = action;
      state.searchParam = payload;
    },
  },
});

export const { showDrawer, hideDrawer, setSearchParam } = commonSlice.actions;
export default commonSlice.reducer;
