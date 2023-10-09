import Request from '~/utils/myUseFetch';

// 获取公告
export function GetNotice() {
    return Request.post('/option/data', {
        name: "notice"
    })
}
