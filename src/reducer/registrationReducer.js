export const INITIAL_STATE = {
    name: "",
    email: "",
    password: "",
    err: null
}

export const registrationReducer = (state, action) => {
    switch (action.type) {
        case "CHANGE_INPUT":
            return {
                ...state,
                [action.payload.name]: action.payload.value
            }
        case "SET_ERROR":
            return {
                ...state,
                err: action.payload.error
            }
        case "CLEAR_ERROR":
            return {
                ...state,
                err: null
            }
        default:
            return state
    }
}