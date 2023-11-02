import React, { useContext, useEffect, useState, useRef } from "react";
import "../../Styles/BlogsCss/CreateBlog.css";
import { useNavigate } from "react-router-dom";
import { MyContext } from "../Context/BlogContext";
import Navbar from "../Navbar";
import { toast } from "react-hot-toast";
import api from "../ApiConfig";

// import { Editor } from "@tinymce/tinymce-react";
// import parse from "html-react-parser";

const AddBlog = () => {
  const [detail, setDetail] = useState({
    title: "",
    image: "",
    categories: "",
    description: "",
  });

  console.log(detail);
  const { state } = useContext(MyContext);
  const route = useNavigate();

  const handleChange = (e) => {
    const { value, name } = e.target;

    setDetail({
      ...detail,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const { title, image, description, categories } = detail;
    if (title && image && description && categories) {
      //   console.log(title, image, description, categories);
      const token = JSON.parse(localStorage.getItem("blogtoken"));
      try {
        const response = await api.post("/addblog", {
          detail,
          token,
        });

        if (response.data.success) {
          toast.success(response.data.message);
          setDetail({
            title: "",
            image: "",
            description: "",
            categories: "",
          });
          route("/allblogs");
        } else {
          toast.error(response.data.message);
        }
      } catch (error) {
        toast.error(error.message);
      }
    } else {
      toast.error("All fields are mandatory");
    }
  };

  useEffect(() => {
    if (state) {
      if (state?.currentuser?.role !== "Admin") {
        route("/");
      }
    }
  }, [state?.currentuser, route]);

  return (
    <>
      <div className="blogContainer">
        <Navbar />

        <div className="addBlogSection">
          <form className="adddBlogInputContainer" onSubmit={handleSubmit}>
            <div className="allBlogInputContainer">
              <label htmlFor="">BLOG TITLE</label> <br />
              <input
                type="text"
                placeholder="ENTER TITLE"
                onChange={handleChange}
                value={detail.title}
                name="title"
              />
            </div>
            <div className="allBlogInputContainer">
              <label htmlFor="">BLOG IMAGE</label> <br />
              <input
                type="text"
                placeholder="ENTER URL"
                onChange={handleChange}
                value={detail.image}
                name="image"
              />
            </div>
            <div className="allBlogInputContainer">
              <label htmlFor="">CATEGORIES</label> <br />
              <select
                onChange={handleChange}
                name="categories"
                value={detail.categories}
              >
                <option value="">SELECT CATEGORY</option>
                <option value="Trekking">Trekking</option>
                <option value="Waterfalls">Waterfalls</option>
                <option value="hills">Hill stations</option>
                <option value="Roads">Roads</option>
                <option value="Beaches">Beaches</option>
                <option value="Camping">Camping</option>
              </select>
            </div>
            <div className="allBlogInputContainer">
              <label>BLOG DESCRIPTION</label> <br />
              <textarea
                cols="30"
                rows="14"
                placeholder="Enter Description"
                onChange={handleChange}
                value={detail.description}
                name="description"
              ></textarea>
              {/* 
              <Editor
                init={{
                  menubar: false,
                  content_css: "dark",
                  height: 400,
                }}
                initialValue="<p>Enter Description</p>"
                onEditorChange={(newValue) => setDescription(newValue)}
                value={description}
              /> */}
            </div>
            <div className="allBlogInputContainer">
              <button className="submitBtn" type="submit">
                Submit
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default AddBlog;
