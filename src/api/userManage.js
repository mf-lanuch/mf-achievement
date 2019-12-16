import request from '@/utils/request'

// 获取用户列表
export function getUserList(params) {
  return request({
    url: `/api/auth/users`,
    method: 'get',
    params
  })
}

// 重置密码
export function putResetPassword(data) {
  return request({
    url: `/api/auth/users/${data.id}/resetPwd`,
    method: 'put',
    data: {
      password: data.password
    }
  })
}

// 获取用户
export function postUser(data) {
  return request({
    url: `/api/auth/users`,
    method: 'post',
    data
  })
}

// 查询用户
export function getUser(id) {
  return request({
    url: `/api/auth/users/${id}`,
    method: 'get'
  })
}
