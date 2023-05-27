import { $pay, $next, $cms } from "@jx3box/jx3box-common/js/https";

/**
 * 用户注销
 */
function leave(password) {
    return $pay().post(`/api/im-sure-leave-jx3box`, {
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
 * 获取反馈列表
 * @param {*} params 参数
 */
function getMiscfeedback(params) {
    return $next().get(`/api/miscfeedback`, {
        params
    })
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

/**
 * 更新反馈
 * @param {*} id 反馈id
 * @param {*} data 更新数据
 */
function updateFeedback(id, data) {
    return $next().patch(`/api/miscfeedback/${id}`, data)
}
/**
 * 获取反馈assign名单
 */
function getTeammates(){
    return $cms().get(`/api/cms/config/teammates`,{
        params : {
            status : 1
        }
    }).then((res) => {
        return res.data.data
    })
}
export {
    leave,
    feedback,
    getFeedbackList,
    getFeedback,
    getMiscfeedback,
    updateFeedback,
    getTeammates
}
