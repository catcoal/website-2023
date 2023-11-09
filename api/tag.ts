import Request, { IResultData, PageOptions } from "~/utils/myUseFetch";

type TagType = "Category" | "ArticleTag";

export interface ResTag {
  id: number;
  name: string;
  type: TagType;
  createdAt: string;
  weight: number;
}

export interface TagQuery {
  name: string;
  type: TagType;
}

// 获取Tag列表
export function FetchTagList(
  data: TagQuery & PageOptions
): Promise<IResultData<ResTag[]>> {
  return Request.get("/tags", data);
}
