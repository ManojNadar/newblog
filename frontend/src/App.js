import "./App.css";
import { Routes, Route } from "react-router-dom";
import { MyContext } from "./Components/Context/BlogContext";
import { useContext } from "react";
import Home from "./Components/Home";
import Register from "./Components/Register";
import Login from "./Components/Login";
import AllBlogs from "./Components/Blogs/AllBlogs";
import AddBlog from "./Components/Blogs/AddBlog";
import SingleBlog from "./Components/Blogs/SingleBlog";
import Bookmarks from "./Components/Bookmarks";
import Error from "./Components/Error";

function App() {
  const { state } = useContext(MyContext);
  console.log(state);
  return (
    <>
      <Routes>
        <Route exact path="/" element={<Home />} />
        <Route exact path="/register" element={<Register />} />
        <Route exact path="/login" element={<Login />} />
        <Route exact path="/allblogs" element={<AllBlogs />} />
        <Route exact path="/addblog" element={<AddBlog />} />
        <Route exact path="/singleblog/:id" element={<SingleBlog />} />
        <Route exact path="/getbookmarks" element={<Bookmarks />} />
        <Route exact path="*" element={<Error />} />
      </Routes>
    </>
  );
}

export default App;
