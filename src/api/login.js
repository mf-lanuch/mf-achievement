import request from '@/utils/request'

export function postUserLogin (data) {
  return request({
    url: '/api/auth/login',
    method: 'post',
    data: data
  })
}

export function getUserInfo () {
  return request({
    url: '/api/auth/users/info',
    method: 'get'
  })
}

export function putModifyPassword (data) {
  return request({
    url: '/api/auth/users/modifyPwd',
    method: 'put',
    data: data
  })
}
