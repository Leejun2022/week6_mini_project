const PostService = require("../services/posts.service");

// Post의 컨트롤러(Controller)역할을 하는 클래스
class PostsController {
  postService = new PostService();

  getPosts = async (req, res, next) => {
    // 서비스 계층에 구현된 findAllPost 로직을 실행합니다.
    const posts = await this.postService.findAllPost();

    res.status(200).json({ data: posts });
  };

  getPostById = async (req, res, next) => {
    const { postId } = req.params;
    const post = await this.postService.findPostById(postId);

    res.status(200).json({ data: post });
  };

  createPost = async (req, res, next) => {
    const { nickname, password, title, content } = req.body;

    // 서비스 계층에 구현된 createPost 로직을 실행합니다.
    const createPostData = await this.postService.createPost(
      nickname,
      password,
      title,
      content
    );

    res.status(201).json({
      message: "게시글 작성에 성공하였습니다.",
    });
  };

  updatePost = async (req, res, next) => {
    const { postId } = req.params;
    const { password, title, content } = req.body;

    const updatePost = await this.postService.updatePost(
      postId,
      password,
      title,
      content
    );

    res.status(200).json({
      message: "게시글을 수정하였습니다.",
    });
  };

  deletePost = async (req, res, next) => {
    const { postId } = req.params;
    const { password } = req.body;

    const deletePost = await this.postService.deletePost(postId, password);

    res.status(200).json({
      message: "게시글을 삭제하였습니다.",
    });
  };
}

module.exports = PostsController;
