import { $cms } from '@jx3box/jx3box-common/js/https'

function getWhitelist() {
  return $cms({ proxy: true }).get('/api/cms/user/kith/my')
}
function getWhitelistById(id) {
  return $cms({ proxy: true }).get(`api/cms/user/${id}/info`)
}

function delWhitelist(id) {
  return $cms({ proxy: true }).delete(`/api/cms/user/kith/${id}`)
}
function addWhitelist(id) {
  return $cms({ proxy: true }).post(`/api/cms/user/kith/${id}`)
}
function editWhitelist(id, data) {
  return $cms({ proxy: true }).put(`/api/cms/user/kith/${id}`, data)
}

export { getWhitelist, editWhitelist, delWhitelist, addWhitelist ,getWhitelistById}
