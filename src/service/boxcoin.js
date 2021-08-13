import { $pay } from "@jx3box/jx3box-common/js/https";

function getBoxcoinCashHistory() {
    return $pay().get(`/api/my/boxcoin/cashout/history`);
}

function getBoxcoinGotHistory(){
    return $pay().get(`/api/my/boxcoin/bill`)
}

function cashBoxcoin(data){
    return $pay().post(`/api/my/boxcoin/cashout`,data)
}

export { getBoxcoinCashHistory,getBoxcoinGotHistory,cashBoxcoin };
