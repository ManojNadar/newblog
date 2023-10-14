import Blog from "../Models/BlogModel.js";

// add blogs

export const addBlog = async (req, res) => {
  try {
    const { title, image, description, categories } = req.body.detail;

    // console.log(title, image, description, categories);

    if (!title || !image || !description || !categories) {
      return res.status(404).json({
        success: false,
        message: "All fields are mandatory",
      });
    }

    const newBlog = new Blog({
      title,
      image,
      description,
      categories,
    });

    await newBlog.save();
    return res.status(201).json({
      success: true,
      message: "new blog added success",
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// all blogs

export const allBlogs = async (req, res) => {
  try {
    // const { page, limit = 3 } = req.body;

    // const skipVal = parseInt((page - 1) * limit);
    // const limitVal = limit;
    // const all = await Blog.find({}).skip(skipVal).limit(limitVal).lean();

    // if (all?.length) {
    //   return res.status(200).json({
    //     success: true,
    //     allBlogs: all,
    //   });
    // }

    const all = await Blog.find({});

    if (all?.length) {
      return res.status(200).json({
        success: true,
        allBlogs: all,
      });
    }

    return res.status(404).json({
      success: false,
      message: "no blogs found",
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const singleBlog = async (req, res) => {
  try {
    const { id } = req.body;

    if (!id) {
      return res.status(404).json({
        success: false,
        message: "id is required",
      });
    }

    const findBlog = await Blog.findById(id);
    console.log(findBlog);

    if (findBlog) {
      return res.status(200).json({
        success: true,
        singleBlog: findBlog,
      });
    }

    return res.status(404).json({
      success: false,
      message: "not a valid id",
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const editBlog = async (req, res) => {
  try {
    const { id } = req.body;

    if (!id) {
      return res.status(404).json({
        success: false,
        message: "id is required",
      });
    }

    const findBlog = await Blog.findById(id);
    console.log(findBlog);

    if (findBlog) {
      return res.status(200).json({
        success: true,
        editblog: findBlog,
      });
    }

    return res.status(404).json({
      success: false,
      message: "not a valid id",
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const updateBlog = async (req, res) => {
  try {
    const { id } = req.body;
    const { title, image, description, categories } = req.body.edit;

    console.log(title, image, description, categories);
    if (!title || !image || !description || !categories || !id) {
      return res.status(404).json({
        success: false,
        message: "All fields are mandatory",
      });
    }

    const findBlogUpdate = await Blog.findByIdAndUpdate(
      id,
      { title, image, description, categories },
      { new: true }
    );

    if (findBlogUpdate) {
      return res.status(200).json({
        success: true,
        message: "Updated Success",
        updatedBlog: findBlogUpdate,
      });
    }

    return res.status(404).json({
      success: false,
      message: "not updated",
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const deleteBlog = async (req, res) => {
  const { id } = req.body;

  if (!id) {
    return res.status(404).json({
      success: false,
      message: "id is required",
    });
  }

  const findBlog = await Blog.findByIdAndDelete(id);

  if (findBlog) {
    return res.status(200).json({
      success: true,
      message: "Blog Deleted",
    });
  }

  return res.status(404).json({
    success: false,
    message: "could not delete blog",
  });
  try {
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
