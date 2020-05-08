const axios = require("axios");
const JX3BOX = require("@jx3box/jx3box-common/js/jx3box");
const $ = axios.create({
    // baseURL : JX3BOX.__server,   //FIXME:test
    baseURL: "http://localhost:5160/",
    withCredentials: true,
});

// 发布
function doPublish(type, data, vm) {
    let _data = formatData(data);
    _data.post.post_status = "publish";
    _data.post.post_type = type;
    console.log(_data)

    $.post(`/publish/${type}`, _data)
        .then((res) => {
            vm.$message({
                message: res.data.msg,
                type: "success",
            });
            // TODO:跳转至新页面
        })
        .catch((err) => {
            failCallback(err);
        });
}

// 草稿
function doDraft(type, data, vm) {
    let _data = formatData(data);
    _data.post_status = "draft";
    _data.post_type = type;

    $.post(`/publish/${type}`, _data)
        .then((res) => {
            vm.$notify({
                title: "保存成功",
                message: res.data.msg,
                type: "success",
            });
        })
        .catch((err) => {
            failCallback(err);
        });
}

// 失败
function failCallback(err) {
    if (err.response.data.code) {
        vm.$message.error(
            `[${err.response.data.code}]${err.response.data.msg}`
        );
    } else {
        vm.$message.error("网络请求异常");
    }
}

// 格式化数据
function formatData(data) {
    let _data = {};
    _data.post = convertData(data.post);
    _data.meta = convertData(data.meta);
    _data.extend = data.extend;

    return _data;
}

// 数组类型值处理
function convertData(obj) {
    let _obj = {};
    for (let key in obj) {
        if (Array.isArray(obj[key])) {
            _obj[key] = obj[key].toString();
        } else {
            _obj[key] = obj[key];
        }
    }
    return _obj;
}

module.exports = { doPublish, doDraft };
