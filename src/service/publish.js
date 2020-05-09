import { $ } from "./axios";
import { JX3BOX } from "@jx3box/jx3box-common";
import { editIDCheck } from "../utils/editIDCheck";

// 发布
function doPublish(type, data, vm) {
    data.post.post_status = "publish";
    data.post.post_type = type;

    return $.post(`post/publish`, data)
        .then((res) => {
            vm.$message({
                message: res.data.msg,
                type: "success",
            });

            let pid = res.data.data.ID;
            // TODO:跳转
            // setTimeout(() => {
            //     location.href = JX3BOX.__Root + "?p=" + pid;
            // }, 500);
        })
        .catch((err) => {
            vm.failCallback(vm, err);
        });
}

// 草稿
function doDraft(type, data, vm) {
    data.post.post_status = "draft";
    data.post.post_type = type;

    return $.post(`post/publish`, data)
        .then((res) => {
            vm.$notify({
                title: "保存成功",
                message: res.data.msg,
                type: "success",
            });
        })
        .catch((err) => {
            vm.failCallback(vm, err);
        });
}

// 编辑加载
function doLoad(vm, arrMetaKeys) {
    let id = (vm.post.id = editIDCheck());

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
                        meta[key] = meta[key].split(",");
                    }
                }
                vm.meta = meta;
            })
            .catch((err) => {
                vm.failCallback(err, vm);
            });
    }else{
        return new Promise()
    }
}

export { doPublish, doDraft, doLoad };
