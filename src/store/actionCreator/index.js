/* 设置城市名称 */
import { MAP_CITY_NAME_SET }  from '../actionTypes'

export const mapCityName = (cityname) => {
    return {
        type: MAP_CITY_NAME_SET,
        value: cityname
    }
}