import AiStore from '@/utils/store'

const TokenKey = 'AUTHORIZATION'

export function getToken () {
  return AiStore.get(TokenKey)
}

export function setToken (token) {
  // 设置不过期
  return AiStore.set(TokenKey, token)
}

export function removeToken () {
  return AiStore.remove(TokenKey)
}
