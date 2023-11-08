import Request from "../utils/myUseFetch";

// 获取Tag列表
export function FetchTagList(data: any) {
  return Request.get("/tags", data);
}
