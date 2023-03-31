import { createReducer } from "@reduxjs/toolkit";
import actions from './actions'
const { captureState} = actions

const initiateState= {
    checked: false
}
const reducer = createReducer(
    initiateState,
    (builder) => builder
    .addCase(
        captureState,
        (state,action) => {
            let newState = {
                ...state,
                checked: action.payload.checked,
                page: action.payload.page
            }
            return newState
        }
    )
)

export default reducer