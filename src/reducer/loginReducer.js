export const INITIAL_STATE = {
    email: "",
    password: "",
    err: null
}

export const loginReducer = (state, action) => {
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
        default:
            return state
    }
}