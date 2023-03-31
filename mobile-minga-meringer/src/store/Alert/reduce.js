import { createReducer } from "@reduxjs/toolkit";
import alertActions from "./actions";

const {open,close} = alertActions
const initialState = {
    visible: false,
    icon: "succes",
    title: "",
    mangas:[]
}

let alertReducer = createReducer(
    initialState,
    (builder) => builder
        .addCase(
            open,
            (state, action) => {
            const newState = { 
                ...state,
                visible: action.payload.visible,
                title: action.payload.title,
                icon: action.payload.icon
            }
            return newState
            }

        )
        .addCase(
            close,
            (state, action) => {
                const newState = {
                ...state,
                visible: action.payload.visible,
                text: action.payload.title,
                icon: action.payload.icon
            }
            return newState
            }
        )

)

export default alertReducer