import { $ } from "./axios";
import { __server } from "@jx3box/jx3box-common/js/jx3box.json";

function uploadData(formdata, vm){
    return $.post(__server + "upload", formdata)
}

export {uploadData}