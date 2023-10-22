import { createSlice } from "@reduxjs/toolkit"
import { v4 } from "uuid"

const globalSlice = createSlice({
  name: "global",
  initialState: {
    user: null,
    notifications: [],
  },
  reducers: {
    setUser: (state, action) => {
      const { payload } = action
      state.user = payload
    },
    appendNotification: (state, action) => {
      const { payload } = action
      state.notifications.unshift({ ...payload, id: v4() })
    },
    removeNotification: (state, action) => {
      const { payload } = action
      const notification = state.notifications.find(
        (notification) => notification.id === payload,
      )
      if (notification) {
        const newNotifications = state.notifications.filter(
          (notification) => notification.id !== payload,
        )
        state.notifications = newNotifications
      }
    },
  },
})

export const { setUser, appendNotification, removeNotification } =
  globalSlice.actions
export default globalSlice.reducer
