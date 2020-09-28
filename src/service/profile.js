import { $ } from "./axios";
import { __server } from "@jx3box/jx3box-common/js/jx3box.json";

// 信息
function getUserInfo() {
    return $.get(__server + "user/me");
}
// 资料
function getProfile(){
    return $.get(__server + "dashboard/profile")
}
function updateProfile(data) {
    return $.post(__server + "dashboard/profile", data);
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
function checkEmailStatus() {
    return $.get(__server + "dashboard/email/check");
}

function checkEmailAvailable(email) {
    return $.get(__server + "account/email/check", {
        params: {
            user_email: email,
        },
    });
}

function sendBindEmail(data) {
    return $.post(__server + "dashboard/email/bind", data);
}

function sendVerifyEmail() {
    return $.post(__server + "dashboard/email/verify");
}

// 互联
function checkOAuth() {
    return $.get(__server + "dashboard/oauth/check");
}

function unbindOAuth(data) {
    return $.post(__server + "dashboard/oauth/unbind", data);
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
