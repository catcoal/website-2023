import Request from '../utils/myUseFetch';


// 获取Tag列表
export function FetchTagList(data) {
    return Request.post('/tag/list',data)
}