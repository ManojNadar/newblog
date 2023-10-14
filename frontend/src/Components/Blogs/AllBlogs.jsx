import React, { useEffect, useState } from "react";
import "../../Styles/BlogsCss/AllBlogs.css";
import Navbar from "../Navbar";
import { AiOutlineSearch } from "react-icons/ai";
import api from "../ApiConfig";
import { useNavigate } from "react-router-dom";

const AllBlogs = () => {
  const [allBlogs, setAllBlogs] = useState([]);
  const route = useNavigate();

  // console.log(allBlogs);
  useEffect(() => {
    async function getAllBlogs() {
      try {
        const response = await api.get("/allblogs");

        if (response.data.success) {
          setAllBlogs(response.data.allBlogs);
        } else {
          setAllBlogs([]);
        }
      } catch (error) {
        console.log(error.message);
      }
    }

    getAllBlogs();
  }, []);

  const filterCatergory = async (e) => {
    const { value } = e.target;

    try {
      const response = await api.get("/allblogs");
      const data = response.data.allBlogs;
      if (value == "Trekking") {
        const filterBlogs = data.filter(
          (blog) => blog.categories == "Trekking"
        );
        setAllBlogs(filterBlogs);
      } else if (value == "Waterfalls") {
        const filterBlogs = data.filter(
          (blog) => blog.categories == "Waterfalls"
        );

        setAllBlogs(filterBlogs);
      } else if (value == "hills") {
        const filterBlogs = data.filter((blog) => blog.categories == "hills");

        setAllBlogs(filterBlogs);
      } else if (value == "Roads") {
        const filterBlogs = data.filter((blog) => blog.categories == "Roads");

        setAllBlogs(filterBlogs);
      } else {
        setAllBlogs(data);
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <>
      <div className="allBlogsContainer">
        <Navbar />
        <div className="allBlogsMainSection">
          <div className="topRight">
            <div className="topSearchInput">
              <div className="searchBlogIcon">
                <AiOutlineSearch />
              </div>
              <input type="text" placeholder="Search" />
            </div>
            <div>
              <select onChange={filterCatergory}>
                <option value="">Categories</option>
                <option value="Trekking">Trekking</option>
                <option value="Waterfalls">Waterfalls</option>
                <option value="hills">Hill stations</option>
                <option value="Roads">Roads</option>
              </select>
            </div>
          </div>

          {allBlogs?.length ? (
            <div className="mainBlogSections">
              {allBlogs?.map((blog) => (
                <div
                  onClick={() => route(`/singleblog/${blog._id}`)}
                  key={blog._id}
                  className="singleBlogSection"
                >
                  <div className="singleBlogImage">
                    <div className="innerImage">{blog.categories}</div>
                    <img src={blog.image} alt="" />
                  </div>
                  <div className="singleBlogDetails">
                    <h5>{blog.title}</h5>
                    <p className="time">{blog.date}</p>
                    <p className="description">
                      {blog.description.slice(0, 100)}...
                    </p>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="noBlogs">No Blogs</div>
          )}
        </div>
      </div>
    </>
  );
};

export default AllBlogs;
