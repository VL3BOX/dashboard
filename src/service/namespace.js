import { $_helper,$helper } from './axios'

function getNamespace() {
  return $_helper({
    method: 'GET',
    url: `/api/my/namespaces`,
  })
}

function getNamespaceByKey(key) {
  return $helper({
    method: 'GET',
    url: `/api/namespace`,
    params:{
      key
    },
  })
}

export { getNamespace, getNamespaceByKey }
