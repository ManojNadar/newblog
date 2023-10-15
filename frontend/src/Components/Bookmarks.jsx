import React, { useEffect, useState } from "react";
import api from "./ApiConfig";
import Navbar from "./Navbar";
import "../Styles/Bookmarks.css";
import { useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";

const Bookmarks = () => {
  const [bookmarks, setBookmarks] = useState([]);
  const route = useNavigate();
  //   console.log(bookmarks);

  useEffect(() => {
    async function getBookmarks() {
      try {
        const token = JSON.parse(localStorage.getItem("blogtoken"));

        const response = await api.post("/getbookmarks", { token });

        if (response.data.success) {
          setBookmarks(response.data.bookmarks);
        }
      } catch (error) {
        console.log(error);
      }
    }

    getBookmarks();
  }, []);

  const deleteBookmark = async (id) => {
    try {
      const token = JSON.parse(localStorage.getItem("blogtoken"));

      const response = await api.post("/deletebookmark", { id, token });

      if (response.data.success) {
        toast.success(response.data.message);
        setBookmarks(response.data.updatedBookmarks);
      }
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <>
      <div className="bookmarksContainer">
        <Navbar />

        <div className="mainBookmarkSection">
          {bookmarks?.length ? (
            <div className="singleBookmarkContainer">
              {bookmarks?.map((b) => (
                <div className="singleBookmark" key={b._id}>
                  <div
                    onClick={() => route(`/singleblog/${b._id}`)}
                    className="singleBookmarkImage"
                  >
                    <img src={b.image} alt="" />
                  </div>
                  <div className="singleBookmarkTitle">{b.title}</div>

                  <button
                    onClick={() => deleteBookmark(b._id)}
                    className="removeBookMark"
                  >
                    Remove
                  </button>
                </div>
              ))}
            </div>
          ) : (
            <div className="noBookmarks">
              <h2>NO BOOKMARKS</h2>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default Bookmarks;
