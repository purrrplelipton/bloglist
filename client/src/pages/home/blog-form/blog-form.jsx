import Backdrop from "@components/backdrop";
import Loader from "@components/loader";
import blogsApi from "@services/blogs";
import { appendNotification } from "@store/reducers/global";
import { appendBlog, setFormHidden } from "@store/reducers/home";
import { IconPhoto } from "@tabler/icons-react";
import { useState } from "react";
import { connect, useDispatch } from "react-redux";

const BlogForm = ({ formVisible }) => {
  const dispatch = useDispatch();
  const [blogTitle, setBlogTitle] = useState("");
  const [blogContent, setBlogContent] = useState("");
  const [blogThumbnail, setBlogThumbnail] = useState(null);
  const [uploading, setUploading] = useState(false);

  async function uploadBlog(e) {
    e.preventDefault();
    if (!blogTitle || !blogContent) return;
    setUploading(true);
    try {
      const data = await blogsApi.post({
        title: blogTitle,
        content: blogContent,
        thumbnail: blogThumbnail,
      });
      dispatch(
        appendNotification({
          message: "Blog Uploaded",
          color: "success",
        })
      );
      dispatch(appendBlog(data));
      dispatch(setFormHidden());
      setBlogTitle("");
      setBlogContent("");
      setBlogThumbnail(null);
    } catch (error) {
      dispatch(
        appendNotification({
          message: error.message,
          color: "error",
        })
      );
    }
    setUploading(false);
  }

  function handleThumbnailChange(event) {
    const reader = new FileReader();
    const file = event.target.files[0];
    reader.onload = (evt) => setBlogThumbnail(evt.target.result);
    reader.readAsDataURL(file);
  }

  return (
    formVisible && (
      <>
        <Backdrop
          isOpen={formVisible}
          onClose={() => dispatch(setFormHidden())}
        >
          <form
            onClick={(e) => e.stopPropagation()}
            encType="multipart/form-data"
            onSubmit={uploadBlog}
            className="w-full h-full max-h-[720px] bg-white mt-auto rounded-tr-3xl rounded-tl-3xl p-6 overflow-auto"
          >
            <input
              id="title"
              type="text"
              placeholder="Title"
              value={blogTitle}
              onChange={(e) => setBlogTitle(e.target.value)}
              className="sticky block w-full px-3 py-2 border-2 outline-none bg-slate-50 rounded-xl border-slate-100 bottom-6"
            />
            <textarea
              id="content"
              cols="30"
              rows="10"
              placeholder="Content"
              value={blogContent}
              onChange={(e) => setBlogContent(e.target.value)}
              style={{ formSizing: "content" }}
              className="block w-full px-3 py-2 my-3 border-2 outline-none resize-none bg-slate-50 rounded-xl border-slate-100"
            />

            <div className="relative overflow-hidden">
              <label
                htmlFor="blog-thumbnail"
                className="z-50 flex items-center justify-center gap-1 p-2 mb-3 bg-slate-50 rounded-xl"
              >
                <IconPhoto />
                {blogThumbnail ? "change" : "pick a"} thumbnail
              </label>
              <input
                type="file"
                accept="image/*"
                name="thumbnail"
                id="blog-thumbnail"
                onChange={handleThumbnailChange}
                className="absolute inset-0 -z-50"
              />
              {blogThumbnail && (
                <img
                  src={blogThumbnail}
                  alt="Thumbnail Preview"
                  className="mb-3 rounded-xl"
                />
              )}
            </div>
            <button
              type="submit"
              aria-disabled={
                !blogTitle.trim() || !blogContent.trim() || uploading
              }
              aria-label="Upload blog"
              className="sticky block w-full p-3 bg-yellow-300 active:scale-95 aria-disabled:active:scale-100 aria-disabled:bg-yellow-100 rounded-xl"
            >
              {uploading ? <Loader width={22} /> : <span>Upload</span>}
              {uploading && <i className="block h-6" />}
            </button>
          </form>
        </Backdrop>
      </>
    )
  );
};

const mapStateToProps = (state) => ({ formVisible: state.home.formVisible });

export default connect(mapStateToProps)(BlogForm);
