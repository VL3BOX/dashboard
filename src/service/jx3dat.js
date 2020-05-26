import { $, axios } from "./axios";
import { __hub } from "@jx3box/jx3box-common/js/jx3box.json";
function uploadHub(formdata, vm) {
    return axios
        .post("/api/plugins/my-team-mon", formdata, {
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

function publishToRedis(user, data) {
    let mergedData = transferForRedis(user, data);
}

function transferForRedis(user, data) {
    let _ = {
        author: user.name,
        user_id: user.uid,
        post_id: data.ID,
        data: data.post_meta.data,
    };
    return _;
}

export { uploadHub, uploadData, publishToRedis };
