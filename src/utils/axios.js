import request from './request'


/* 调用接口 */
export const getSwiperData = () => {
    return request({
        url: '/home/swiper'
    })
}
export const getGroupsData = () => {
    return request({
        url: '/home/groups'
    })
}
export const getNewsData = () => {
    return request({
        url: '/home/news'
    })
}


export const getAreaCity = (params) => {
  return request({
      url: '/area/city',
      params
  })
}

export const getHotCity = () => {
  return request({
      url: '/area/hot'
  })
}

export const getAreaInfo = (params) => {
  return request({
      url: '/area/info',
      params
  })
}

export const getAreaMap = (params) => {
  return request({
      url: '/area/map',
      params
  })
}

export const getHouses = (params) => {
  return request({
      url: '/houses',
      params
  })
}

export const getHousesDetail = (params) => {
  return request({
      url: '/houses/' + params
  })
}

export const getHousesCondition = (params) => {
  return request({
      url: '/houses/condition',
      params
  })
}

export const userLogin = (data) => {
  return request({
    method: 'post',
    url: '/user/login',
    data
  })
}

export const userRegister = (data) => {
  return request({
    method: 'post',
    url: '/user/registered',
    data
  })
}
/* 获取用户信息 */
export const getUserInfo = () => {
  return request({
    url: '/user'
  })
}

/* 登出 */
export const userLogout = (data) => {
  return request({
    method: 'post',
    url: '/user/logout',
    data
  })
}
/* 修改用户数据 */
export const updateUserInfo = (data) => {
  return request({
    method: 'patch',
    url: '/user',
    data
  })
}

/* 是否收藏 /user/favorites/{id} */
export const userIsFavorites = (params) => {
  return request({
    url: '/user/favorites/' + params
  })
}

/* 添加收藏/user/favorites/{id} */
export const userFavorites = (data) => {
  return request({
    method: 'post',
    url: '/user/favorites/' + data
  })
}

/* 取消收藏/user/favorites/{id} */
export const userCancelFavorites = (params) => {
  return request({
    method: 'delete',
    url: '/user/favorites/' + params
  })
}

/* 获取收藏数据/user/favorites */
export const userGetFavorites = () => {
  return request({
    url: '/user/favorites/'
  })
}

/* 上传图片/houses/image */
export const postHousesImage = (data) => {
  return request({
    headers: {'Content-Type': 'multipart/form-data'},
    method: 'post',
    url: '/houses/image',
    data
  })
}



/* 查看发布的房源列表/user/houses */
export const getRentout = () => {
  return request({
    url: '/user/houses'
  })
}

/* 添加房源/user/houses */
export const addRentout = (data) => {
  return request({
    method: 'post',
    url: '/user/houses',
    data
  })
}