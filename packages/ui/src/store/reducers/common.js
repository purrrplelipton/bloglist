import { createSlice } from "@reduxjs/toolkit"

const commonSlice = createSlice({
  name: "common",
  initialState: {
    showDrawer: false,
    searchParam: "",
    searching: false,
    searchResults: [],
  },
  reducers: {
    showDrawer: (state) => {
      state.showDrawer = true
    },
    hideDrawer: (state) => {
      state.showDrawer = false
    },
    setSearchParam: (state, action) => {
      const { payload } = action
      state.searchParam = payload
    },
    setSearching: (state, action) => {
      const { payload } = action
      state.searching = Boolean(payload)
    },
    setSearchResults: (state, action) => {
      const { payload } = action
      state.searchResults = payload
    },
  },
})

export const {
  showDrawer,
  hideDrawer,
  setSearchParam,
  setSearchResults,
  setSearching,
} = commonSlice.actions
export default commonSlice.reducer
