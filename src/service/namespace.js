import { $_helper } from './axios'

function getNamespace() {
  return $_helper({
    method: 'GET',
    url: `/api/my/namespaces`,
  })
}

export { getNamespace }
