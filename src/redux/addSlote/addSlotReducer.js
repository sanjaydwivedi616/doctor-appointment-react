import { ADD_SLOT, DELETE_SLOT } from "../type/actionType"

let addSloteData = {
}

const addSlotReducer = (state = addSloteData, action) => {
    switch (action.type) {
        case ADD_SLOT:
            return {
                ...addSloteData, addSloteData : action.payload
            }
        case DELETE_SLOT:
            return {
            }
        default:
            return state
    }
}

export default addSlotReducer;
