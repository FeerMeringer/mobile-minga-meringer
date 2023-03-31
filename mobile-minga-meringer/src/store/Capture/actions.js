import { createAction } from "@reduxjs/toolkit";

let captureState = createAction(
    'captureState',
    ({ buttonState, page }) => {
        return {
            payload: { 
                checked: buttonState,
                page: page
             }
        }
    }
)
const actions = { captureState }

export default actions