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
  request<T = any>(
    url: string,
    method: Methods,
    data: any,
    options?: UseFetchOptions<T>
  ): Promise<IResultData<T>> {
    return new Promise((resolve, reject) => {
      const config = useRuntimeConfig();
      const BASE_URL = config.public.apiBase;
      const newOptions: UseFetchOptions<T> = {
        baseURL: BASE_URL,
        method: method,
        ...options,
      };

      if (method === "GET" || method === "DELETE") {
        newOptions.params = data;
      }
      if (method === "POST" || method === "PUT") {
        newOptions.body = data;
      }

      useFetch(url, newOptions)
        .then((res) => {
          if (res.status.value === "success") {
            resolve(res.data.value as IResultData<T>);
          } else {
            reject(res);
          }
        })
        .catch((error) => {
          reject(error);
        });
    });
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
