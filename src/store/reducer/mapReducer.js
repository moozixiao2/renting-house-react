import { MAP_CITY_NAME_SET } from '../actionTypes'

const defaultValue = {
    cityName: ''
}

export default (state=defaultValue, action) => {
    let newState = JSON.parse(JSON.stringify(state))
    switch(action.type) {
        case MAP_CITY_NAME_SET: 
            newState.cityName = action.value
        break;
        default:
        
        break;
    }
    return newState
}