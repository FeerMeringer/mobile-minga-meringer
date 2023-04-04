import { configureStore } from '@reduxjs/toolkit'
import textReducer from './Text/reducer'
import mangaReducer from './Manga/reduce'
import captureState from './Capture/reducer'
import chaptersReducer from './Chapters/reducer'
import bottomTabsReducer from "./Perfil/reducer"
import chapterClickReducer from './ChapterClicked/reducer'
import mangaClickReducer from  './Details/reducer'
import sortReducer from './Sort/reducer'

export const store = configureStore ({
    reducer: {
        text: textReducer,
        mangareducer: mangaReducer,
        order: sortReducer,
        chapters: chaptersReducer,
        checked: captureState,
        bottomTabsReducer: bottomTabsReducer,
        mangaClickReducer: mangaClickReducer,
        chapterClickReducer: chapterClickReducer
    },
    
    devTools: true,
})