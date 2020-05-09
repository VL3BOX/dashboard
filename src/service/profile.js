import {$} from "./axios";

// 信息
function getUserInfo(uid){
    return $.get("user/info", {
        params: {
            uid: uid,
        },
    })
}

// 个人资料
function checkNickname(name) {
    return $.get("dashboard/nickname/check", {
        params: {
            name: name,
        },
    });
}

function updateProfile(data) {
    return $.post("dashboard/profile/update", data);
}

// 头像
function updateAvatar(data) {
    return $.post("dashboard/avatar/update", data);
}

// 密码
function updatePassword(data) {
    return $.post("dashboard/password/update", data);
}

// 邮箱
function checkEmailStatus(uid) {
    return $.get("dashboard/email/check", {
        params: {
            uid: uid,
        },
    });
}

function checkEmailAvailable(email) {
    return $.get("account/has", {
        params: {
            user_login: email,
        },
    });
}

function sendBindEmail(data) {
    return $.post("dashboard/email/bind", data);
}

function sendVerifyEmail(uid) {
    return $.get("dashboard/email/verify", {
        params: {
            uid: uid,
        },
    });
}

// 互联
function unbindOAuth(data) {
    return $.post("dashboard/oauth/unbind", data);
}

function checkOAuth(data) {
    return $.post("dashboard/oauth/check", data);
}

export {
    getUserInfo,
    checkNickname,
    updateProfile,
    updateAvatar,
    updatePassword,
    sendVerifyEmail,
    checkEmailAvailable,
    checkEmailStatus,
    sendBindEmail,
    unbindOAuth,
    checkOAuth,
};
