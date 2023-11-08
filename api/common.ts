import Request from "~/utils/myUseFetch";

// 获取公告
export function GetNotice(name: string) {
  return Request.get("/option/" + name);
}
