import { axios as $} from "./axios";
import { dataPath } from "@jx3box/jx3box-common/js/utils";

// 副本列表数据
const list = dataPath("fb/fb_list.json", "0.0.2");
function LoadFBList(){
    return $.get(list)
}

function LoadFBDetails(cat_id){
    let detail = dataPath(`fb/fb_detail/${cat_id}.json`)
    return $.get(detail)
}

export {LoadFBList,LoadFBDetails}