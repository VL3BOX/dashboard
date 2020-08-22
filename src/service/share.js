import { $ } from "./axios";
import { __node, __Root, __server } from "@jx3box/jx3box-common/js/jx3box.json";

function uploadData(formdata, vm) {
    return $.post(__server + "upload/data", formdata);
}

function parseData(data, vm) {
    return $.post(__node + "facedat", {
        raw: data,
    });
}

export { uploadData, parseData };
