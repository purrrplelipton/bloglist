import { createSlice } from "@reduxjs/toolkit";
import userApi from "@services/users";
import { appendNotification } from "./global";

const userSlice = createSlice({
  name: "user",
  initialState: null,
  reducers: {
    setUserInfo: (_, action) => {
      const { payload } = action;
      return payload;
    },
    addToFavorites: (state, action) => {
      const { payload } = action;
      const id = state.favorites.findIndex(payload);
      if (id === -1) {
        state.favorites.push(id);
      }
    },
    removeFromFavorites: (state, action) => {
      const { payload } = action;
      const id = state.favorites.findIndex(payload);
      if (id !== -1) {
        const newFaves = state.favorites.filter((blogID) => blogID !== payload);
        state.favorites = newFaves;
      }
    },
  },
});

export const { addToFavorites, removeFromFavorites, setUserInfo } =
  userSlice.actions;
export function initializeUserInfo() {
  return async (dispatch) => {
    try {
      const info = await userApi.get();
      dispatch(setUserInfo(info));
    } catch (error) {
      dispatch(appendNotification({ message: error.message, color: "error" }));
    }
  };
}
export default userSlice.reducer;
