import {createAsyncThunk} from "@reduxjs/toolkit";
import axios from "axios";

const read_author = createAsyncThunk("read_author", async ({author_id}) => {
try {
    let res = await axios.get("http://localhost:8000/authors/" + author_id);
    return {author: res.data.data};
} catch (error) {
    return {author: []};
}
});

const author = {read_author};
export default author;