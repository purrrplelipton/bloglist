import { createSlice } from "@reduxjs/toolkit";
import blogsApi from "@services/blogs";
import { appendNotification } from "./global";

const home = createSlice({
  name: "home",
  initialState: {
    blogs: [],
    loading: false,
    formVisible: false,
  },
  reducers: {
    startLoading: (state, _) => {
      return { ...state, loading: true };
    },
    stopLoading: (state, _) => {
      return { ...state, loading: false };
    },
    setFormVisible: (state, _) => {
      return { ...state, formVisible: true };
    },
    setFormHidden: (state, _) => {
      return { ...state, formVisible: false };
    },
    appendBlog: (state, action) => {
      const { payload } = action;
      return { ...state, blogs: [payload, ...state.blogs] };
    },
    setBlogs: (state, action) => {
      const { payload } = action;
      return { ...state, blogs: payload };
    },
  },
});

export const {
  appendBlog,
  setBlogs,
  setFormVisible,
  setFormHidden,
  startLoading,
  stopLoading,
} = home.actions;
export function initializeBlogs() {
  return async (dispatch) => {
    dispatch(startLoading());
    try {
      const blogs = await blogsApi.get();
      dispatch(setBlogs(blogs));
    } catch (error) {
      dispatch(appendNotification({ message: error.message, color: "error" }));
    }
    dispatch(stopLoading());
  };
}
export function createBlog(blog) {
  return async (dispatch) => {
    try {
      const newBlog = await blogsApi.post(blog);
      dispatch(appendBlog(newBlog));
    } catch (error) {
      dispatch(appendNotification({ message: error.message, color: "error" }));
    }
  };
}
export default home.reducer;
