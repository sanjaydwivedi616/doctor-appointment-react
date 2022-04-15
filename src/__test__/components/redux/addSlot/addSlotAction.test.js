import { addSlotInTheList, deleteSlot } from "../../../../redux/addSlote/addSlotAction"
import { ADD_SLOT, DELETE_SLOT } from "../../../../redux/type/actionType"


describe('Whene doctor is ', () => {

    it('When add the slot.', () => {
        const data = {name: "rohan", email: "rohan@gmail.com"}
        const action = {
            type: ADD_SLOT,
            payload: data
        }
        const result = addSlotInTheList(data)
        expect(result).toEqual(action)
    })

    it('When doctore delete the slot', () => {
        const id = 1
        const result = deleteSlot(id)
        expect(result).toEqual({ type: DELETE_SLOT, id })
    })
})
