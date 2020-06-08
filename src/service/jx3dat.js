import { $, axios } from "./axios";
import { __hub, __Root } from "@jx3box/jx3box-common/js/jx3box.json";
import User from "@jx3box/jx3box-common/js/user";
function uploadHub(formdata, vm) {
    return axios
        .post(__hub + "api/plugins/my-team-mon", formdata, {
            withCredentials: true,
        })
        .catch((err) => {
            vm.failCallback(err, vm);
        });
}

function uploadData(formdata, vm) {
    return $.post("upload/data", formdata).catch((err) => {
        vm.failCallback(err, vm);
    });
}

function syncRedis(data,vm) {
    let redisData = transferForRedis(data);
    console.log('正在执行redis同步作业:',redisData)
    return axios
        .post(__hub + "api/plugins/jx3dat/publish", redisData, {
            withCredentials: true,
        })
        .catch((err) => {
            vm.failCallback(err, vm);
        });
}

function transferForRedis(data) {
    let author = User.getInfo().name;
    let pid = data.ID;

    let _ = {
        author: author,
        user_id: ~~(User.getInfo().uid),
        post_id: pid,
        data: {},
    };

    data.post_meta.data.forEach((item, i) => {
        _.data[item.name] = {
            author: author,
            key: item.name,

            name: item.desc,
            version: item.version || Date.now(),

            data_url: item.file,
            about: __Root + "jx3dat/?pid=" + pid,
        };
    });

    return _;
}

export { uploadHub, uploadData, syncRedis };
