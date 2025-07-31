import {createSlice} from '@reduxjs/toolkit'
const commentSlice = createSlice({
    name:"comment",
    initialState : {
            nestedComments:[]
    },
    reducers:{
        setNestedComments:(state,action)=>{
                state.nestedComments = action.payload
        }
    }
}) 

export const {setNestedComments} = commentSlice.actions
export default commentSlice.reducer