import { $ } from "./axios";
import { JX3BOX } from "@jx3box/jx3box-common";
import { editIDCheck } from "../utils/editIDCheck";

// 发布
function doPublish(data, vm) {
    return $.post(`post/publish`, data)
        .then((res) => {
            vm.$message({
                message: res.data.msg,
                type: "success",
            });

            let pid = res.data.data.ID;
            // TODO:跳转
            setTimeout(() => {
                location.href = JX3BOX.__Root + "?p=" + pid;
            }, 500);
        })
        .catch((err) => {
            console.log(err)
            vm.failCallback(err,vm);
        });
}

// 草稿
function doDraft(data, vm) {
    return $.post(`post/publish`, data)
        .then((res) => {
            vm.$notify({
                title: "保存成功",
                message: res.data.msg,
                type: "success",
            });
        })
        .catch((err) => {
            console.log(err)
            vm.failCallback(err,vm);
        });
}

// 编辑加载
function doLoad(vm, arrMetaKeys) {
    let id = (vm.post.ID = editIDCheck());

    if (id) {
        return $.get(`post/query`, {
            params: {
                id: id,
            },
        })
            .then((res) => {
                // 主表字段处理
                vm.post = res.data.data.post;

                // 需要转为数组的meta key
                let meta = res.data.data.meta;
                if (arrMetaKeys && arrMetaKeys.length) {
                    for (let key of arrMetaKeys) {
                        meta[key] = meta[key] && meta[key].split(",");
                    }
                }
                vm.meta = meta;
            })
            .catch((err) => {
                console.log(err)
                vm.failCallback(err, vm);
            });
    }else{
        return new Promise((resolve,reject)=>{
            resolve(location.href)
        })
    }
}

// feedEnable: false,          //TODO:发布至订阅接口
// followEnable: false,        //TODO:发布至关注接口
// tencentEnable: false,     //TODO:格式化至腾讯文档
// weiboEnable: false,     //TODO:格式化至微博头条
// tuilanEnable: false,    //TODO:格式化至推栏

export { doPublish, doDraft, doLoad };
