import { axios } from "./axios";
import { __next } from "@jx3box/jx3box-common/js/jx3box.json";

const subject = __next + 'api/question/create'  //TODO:
// const subject = "/api/question/create";

function postSubject(data, vm) {
    return axios.post(subject, data,{
        withCredentials: true,
    }).catch((err) => {
        vm.failCallback(err, vm);
    });
}

export { postSubject };
