import { $helper, $cms } from "@jx3box/jx3box-common/js/https";

function contractAuthorApply(data) {
    return $helper().post('/api/contract_author/log', data)
}

function getContractAuthorLogs() {
    return $helper().get('/api/my/contract_author/logs')
}

function getSuperAuthorState(userId) {
    return $cms().get('/api/cms/user/is_super_author/' + userId)
}

export {
    contractAuthorApply,
    getSuperAuthorState,
    getContractAuthorLogs
}