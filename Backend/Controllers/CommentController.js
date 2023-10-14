import Blog from "../Models/BlogModel.js";
import User from "../Models/UserModel.js";
import jwt from "jsonwebtoken";
import { nanoid } from "nanoid";

export const addComment = async (req, res) => {
  try {
    const { token, id, comment } = req.body;

    if (!id || !token || !comment) {
      return res.status(404).json({
        success: false,
        message: "all fileds are mandatory",
      });
    }

    const decodeToken = jwt.verify(token, process.env.SECRET_KEY);

    if (!decodeToken) {
      return res
        .status(404)
        .json({ success: false, message: "not a valid token" });
    }

    const userId = decodeToken?.userId;

    const user = await User.findById(userId);

    const comId = nanoid();
    console.log(comId);

    if (user) {
      const findBlogUpdate = await Blog.findByIdAndUpdate(
        id,
        {
          $push: {
            comments: {
              comment: comment,
              userId: userId,
              name: user.name,
              commentId: comId,
            },
          },
        },
        { new: true }
      );

      if (findBlogUpdate) {
        const afterUpdate = await Blog.findById(id);

        if (afterUpdate) {
          return res.status(201).json({
            success: true,
            message: "Comment added",
            afterCommentUpdate: afterUpdate,
          });
        }
      }
    }

    return res.status(201).json({
      success: true,
      message: "Not a valid user",
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// edit comment

export const editComment = async (req, res) => {
  try {
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
export const deleteComment = async (req, res) => {
  try {
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
