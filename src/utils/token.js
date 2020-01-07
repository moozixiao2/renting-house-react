/* 对本地 token 的操作 */

const TOKEN_KEY = 'moozf_token'

export const setToken = (token) => {
  localStorage.setItem(TOKEN_KEY, token)
}

export const getToken = () => {
  return localStorage.getItem(TOKEN_KEY)
}

export const removeToken = () => {
  localStorage.removeItem(TOKEN_KEY)
}

export const hasToken = () => {
  return !!getToken()
}
