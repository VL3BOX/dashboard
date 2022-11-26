import { $pay } from "@jx3box/jx3box-common/js/https";

function getAddress(params) {
    return $pay().get(`/mall/ship-address`, params)
}

function addAddress(data) {
    return $pay().post(`/mall/ship-address`, data)
}

function updateAddress(id, data) {
    return $pay().put(`/mall/ship-address/${id}`, data)
}

function delAddress(id) {
    return $pay().delete(`/mall/ship-address/${id}`)
}

function defaultAddress(id) {
    return $pay().put(`/mall/ship-address/default/${id}`, )
}
export {
    getAddress,
    addAddress,
    updateAddress,
    delAddress,
    defaultAddress
};