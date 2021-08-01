import { $helper } from "@jx3box/jx3box-common/js/https";

function contractAuthorApply(data) {
    return $helper().post('/api/contract_author/log', data)
}

export {
    contractAuthorApply
}