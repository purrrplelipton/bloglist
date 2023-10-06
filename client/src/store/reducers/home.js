import { createSlice } from "@reduxjs/toolkit";
import blogsApi from "@services/blogs";

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
      return { ...state, blogs: [...state.blogs, payload] };
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
    const blogs = await blogsApi.get();
    dispatch(setBlogs(blogs));
    dispatch(stopLoading());
  };
}
export function createBlog(blog) {
  return async (dispatch) => {
    const newBlog = await blogsApi.post(blog);
    dispatch(appendBlog(newBlog));
  };
}
export default home.reducer;
