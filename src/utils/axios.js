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