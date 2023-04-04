import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const read_chapters = createAsyncThunk(
    'read_chapters',
    async ({ manga_id, page, headers }) => {
        try {
            let response = await axios.get("https://minga-pjxq.onrender.com/api/chapters/?manga_id=" + manga_id + "&page=" + page, headers)
            return { chapters: response.data.chapter }
        } catch (error) {
            return { chapters: [] }
        }
    }
)

const read_manga = createAsyncThunk(
    'read_manga',
    async ({ manga_id, headers }) => {
        try {
            let response = await axios.get("https://minga-pjxq.onrender.com/api/mangas/" + manga_id, headers)
            return { manga: response.data.manga }
        } catch (error) {
            return { manga: [] }
        }
    }
)
const delete_chapter = createAsyncThunk(
    'delete_chapter',
    async () => {
     return null
    }
   
)


const actions = { read_chapters, read_manga, delete_chapter}
export default actions