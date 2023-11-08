import { apiRequests } from "../utils/apiRequests"

export const fetchItems = () => {
    return apiRequests.get(`/item/get`)
}

export const deleteItem = (id) => {
    return apiRequests.delete(`/item/delete/${id}`)
}
