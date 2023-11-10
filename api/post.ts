import Request, { IResultData, PageOptions } from "~/utils/myUseFetch";
import { ResTag } from "./tag";

export interface PostDetail {
  id: number;
  title: string;
  enTitle: string;
  author: Author;
  authorId: number;
  commentCount: number;
  viewCount: number;
  commentEnabled: Boolean;
  content: string;
  covers: string[];
  createdAt: string;
  updatedAt: string;
  description: string;
  isRecommend: Boolean;
  isTop: Boolean;
  status: PostStatus;
  tags: ResTag[];
  weight: number;
}

// status 状态 （publish=发布;private=私有;draft=草稿(默认);encrypt=加密）
enum PostStatus {
  publish,
  private,
  draft,
  encrypt,
}

export interface Author {
  id: number;
  author: string;
  authorUrl: string;
  emailHash: string;
}

interface PostListQuery {
  tagId?: number;
}

// 获取文章列表
export function FetchPostList(
  params?: PostListQuery & PageOptions
): Promise<IResultData<PostDetail[]>> {
  return Request.get("/posts", params);
}

// 获取文章详情
export function FetchPostDetail(
  id: number | string
): Promise<IResultData<PostDetail>> {
  return Request.get("/post/" + id);
}

// 获取随机文章列表
export function FetchPostRandomList(): Promise<IResultData<PostDetail[]>> {
  return Request.get("/posts/random");
}

// 获取推荐文章列表
export function FetchPostRecommendList(): Promise<IResultData<PostDetail[]>> {
  return Request.get("/posts/recommend");
}
