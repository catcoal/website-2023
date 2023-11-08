import Request, { IResultData, PageOptions } from "../utils/myUseFetch";

interface PostDetail {
  id: Number;
  title: String;
  author: Author;
  authorId: Number;
  commentCount: Number;
  viewCount: Number;
  commentEnabled: Boolean;
  content: String;
  covers: Array<String>;
  createdAt: String;
  updatedAt: String;
  description: String;
  isRecommend: Boolean;
  isTop: Boolean;
  status: PostStatus;
  tags: Array<Tag>;
  weight: Number;
}

// status 状态 （publish=发布;private=私有;draft=草稿(默认);encrypt=加密）
enum PostStatus {
  publish,
  private,
  draft,
  encrypt,
}

interface Author {
  id: Number;
  author: String;
  authorUrl: String;
  emailHash: String;
}

interface Tag {
  id: Number;
  name: String;
  type: String;
  weight: Number;
  createdAt: String;
}

interface PostListRequest {
  tagId?: Number;
}

interface PostListResponse {
  count: Number;
  list: Array<PostDetail>;
}

// 获取文章列表
export function FetchPostList(
  params: PostListRequest & PageOptions
): Promise<IResultData<PostListResponse>> {
  return Request.get("/posts", params);
}

// 获取文章详情
export function FetchPostDetail(id: Number): Promise<IResultData<PostDetail>> {
  return Request.get("/post/" + id);
}

// 获取随机文章列表
export function FetchPostRandomList(): Promise<IResultData<PostListResponse>> {
  return Request.get("/posts/random");
}

// 获取推荐文章列表
export function FetchPostRecommendList(): Promise<
  IResultData<PostListResponse>
> {
  return Request.get("/posts/recommend");
}
