import { createReducer } from "@reduxjs/toolkit";
import authorActions from "./actions";
const { read_author } = authorActions;
const initialState = { author: [] };

const authorReducer = createReducer(initialState, (builder) => {
    builder.addCase(read_author.fulfilled, (state, action) => {
        action.payload.author.createdAt = action.payload.author.createdAt
            .slice(0, 10)
            .split("-")
            .reverse()
            .join("/");
        let newState = {
            ...state,
            author: action.payload.author,
        };
        return newState;
    });
});
export default authorReducer;