import { $ } from "./axios";
import lodash from "lodash";

// 发布
function doPublish(data, vm,skip=true) {
    return $.post(`post/publish`, data)
        .then((res) => {
            this.$message({
                message: res.data.msg,
                type: "success",
            });

            if(skip){
                setTimeout(() => {
                    location.href = '/' + data.post.post_type + "/?pid=" +  res.data.data.ID;
                }, 500);
            }

            return res;
        })
        .catch((err) => {
            console.log(err);
            vm.failCallback(err, vm);
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
            console.log(err);
            vm.failCallback(err, vm);
        });
}

// 编辑加载
function doLoad(vm, oldMetaKeys) {
    let id = vm.$route.params.id;

    if (id) {
        return $.get(`post/query`, {
            params: {
                id: id,
            },
        })
            .then((res) => {
                // 主表字段处理（没有的字段使用默认字段）
                vm.post = lodash.merge(vm.post, res.data.data.post);

                // 废弃·需要处理的旧meta
                let meta = res.data.data.meta;
                if (oldMetaKeys && oldMetaKeys.length) {
                    for (let key of oldMetaKeys) {
                        if (meta[key].indexOf(",")) {
                            meta[key] = meta[key].split(",");
                        } else {
                            meta[key] = meta[key];
                        }
                    }
                    vm.meta = meta;
                }

                // 修改store
                this.$store.state.post = res.data.data.post;
                this.$store.state.meta = res.data.data.meta;
            })
            .catch((err) => {
                console.log(err);
                vm.failCallback(err, vm);
            });
    } else {
        return new Promise((resolve, reject) => {
            resolve(location.href);
        });
    }
}

// feedEnable: false,          //TODO:发布至订阅接口
// followEnable: false,        //TODO:发布至关注接口
// tencentEnable: false,     //TODO:格式化至腾讯文档
// weiboEnable: false,     //TODO:格式化至微博头条
// tuilanEnable: false,    //TODO:格式化至推栏

export { doPublish, doDraft, doLoad };
