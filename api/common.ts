import Request, { IResultData } from "~/utils/myUseFetch";

interface ResOption {
  id: number;
  name: string;
  value?: string;
}

// 获取公告
export function GetNotice(name: string): Promise<IResultData<ResOption>> {
  return Request.get("/option/" + name);
}
