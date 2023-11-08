export const INITIAL_STATE = {
    userId: JSON.parse(localStorage.getItem("User"))?._id,
    street: "",
    state: "",
    city: "",
    country: "",
    pinCode: "",
    houseNumber: "",
    phone: "",
}

export const addressReducer = (state, action) => {
    switch (action.type) {
        case "CHANGE_INPUT":
            return {
                ...state,
                [action.payload.name]: action.payload.value
            }
        default:
            return state
    }
}