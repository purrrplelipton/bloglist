import { createSlice } from "@reduxjs/toolkit";
import userApi from "@services/users";

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
  return async (dispatch, getState) => {
    const {
      global: { user },
    } = getState();
    const info = await userApi.get();
    dispatch(setUserInfo(info));
  };
}
export default userSlice.reducer;
