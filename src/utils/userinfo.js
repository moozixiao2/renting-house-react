
const MOO_ZF_USER_INFO = 'moo_zf_user_info'

export function setLocUserInfo (userinfo) {
  localStorage.setItem(MOO_ZF_USER_INFO, JSON.stringify(userinfo))
}


export function getLocUserInfo () {
  return JSON.parse(localStorage.getItem(MOO_ZF_USER_INFO))
}

export function removeLocUserInfo () {
  localStorage.removeItem(MOO_ZF_USER_INFO)
}