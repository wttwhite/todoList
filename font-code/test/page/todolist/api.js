import http from '@/api/httpInstance'

function getPageData (data) {
  return http({
    method: 'get',
    url: '/demo/list',
    params: data
  })
}
function createApi (data) {
  return http({
    method: 'post',
    url: '/demo/create',
    data: data
  })
}
function updateApi (data) {
  return http({
    method: 'post',
    url: '/demo/update',
    data: data
  })
}
function changeStatus (data) {
  return http({
    method: 'post',
    url: '/demo/changeStatus',
    data: data
  })
}
export {
  getPageData,
  createApi,
  updateApi,
  changeStatus
}