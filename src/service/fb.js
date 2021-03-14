import { axios } from "./axios";
import { dataPath } from "@jx3box/jx3box-common/data/jx3box.json";

// 副本列表数据
function LoadFBList() {
    return axios.get(dataPath + "fb/fb_map.json");
}

export { LoadFBList };
