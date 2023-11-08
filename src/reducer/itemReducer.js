export const initialState = {
    userId: JSON.parse(localStorage.getItem("User"))?._id,
    images: [],
    title: "",
    desc: "",
    price: 0,
    colors: [],
    sizes: [],
    reviews: 0
}

export const itemReducer = (state, action) => {
    switch (action.type) {
        case "CHANGE_INPUT":
            return {
                ...state,
                [action.payload.name]: action.payload.value
            }
        case "SET_IMAGES":
            return {
                ...state,
                images: action.payload.images
            }
        case "ADD_SIZE":
            return {
                ...state,
                sizes: [...state.sizes, action.payload]
            }
        case "REMOVE_SIZE":
            return {
                ...state,
                sizes: state.sizes.filter(size => size !== action.payload)
            }
        case "ADD_COLOR":
            return {
                ...state,
                colors: [...state.colors, action.payload]
            }
        case "REMOVE_COLOR":
            return {
                ...state,
                colors: state.colors.filter(color => color !== action.payload)
            }
        default:
            return state
    }
}

