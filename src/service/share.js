import { $, axios } from "./axios";
import { __node, __Root, __server } from "@jx3box/jx3box-common/js/jx3box.json";

function uploadData(formdata, vm) {
    return $.post(__server + "upload/data", formdata);
}


export { uploadData };
