import { UseFetchOptions } from "nuxt/app";

type Methods = "GET" | "POST" | "DELETE" | "PUT";

// "http://api.lemming.top/api"
// "http://127.0.0.1:3001/api"
// const BASE_URL = "http://api.lemming.top/api";

export interface IResultData<T> {
  data?: T;
  meta?: any;
}

export interface PageOptions {
  page?: number;
  pageSize?: number;
}

class HttpRequest {
  async request<T = any>(
    url: string,
    method: Methods,
    data: any,
    options?: UseFetchOptions<T>
  ): Promise<IResultData<T>> {
    const config = useRuntimeConfig();
    const BASE_URL = config.public.apiBase;
    const secret = 69; // 这应该与服务器端的值相同
    const timestamp = Date.now();
    const ts = timestamp - (timestamp % secret) + secret; // 用于判断是否为伪造请求
    const newOptions: UseFetchOptions<T> = {
      baseURL: BASE_URL,
      method: method,
      headers: {
        ts: ts.toString(),
      },
      credentials: "include", // 浏览器会在发送跨域请求时包含凭证信息(解决后端存储不了cookies)（需后端配合）
      ...options,
    };

    if (method === "GET" || method === "DELETE") {
      newOptions.params = data;
    }
    if (method === "POST" || method === "PUT") {
      newOptions.body = data;
    }

    try {
      let response = await useFetch(url, newOptions);
      if (response.status.value === "success") {
        return response.data.value as IResultData<T>;
      } else {
        throw createError({
          statusCode: 404,
          statusMessage: "页面丢失",
          message: response.error.value?.data.message,
        });
        // throw response.error.value?.data.message;
      }
    } catch (err: any) {
      throw err;
    } finally {
    }
  }

  // 封装常用方法

  get<T = any>(url: string, params?: any, options?: UseFetchOptions<T>) {
    return this.request(url, "GET", params, options);
  }

  post<T = any>(url: string, data?: any, options?: UseFetchOptions<T>) {
    return this.request(url, "POST", data, options);
  }

  put<T = any>(url: string, data?: any, options?: UseFetchOptions<T>) {
    return this.request(url, "PUT", data, options);
  }

  delete<T = any>(url: string, params: any, options?: UseFetchOptions<T>) {
    return this.request(url, "DELETE", params, options);
  }
}

const httpRequest = new HttpRequest();

export default httpRequest;
