import { ADD_SLOT, DELETE_SLOT } from "../type/actionType";

/* export const postDataSuccess = (data) => {
    addSlotInTheList(data)
} */

export const addSlotInTheList = (payload) => {
    return {
        type: ADD_SLOT,
        payload
    }
}

export const deleteSlot = (id) => {
    return {
        type: DELETE_SLOT,
        id
    }
}
