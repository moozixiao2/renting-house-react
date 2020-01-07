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