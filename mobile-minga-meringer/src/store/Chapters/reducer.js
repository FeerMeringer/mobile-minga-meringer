import { createReducer } from "@reduxjs/toolkit";
import actions from './actions'


const { read_chapters, read_manga, delete_chapter } = actions

const initialState = {
    manga: [],
    chapters: [],
    chapters:[]
}

const reducer = createReducer(
    initialState,
    (builder) => builder
        .addCase(read_manga.fulfilled,
            (state, action) => {
                let newState = {
                    ...state,
                    manga: action.payload.manga
                }
                return newState
            }
        )
        .addCase(
            read_chapters.fulfilled,
            (state, action) => {
                let newState = {
                    ...state,
                    chapters: action.payload.chapters
                }
                return newState
            }
        )
        .addCase(
            delete_chapter.fulfilled,
            (state, action) => {
                let newState = {
                    chapter: [],
                    manga: []

                }
                return newState
            }
        )
)

export default reducer