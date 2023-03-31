import { createReducer } from "@reduxjs/toolkit";
import actions from "./actions";
const {captureChecks} = actions

const initialState = {
    category: "",
}

const reducer = createReducer(initialState, (builder) =>
    builder.addCase(captureChecks, (state, action) =>{
        let newState = {
            ...state,
            category: action.payload.category.split(",")
        };
        return newState
        })
    )

    export default reducer