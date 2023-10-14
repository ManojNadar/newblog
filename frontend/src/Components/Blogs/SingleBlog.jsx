import React, { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import api from "../ApiConfig";
import toast from "react-hot-toast";
import "../../Styles/BlogsCss/SingleBlog.css";
import Navbar from "../Navbar";
import { MyContext } from "../Context/BlogContext";
import { AiFillHeart, AiOutlineDelete } from "react-icons/ai";
import { BsFillBookmarkFill, BsFillXSquareFill } from "react-icons/bs";
import { FiEdit } from "react-icons/fi";

const SingleBlog = () => {
  const [singleBlog, setSingleBlog] = useState({});
  const [edit, setEdit] = useState({});
  const [editModal, setEditModal] = useState(false);
  const { id } = useParams();
  const [comment, setComment] = useState("");
  const { state } = useContext(MyContext);
  const route = useNavigate();

  // console.log(id, "params");
  // console.log(singleBlog);
  //  console.log(edit);

  useEffect(() => {
    async function getSingleBlog() {
      try {
        const response = await api.post("/singleblog", { id });

        if (response.data.success) {
          setSingleBlog(response.data.singleBlog);
        } else {
          toast.error(response.data.message);
        }
      } catch (error) {
        console.log(error.message);
      }
    }

    getSingleBlog();
  }, [id]);

  const handleChange = (e) => {
    const { value, name } = e.target;
    setEdit({ ...edit, [name]: value });
  };

  const editBlog = async (id) => {
    setEditModal(true);
    try {
      const token = JSON.parse(localStorage.getItem("blogtoken"));

      const response = await api.post("editblog", { token, id });

      if (response.data.success) {
        setEdit(response.data.editblog);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const submitUpdatedBlog = async (e) => {
    e.preventDefault();

    try {
      const token = JSON.parse(localStorage.getItem("blogtoken"));
      const response = await api.post("/updateblog", { edit, token, id });
      if (response.data.success) {
        toast.success(response.data.message);
        setEditModal(false);
        setSingleBlog(response.data.updatedBlog);
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  const deleteBlog = async (id) => {
    try {
      const token = JSON.parse(localStorage.getItem("blogtoken"));
      const response = await api.post("/deleteblog", { token, id });
      if (response.data.success) {
        route("/allblogs");
        toast.success(response.data.message);
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  const sendComment = (e) => {
    setComment(e.target.value);
  };

  const submitComment = async (id) => {
    try {
      const token = JSON.parse(localStorage.getItem("blogtoken"));
      const response = await api.post("/addcomment", { token, comment, id });
      if (response.data.success) {
        toast.success(response.data.message);
        setComment("");
        setSingleBlog(response.data.afterCommentUpdate);
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <>
      <div className="singleBlogContainer">
        <Navbar />

        <div className="singleBlogMainSection">
          {editModal ? (
            <div className="editBlogContainer">
              <div className="editImage">
                <img src={edit.image} alt="" />
              </div>
              <form className="editFormSection" onSubmit={submitUpdatedBlog}>
                <div>
                  <div className="closeBtn" onClick={() => setEditModal(false)}>
                    <BsFillXSquareFill />
                  </div>
                  <input
                    type="text"
                    value={edit.title}
                    onChange={handleChange}
                    name="title"
                  />
                </div>
                <div>
                  <input
                    type="text"
                    value={edit.image}
                    onChange={handleChange}
                    name="image"
                  />
                </div>
                <div>
                  <input
                    type="text"
                    value={edit.description}
                    onChange={handleChange}
                    name="description"
                  />
                </div>
                <div>
                  <select
                    value={edit.categories}
                    onChange={handleChange}
                    name="categories"
                  >
                    <option value="Trekking">Trekking</option>
                    <option value="Waterfalls">Waterfalls</option>
                    <option value="hills">Hill stations</option>
                    <option value="Roads">Roads</option>
                  </select>
                </div>
                <div>
                  <button className="updateBtn" type="submit">
                    UPADTE
                  </button>
                </div>
              </form>
            </div>
          ) : null}
          <div className="singleBlogPage">
            {state?.currentuser?.role == "Admin" && (
              <div className="editDelete">
                <div className="edit" onClick={() => editBlog(singleBlog._id)}>
                  <FiEdit />
                </div>
                <div
                  className="delete"
                  onClick={() => deleteBlog(singleBlog._id)}
                >
                  <AiOutlineDelete />
                </div>
              </div>
            )}
            {state?.currentuser?.role == "User" && (
              <div className="heartSaveIcons">
                <div className="heart">
                  <AiFillHeart />
                </div>
                <div className="save">
                  <BsFillBookmarkFill />
                </div>
              </div>
            )}
            <div className="date">{singleBlog.date}</div>
            <div className="singlePageBlogImage">
              <img src={singleBlog.image} alt="" />
            </div>
            <div className="singlePageBlogDetails">
              <h5>{singleBlog.title}</h5>
              <p>{singleBlog.description}</p>
              <span className="knowmore">Know More</span>
            </div>

            {state?.currentuser ? (
              <div className="addComment">
                <h5>Add a Comment</h5>
                <div>
                  <input
                    placeholder="Add a comment"
                    name="comment"
                    value={comment}
                    onChange={sendComment}
                  />
                  {comment ? (
                    <button
                      onClick={() => submitComment(singleBlog._id)}
                      className="sendCommentBtn"
                    >
                      Send
                    </button>
                  ) : null}
                </div>

                <div className="commentsHeading">
                  <h5>Comments</h5>
                  <div className="comments">
                    {singleBlog?.comments?.map((comment) => (
                      <div key={comment.commentId}>
                        <h6>Name : {comment.name.toUpperCase()}</h6>
                        <p>comment : {comment.comment}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            ) : (
              <div className="loginForComments">
                Log in to see or add Comments
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default SingleBlog;
