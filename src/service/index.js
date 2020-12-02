import { $pay } from "@jx3box/jx3box-common/js/axios";

function getMyAsset() {
    return $pay.get("api/vip/i");
}

export { getMyAsset };
