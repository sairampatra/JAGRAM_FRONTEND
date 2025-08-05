import {createSlice} from "@reduxjs/toolkit"
const postSlice  = createSlice({
name : "post",
initialState: {
    posts:[],
    isPostsLoading:false
},
reducers:{
    setPosts:(state,action)=>{
            state.posts = action.payload
    },
    setIsPostsLoading:(state,action)=>{
state.isPostsLoading = action.payload
    }
}
})

export const {setPosts ,setIsPostsLoading} =  postSlice.actions
export default postSlice.reducer