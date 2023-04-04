import { createReducer } from "@reduxjs/toolkit";
import bottomTabsActions from './action'

const { reloadBottomTabs } = bottomTabsActions

const initialState = {
    state: false,
}

const bottomTabsReducer = createReducer(
    initialState,
    (builder) => builder
        .addCase(
            reloadBottomTabs,
            (state, action) => {
                let newState = {
                    ...state,
                    state: action.payload.state,
                }
                return newState
            }
        )
)

export default bottomTabsReducer