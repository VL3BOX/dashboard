import { $pay, $next } from "@jx3box/jx3box-common/js/https";

/**
 * 用户注销
 */
function leave(password) {
    return $pay().post(`/api/im-sure-leave`, {
        password
    })
}

/**
 * 提交反馈
 * @param {*} data
 */
function feedback(data) {
    return $next().post(`/api/miscfeedback`, data)
}

/**
 * 获取我的反馈列表
 * @param {*} params 筛选参数
 * @param {*} params.pageIndex 分页参数
 * @param {*} params.pageSize 分页参数
 */
function getFeedbackList(params) {
    return $next().get(`/api/miscfeedback/my/list`, {
        params
    })
}

/**
 * 获取单个反馈
 * @param {*} id 反馈id
 */
function getFeedback(id) {
    return $next().get(`/api/miscfeedback/${id}`)
}

export {
    leave,
    feedback,
    getFeedbackList,
    getFeedback
}
