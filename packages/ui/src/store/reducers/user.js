import { createSlice } from "@reduxjs/toolkit"
import userApi from "services/users"
import { appendNotification } from "./global"

const userSlice = createSlice({
  name: "user",
  initialState: null,
  reducers: {
    setUserInfo: (_, action) => {
      const { payload } = action
      return payload
    },
  },
})

export const { addToFavorites, removeFromFavorites, setUserInfo } =
  userSlice.actions
export function initializeUserInfo() {
  return async (dispatch) => {
    try {
      const info = await userApi.get()
      dispatch(setUserInfo(info))
    } catch (error) {
      dispatch(appendNotification({ message: error.message, color: "error" }))
    }
  }
}
export default userSlice.reducer
