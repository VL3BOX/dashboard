import { $pay } from "@jx3box/jx3box-common/js/axios";

function getMyPacket() {
    return $pay.get('/api/red-packet/history')
}

export { getMyPacket };
