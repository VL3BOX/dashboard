import { $ } from "./axios";
import { __server } from "@jx3box/jx3box-common/js/jx3box.json";

// 信息
function getUserInfo(uid) {
    return $.get(__server + "user/info", {
        params: {
            uid: uid,
        },
    });
}

// 昵称
function checkNickname(name) {
    return $.get(__server + "dashboard/nickname/check", {
        params: {
            name: name,
        },
    });
}
function updateNickname(data) {
    return $.post(__server + "dashboard/nickname/update", { name: data });
}
// 资料
function updateProfile(data) {
    return $.post(__server + "dashboard/profile/update", data);
}
function getProfile(){
    return $.get(__server + "user/profile").then((res) => {
        return res.data.data
    })
}

// 头像
function updateAvatar(data) {
    return $.post(__server + "dashboard/avatar/update", data);
}

// 密码
function updatePassword(data) {
    return $.post(__server + "dashboard/password/update", data);
}

// 邮箱
function checkEmailStatus(uid) {
    return $.get(__server + "dashboard/email/check", {
        params: {
            uid: uid,
        },
    });
}

function checkEmailAvailable(email) {
    return $.get(__server + "account/has", {
        params: {
            user_login: email,
        },
    });
}

function sendBindEmail(data) {
    return $.post(__server + "dashboard/email/bind", data);
}

function sendVerifyEmail(uid) {
    return $.get(__server + "dashboard/email/verify", {
        params: {
            uid: uid,
        },
    });
}

// 互联
function unbindOAuth(data) {
    return $.post(__server + "dashboard/oauth/unbind", data);
}

function checkOAuth(data) {
    return $.post(__server + "dashboard/oauth/check", data);
}

// 用户设置
function getConf(){
    return $.get(__server + "dashboard/config");
}

function setConf(data){
    return $.post(__server + "dashboard/config",data);
}

export {
    getUserInfo,
    checkNickname,
    updateNickname,
    updateProfile,
    getProfile,
    updateAvatar,
    updatePassword,
    sendVerifyEmail,
    checkEmailAvailable,
    checkEmailStatus,
    sendBindEmail,
    unbindOAuth,
    checkOAuth,
    getConf,
    setConf
};
