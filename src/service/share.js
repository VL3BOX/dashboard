import { $, axios } from "./axios";
import { __node, __Root, __server } from "@jx3box/jx3box-common/js/jx3box.json";
const parse = __node + "facedat";
// const parse = "http://localhost:3001/" + "facedat";

function uploadData(formdata, vm) {
    return $.post(__server + "upload/data", formdata);
}

function parseData(data, vm) {
    return axios.post(parse, {
        raw: data,
    });
}

export { uploadData, parseData };
