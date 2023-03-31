import { createAction } from "@reduxjs/toolkit"

let open = createAction(
    'open',
    ({ icon, title }) => {
        return {
            payload: {
                icon,
                title,
                visible: true,
            }
        }
    }
)

let close = createAction(
    'close',
    ({ icon, title }) => {
        return {
            payload: {
                icon,
                title,
                visible: false,
            }
        }
    }
)

const alertActions = { open, close }

export default alertActions