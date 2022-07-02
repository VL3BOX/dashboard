import { $pay } from "@jx3box/jx3box-common/js/https";

/**
 * 用户注销
 */
function leave(password){
    return $pay().post(`/api/im-sure-leave`, {
        password
    })
}

/**
 * 提交反馈
 * @param {*} data
 */
function feedback(data){
    return $pay().post(`/api/miscfeedback`, data)
}

export {
    leave,
    feedback
}
