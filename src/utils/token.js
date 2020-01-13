/* 对本地 token 的操作 */

const TOKEN_KEY = 'moozf_token'

export function setToken (token) {
  localStorage.setItem(TOKEN_KEY, token)
}

export function getToken () {
  return localStorage.getItem(TOKEN_KEY)
}

export function removeToken () {
  localStorage.removeItem(TOKEN_KEY)
}

export function hasToken () {
  return !!getToken()
}
