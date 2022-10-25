const PostRepository = require("../repositories/posts.repository");
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
    const { nickname, userKey } = res.locals.user;

    const { title, content } = req.body;

    // 서비스 계층에 구현된 createPost 로직을 실행합니다.
    const createPostData = await this.postService.createPost(
      nickname,
      userKey,
      title,
      content
    );

    res.status(201).json({
      message: "게시글 작성에 성공하였습니다.",
    });
  };

  updatePost = async (req, res, next) => {
    const { userKey } = res.locals.user;
    const { postId } = req.params;
    const { title, content } = req.body;
    console.log(postId)
    const findPost = await this.postService.findPostById(postId)

    if (userKey !== findPost.userKey){
      return res.status(400).json({errorMessage: "권한이 없습니다."})
    }
    const updatePost = await this.postService.updatePost(
      postId,
      title,
      content
    );
    res.status(200).json({
      message: "게시글을 수정하였습니다.",
    });

    
    
  };

  deletePost = async (req, res, next) => {
    const { userKey } = res.locals.user;
    const { postId } = req.params;
    const findPost = await this.postService.findPostById(postId)

    if (userKey !== findPost.userKey) {
      return res.status(400).json({errorMessage: "권한이 없습니다."})
    }
    const deletePost = await this.postService.deletePost(postId);

      res.status(200).json({
        message: "게시글을 삭제하였습니다.",
      });

    
  };
}

module.exports = PostsController;
