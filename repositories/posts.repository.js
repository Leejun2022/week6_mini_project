const { Posts } = require("../models");

class PostRepository {
  findAllPost = async () => {
    // ORM인 Sequelize에서 Posts 모델의 findAll 메소드를 사용해 데이터를 호출합니다.
    const posts = await Posts.findAll();

    return posts;
  };

  findPostById = async (postId) => {
    const post = await Posts.findByPk(postId);

    return post;
  };

  createPost = async (nickname, userKey, title, content) => {
    // ORM인 Sequelize에서 Posts 모델의 create 메소드를 사용해 데이터를 호출합니다.
    const createPostData = await Posts.create({
      nickname,
      userKey,
      title,
      content,
    });

    return createPostData;
  };

  updatePost = async (postId, title, content) => {
    const updatePostData = await Posts.update(
      { title, content },
      { where: { postId } }
    );

    return updatePostData;
  };

  deletePost = async (postId) => {
    const updatePostData = await Posts.destroy({ where: { postId } });
    return updatePostData;
  };

  // 이미지url을 DB에 저장할 필요가 없어 보입니다.
  //이미지 업로드
  uploadImages = async (uploadedImages, postId) => {
    const updateImageUrl = await Posts.update(
      { imageUrls: uploadedImages },
      { where: { postId } }
    );

    return updateImageUrl;
  };
}

module.exports = PostRepository;
