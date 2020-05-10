import { axios as $} from "./axios";
import { dataPath } from "@jx3box/jx3box-common/js/utils";

// 副本列表数据
const list = dataPath("fb/fb_map.json", "0.0.3");
function LoadFBList(){
    return $.get(list)
}

export {LoadFBList}