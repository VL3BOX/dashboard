import { axios } from "./axios";
import { __next } from "@jx3box/jx3box-common/js/jx3box.json";

// const API = __next + 'api/question/'  //TODO:
const API = "/api/question/";

function postSubject(data, vm) {
    return axios
        .post(API + "create", data, {
            withCredentials: true,
        })
        .catch((err) => {
            vm.failCallback(err, vm);
        });
}

function updateSubject(id, data, vm) {
    return axios
        .post(API + id + "/update", data, {
            withCredentials: true,
        })
        .catch((err) => {
            vm.failCallback(err, vm);
        });
}

export { postSubject, updateSubject };
