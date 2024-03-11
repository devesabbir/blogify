import { useEffect, useRef, useState } from "react";
import Layout from "../components/common/Layout";
import closeIcon from "./../assets/icons/close.svg";
import { useForm } from "react-hook-form";
import useAxios from "../hooks/useAxios";
import Field from "../components/common/Field";
import useBlog from "./../hooks/useBlog";
import { actions } from "../actions";
import { useLocation, useNavigate, useParams } from "react-router-dom";

export default function CreateBlogPage() {
  const imageInputRef = useRef(null);
  const [previewURL, setPreviewURL] = useState();
  const [previewType, setPreviewType] = useState("creating");
  const [image, setImage] = useState();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();
  const { api } = useAxios();
  const { dispatch } = useBlog();
  const navigate = useNavigate();
  const location = useLocation();

  const [editMode, setEditMode] = useState(false);
  const { id } = useParams();

  const handleImageChange = () => {
    imageInputRef.current.click();
    imageInputRef.current.addEventListener("change", () => {
      const file = imageInputRef.current?.files[0];
      setImage(file);
      // Generate a preview URL
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => {
        setPreviewType("creating");
        setPreviewURL(reader.result);
      };
    });
  };

  const handleRemovePhoto = () => {
    imageInputRef.current.value = "";
    setImage(null);
    setPreviewURL(null);
  };

  const handleOnSubmit = async (data) => {
    const formData = new FormData();
    formData.append("title", data.title);
    formData.append("content", data.content);
    formData.append("tags", data.tags);
    formData.append("thumbnail", image);
    const res = await api.post(`/blogs`, formData);
    if (res.status === 201) {
      dispatch({ type: actions.blog.BLOG_CREATED, data: res?.data?.blog });
      navigate(location.state ? location.state : "/profile");
    }
  };

  const handleEditOnSubmit = async (data) => {
    const formData = new FormData();
    formData.append("title", data.title);
    formData.append("content", data.content);
    formData.append("tags", data.tags);

    if (!(editMode && previewType === "updating")) {
      formData.append("thumbnail", image);
    }

    const res = await api.patch(`/blogs/${id}`, formData);
    if (res.status === 200) {
      dispatch({ type: actions.blog.BLOG_CREATED, data: res?.data?.blog });
      navigate(location.state ? location.state : "/profile");
    }
  };

  const isNoError = (obj) => {
    return Object.keys(obj).length === 0;
  };

  // fetch editable content
  useEffect(() => {
    let ignore = false;
    const fetchSingleBlog = async () => {
      const res = await api.get(`/blogs/${id}`);
      if (res.status === 200) {
        reset({
          title: res?.data?.title,
          content: res?.data?.content,
          tags: res?.data?.tags,
        });
        setPreviewURL(res.data?.thumbnail);
        setPreviewType("updating");
      }
    };

    if (!ignore) {
      fetchSingleBlog();
    }

    return () => {
      ignore = true;
    };
  }, [api, id, reset]);

  // update form mode
  useEffect(() => {
    if (id) {
      setEditMode(true);
    }
  }, [id, reset]);

  return (
    <Layout>
      <section>
        <div className="container">
          {/* Form Input field for creating Blog Post */}
          <form
            className="createBlog"
            onSubmit={handleSubmit(
              editMode ? handleEditOnSubmit : handleOnSubmit
            )}
          >
            <div className="grid place-items-center bg-slate-600/20 h-[150px] rounded-md my-4">
              <input ref={imageInputRef} type="file" accept="image/*" hidden />
              {previewURL && (
                <div className="relative w-full">
                  <img
                    className="w-full h-[100px] object-cover"
                    src={
                      editMode && previewType === "updating"
                        ? `${
                            import.meta.env.VITE_SERVER_BASE_URL
                          }/uploads/blog/${previewURL}`
                        : previewURL
                    }
                    alt="preview"
                  />
                  <div
                    onClick={handleRemovePhoto}
                    className="absolute top-0 right-0 cursor-pointer d-block "
                  >
                    <img
                      className="w-[30px] me-1 mt-1"
                      src={closeIcon}
                      alt="close"
                    />
                  </div>
                </div>
              )}

              <div
                onClick={handleImageChange}
                className="flex items-center gap-4 hover:scale-110 transition-all cursor-pointer"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="1.5"
                  stroke="currentColor"
                  className="w-6 h-6"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="m2.25 15.75 5.159-5.159a2.25 2.25 0 0 1 3.182 0l5.159 5.159m-1.5-1.5 1.409-1.409a2.25 2.25 0 0 1 3.182 0l2.909 2.909m-18 3.75h16.5a1.5 1.5 0 0 0 1.5-1.5V6a1.5 1.5 0 0 0-1.5-1.5H3.75A1.5 1.5 0 0 0 2.25 6v12a1.5 1.5 0 0 0 1.5 1.5Zm10.5-11.25h.008v.008h-.008V8.25Zm.375 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Z"
                  />
                </svg>
                <p>Upload Your Image</p>
              </div>
            </div>
            <div className="mb-6">
              <Field label={""} htmlFor="title" error={errors.title}>
                <input
                  {...register("title", { required: "Title is required" })}
                  type="text"
                  id="title"
                  name="title"
                  placeholder="Enter your blog title"
                />
              </Field>
            </div>
            <div className="mb-6">
              <Field label={""} htmlFor="tags" error={errors.tags}>
                <input
                  {...register("tags", { required: "Tags is required" })}
                  type="text"
                  id="tags"
                  name="tags"
                  placeholder="Your Comma Separated Tags Ex. JavaScript, React, Node, Express,"
                />
              </Field>
            </div>
            <div className="mb-6">
              <Field label={""} htmlFor="content" error={errors.content}>
                <textarea
                  {...register("content", { required: "Content is required" })}
                  id="content"
                  name="content"
                  placeholder="Write your blog content"
                  rows={8}
                  defaultValue={""}
                />
              </Field>
            </div>
            <button
              role="submit"
              className={` ${
                isNoError(errors) ? "bg-indigo-600" : "bg-stone-700"
              } text-white px-6 py-2 md:py-3 rounded-md hover:bg-indigo-700 transition-all duration-200`}
            >
              {editMode ? "Update Blog" : "Create Blog"}
            </button>
          </form>
        </div>
      </section>
    </Layout>
  );
}
