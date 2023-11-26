import Request, { IResultData, PageOptions } from "~/utils/myUseFetch";
import { Author } from "./post";

type CommentStatus = "Unreviewed" | "Show" | "Hide" | "Rubbish";

export interface IComment {
  postId: number; // 目标文章id
  parentId?: number; // 父评论id
  author: string;
  email: string;
  authorUrl: string;
  content: string;
}

export interface CommentQuery {
  postId: number;
}

export interface Comment {
  id: number;
  parentId: number;
  postId: number;
  status: CommentStatus;
  createdAt: string;
  content: string;
  authorId: number;
  author: Author;
  childComments: Comment[];
}

export const SendComment = (data: IComment): Promise<IResultData<Comment>> => {
  return Request.post("/comment", data);
};

export const FetchComments = (
  query: CommentQuery & PageOptions
): Promise<IResultData<Comment[]>> => {
  return Request.get("/comments", query);
};
