import { axios as $} from "./axios";
import { dataPath } from "@jx3box/jx3box-common/js/utils";

// 副本列表数据
function LoadFBList(){
    return $.get(dataPath + 'fb/fb_map.json')
}

export {LoadFBList}