import User from "../Models/UserModel.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import Blog from "../Models/BlogModel.js";

// Register

export const register = async (req, res) => {
  try {
    const { name, email, password, role } = req.body.user;
    // const { name, email, password, number, role } = req.body;

    console.log(name, email, password, role);

    if (!name || !email || !password || !role)
      return res.status(404).json({
        success: false,
        message: "all fields are mandatory",
      });

    const isEmailExist = await User.find({ email });

    if (isEmailExist?.length) {
      return res.status(404).json({
        success: false,
        message: "Email already registered Please try another email",
      });
    }

    const hashPass = await bcrypt.hash(password, 10);
    const userDetail = new User({
      name,
      email,
      password: hashPass,
      role,
    });

    await userDetail.save();

    return res.status(200).json({
      success: true,
      message: "Registered Success",
      data: userDetail,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
// Login
export const login = async (req, res) => {
  try {
    const { email, password } = req.body.user;

    if (!email || !password) {
      return res.status(404).json({
        success: false,
        message: "All fields are mandatory",
      });
    }

    const user = await User.findOne({ email });

    if (user) {
      const isPasswordMatch = await bcrypt.compare(password, user.password);

      if (isPasswordMatch) {
        const userObj = {
          name: user.name,
          email: user.email,
          _id: user._id,
          role: user.role,
        };
        const token = jwt.sign({ userId: user._id }, process.env.SECRET_KEY);
        return res.json({
          success: true,
          message: "Logged In Success",
          userData: userObj,
          token: token,
        });
      }
    }
    return res.json({
      success: false,
      message: "invalid Credential",
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Currentuser
export const currentuser = async (req, res) => {
  try {
    const { token } = req.body;

    // console.log(token);

    if (!token)
      return res
        .status(404)
        .json({ success: false, message: "token is required" });

    const decodeToken = jwt.verify(token, process.env.SECRET_KEY);

    if (!decodeToken) {
      return res
        .status(404)
        .json({ success: false, message: "not a valid token" });
    }

    const userId = decodeToken?.userId;

    const user = await User.findById(userId);

    // console.log(user);

    if (user) {
      const userObj = {
        name: user.name,
        email: user.email,
        userId: user._id,
        role: user.role,
      };

      // console.log(userObj);

      return res.status(200).json({
        success: true,
        currentuser: userObj,
      });
    }

    return res.status(404).json({ success: false, message: "user not found" });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const like = async (req, res) => {
  try {
    const { id, token } = req.body;

    if (!token || !id) {
      return res.status(404).json({
        success: false,
        message: "id and token is required",
      });
    }

    const decodeToken = jwt.verify(token, process.env.SECRET_KEY);

    if (!decodeToken) {
      return res.status(404).json({
        success: false,
        message: "token is not valid",
      });
    }

    const userId = decodeToken?.userId;

    const blog = await Blog.findById(id);

    if (blog) {
      if (blog?.likes) {
        let flag = false;

        for (let i = 0; i < blog?.likes.length; i++) {
          if (blog?.likes[i].includes(userId)) {
            flag = true;
          }
        }

        if (!flag) {
          blog?.likes.push(userId);
          await blog.save();

          return res.status(200).json({
            success: true,
            message: "Liked",
            isLiked: true,
          });
        }

        const filterBlogLikes = blog?.likes?.filter((e) => e != userId);

        blog.likes = filterBlogLikes;
        await blog.save();
        return res.status(200).json({
          success: true,
          message: "UnLiked",
          isLiked: false,
        });
      }
    }

    return res.status(404).json({
      success: false,
      message: "blog not found",
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const bookmarks = async (req, res) => {
  try {
    const { id, token } = req.body;

    if (!token || !id) {
      return res.status(404).json({
        success: false,
        message: "id and token is required",
      });
    }

    const decodeToken = jwt.verify(token, process.env.SECRET_KEY);

    if (!decodeToken) {
      return res.status(404).json({
        success: false,
        message: "token is not valid",
      });
    }

    const userId = decodeToken?.userId;

    const user = await User.findById(userId);

    if (user) {
      if (user?.bookmarks) {
        let flag = false;

        for (let i = 0; i < user?.bookmarks.length; i++) {
          if (user?.bookmarks[i].includes(id)) {
            flag = true;
          }
        }

        if (!flag) {
          user?.bookmarks.push(id);
          await user.save();
          return res.status(200).json({
            success: true,
            message: "Saved",
            isBookmarked: true,
          });
        }

        const filterBlogUser = user?.bookmarks?.filter((e) => e != id);

        user.bookmarks = filterBlogUser;
        await user.save();

        return res.status(200).json({
          success: false,
          message: "Removed from Bookmark",
          isBookmarked: false,
        });
      }
    }

    return res.status(404).json({
      success: false,
      message: "blog not found",
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const getBookmarks = async (req, res) => {
  try {
    const { token } = req.body;

    console.log(token);
    if (!token) {
      return res.status(404).json({
        success: false,
        message: "token is required",
      });
    }

    const decodeToken = jwt.verify(token, process.env.SECRET_KEY);

    const userId = decodeToken?.userId;

    const user = await User.findById(userId);

    if (user) {
      let finalBlog = [];
      for (let i = 0; i < user.bookmarks.length; i++) {
        const findBlog = await Blog.findById(user.bookmarks[i]);

        if (findBlog) {
          finalBlog.push(findBlog);
        }
      }

      return res.status(200).json({
        success: true,
        bookmarks: finalBlog,
      });
    }

    return res.status(404).json({
      success: true,
      message: "user not found",
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const deleteBookmark = async (req, res) => {
  try {
    const { id, token } = req.body;

    if (!id || !token) {
      return res.status(404).json({
        success: false,
        message: "id and token is required",
      });
    }

    const decodeToken = jwt.verify(token, process.env.SECRET_KEY);

    const userId = decodeToken?.userId;

    const user = await User.findById(userId);

    if (user) {
      const filterBookmark = user?.bookmarks.filter((e) => e != id);
      user.bookmarks = filterBookmark;
      await user.save();

      const updateUser = await User.findById(userId);

      if (updateUser) {
        let finalBlog = [];
        for (let i = 0; i < user.bookmarks.length; i++) {
          const findBlog = await Blog.findById(user.bookmarks[i]);

          if (findBlog) {
            finalBlog.push(findBlog);
          }
        }

        return res.status(200).json({
          success: true,
          message: "Removed from Bookmarks",
          updatedBookmarks: finalBlog,
        });
      }
    }
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
