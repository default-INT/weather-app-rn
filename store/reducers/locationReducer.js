import {LOCATION} from "../../constants/types"

const initialState = {
    currentLocation: null
}

const handlers = {
    [LOCATION.GET_CURRENT_LOCATION]: (state, {payload}) => ({
        ...state,
        currentLocation: payload
    }),
    DEFAULT: state => state
}

export const locationReducer = (state = initialState, action) => {
    const handle = handlers[action.type] || handlers.DEFAULT;
    return handle(state, action)
}